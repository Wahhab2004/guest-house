"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Guest, Room } from "@/types/prisma";
import { EditReservationForm } from "@/types/forms";
import {
	PaymentMethod,
	PaymentStatus,
	ReservationStatus,
} from "@/types/prisma";
import {
	X,
	Calendar,
	Users,
	BedDouble,
	CreditCard,
	UploadCloud,
} from "lucide-react";

interface ReservationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (data: any) => void;
	initialData: EditReservationForm;
}

const STATUS_OPTIONS: ReservationStatus[] = [
	ReservationStatus.PENDING,
	ReservationStatus.CONFIRMED,
	ReservationStatus.CANCELED, // ⚠️ perhatikan: CANCELED (1 L) sesuai Prisma
	ReservationStatus.ACTIVE,
	ReservationStatus.CHECKED_OUT,
];

const PAYMENT_STATUS_OPTIONS: PaymentStatus[] = [
	PaymentStatus.UNPAID,
	PaymentStatus.PAID,
	PaymentStatus.HALF_PAID,
	PaymentStatus.REFUNDED,
];

const PAYMENT_METHODS: PaymentMethod[] = [
	PaymentMethod.TRANSFER,
	PaymentMethod.CASH,
	PaymentMethod.E_WALLET, // ⚠️ bukan EWALLET
];

export default function EditReservationModal({
	isOpen,
	onClose,
	onSave,
	initialData,
}: ReservationModalProps) {
	const [formData, setFormData] = useState<EditReservationForm>(initialData);
	const [guests, setGuests] = useState<Guest[]>([]);
	const [rooms, setRooms] = useState<Room[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [token, setToken] = useState<string | null>(null);
	const [proofFile, setProofFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

	/* ================= UPDATE FORM DATA ================= */
	useEffect(() => {
		setFormData(initialData);
	}, [initialData]);

	/* ================= TOKEN ================= */
	useEffect(() => {
		const storedToken = Cookies.get("token");
		if (storedToken) setToken(storedToken);
	}, []);

	/* ================= FETCH MASTER ================= */
	useEffect(() => {
		if (!isOpen) return;

		fetch(`${baseUrl}/guests`)
			.then((res) => res.json())
			.then((res) => setGuests(res.data || []));

		if (formData.checkIn && formData.checkOut) {
			const params = new URLSearchParams({
				checkIn: new Date(formData.checkIn).toISOString(),
				checkOut: new Date(formData.checkOut).toISOString(),
			});

			fetch(`${baseUrl}/rooms/available?${params}`)
				.then((res) => res.json())
				.then((res) => setRooms(res.data || []));
		}
	}, [isOpen, formData.checkIn, formData.checkOut]);

	useEffect(() => {
		if (
			formData.paymentStatus === PaymentStatus.PAID &&
			(!formData.status || formData.status === ReservationStatus.CONFIRMED)
		) {
			setFormData((prev) => ({
				...prev,
				status: ReservationStatus.ACTIVE,
			}));
		}
	}, [formData.paymentStatus]);

	/* ================= VALIDATION ================= */
	const validate = () => {
		if (!formData.guestId) return setErr("Guest wajib dipilih");
		if (!formData.roomId) return setErr("Room wajib dipilih");
		if (!formData.checkIn || !formData.checkOut)
			return setErr("Tanggal wajib diisi");

		setError(null);
		return true;
	};

	const setErr = (msg: string) => {
		setError(msg);
		return false;
	};

	/* ================= SUBMIT ================= */
	const handleSubmit = async () => {
		if (!validate()) return;

		setIsSubmitting(true);

		try {
			const fd = new FormData();
			fd.append("guestId", formData.guestId);
			fd.append("roomId", formData.roomId);
			fd.append("checkIn", formData.checkIn);
			fd.append("checkOut", formData.checkOut);

			if (formData.status) fd.append("status", formData.status);
			if (formData.paymentStatus)
				fd.append("paymentStatus", formData.paymentStatus);
			if (formData.paymentMethod)
				fd.append("paymentMethod", formData.paymentMethod);
			if (formData.paymentSender)
				fd.append("paymentSender", formData.paymentSender);

			if (proofFile) fd.append("proofUrl", proofFile);

			const res = await fetch(`${baseUrl}/reservations/${initialData.id}`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: fd,
			});

			const result = await res.json();

			if (!res.ok) {
				setError(result.message || "Gagal update reservasi");
				return;
			}

			onSave(result.data);
			onClose();
		} catch {
			setError("Terjadi kesalahan server");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!isOpen) return null;

	/* ================= UI ================= */
	return (
		<div className="fixed inset-0 z-[101] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
			<div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[32px] shadow-2xl animate-in fade-in zoom-in duration-300">
				{/* Header */}
				<div className="bg-gradient-to-r from-orange-400 to-amber-500 p-6 rounded-t-[32px] flex items-center justify-between">
					<div>
						<h2 className="text-xl font-bold text-white">Edit Reservasi</h2>
						<p className="text-white/80 text-sm">
							Perbarui status dan informasi pembayaran tamu
						</p>
					</div>
					<button
						onClick={onClose}
						className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition"
					>
						<X size={20} />
					</button>
				</div>

				{/* Body */}
				<div className="p-6 space-y-6">
					{error && (
						<p className="bg-red-100 text-red-600 p-3 rounded-xl font-semibold text-sm">
							{error}
						</p>
					)}

					{/* Guest & Room */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="label flex items-center gap-1">
								<Users size={14} /> Guest
							</label>
							<select
								value={formData.guestId}
								onChange={(e) =>
									setFormData({
										...formData,
										guestId: e.target.value,
									})
								}
								className="input w-full"
							>
								<option value="">-- Pilih Guest --</option>
								{guests.map((g) => (
									<option key={g.id} value={g.id}>
										{g.name} ({g.email})
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="label flex items-center gap-1">
								<BedDouble size={14} /> Room
							</label>
							<select
								value={formData.roomId}
								onChange={(e) =>
									setFormData({
										...formData,
										roomId: e.target.value,
									})
								}
								className="input w-full"
							>
								<option value="">-- Pilih Room --</option>
								{rooms.map((r) => (
									<option key={r.id} value={r.id}>
										{r.name} - Rp{r.price}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Dates */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="label flex items-center gap-1">
								<Calendar size={14} /> Check-in
							</label>
							<input
								type="date"
								value={formData.checkIn}
								onChange={(e) =>
									setFormData({
										...formData,
										checkIn: e.target.value,
									})
								}
								className="input w-full"
							/>
						</div>

						<div>
							<label className="label flex items-center gap-1">
								<Calendar size={14} /> Check-out
							</label>
							<input
								type="date"
								value={formData.checkOut}
								onChange={(e) =>
									setFormData({
										...formData,
										checkOut: e.target.value,
									})
								}
								className="input w-full"
							/>
						</div>
					</div>

					{/* Status & Payment */}
					<div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
						<div className="space-y-1">
							<h3 className="font-bold text-slate-700 flex items-center gap-2">
								<CreditCard size={16} /> Status & Pembayaran
							</h3>
							<p className="text-sm text-slate-500">
								Perbarui status reservasi dan konfirmasi pembayaran tamu.
								Disarankan untuk mengubah <b>Status Pembayaran</b> terlebih
								dahulu, kemudian aktifkan reservasi jika pembayaran sudah
								diterima.
							</p>
						</div>

						{/* Soft Warning */}
						{formData.paymentStatus === PaymentStatus.PAID &&
							formData.status === ReservationStatus.CONFIRMED && (
								<div className="bg-amber-100 border border-amber-200 text-amber-700 rounded-xl p-3 text-sm font-semibold">
									Pembayaran sudah diterima, tetapi reservasi belum diaktifkan.
									Pertimbangkan untuk mengubah status menjadi <b>ACTIVE</b>.
								</div>
							)}

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="label">Status Reservasi</label>
								<select
									value={formData.status || ""}
									onChange={(e) =>
										setFormData({
											...formData,
											status: e.target.value as ReservationStatus,
										})
									}
									className="input w-full"
								>
									<option value="">-- Pilih Status Reservasi --</option>
									{STATUS_OPTIONS.map((s) => (
										<option key={s} value={s}>
											{s}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="label">Status Pembayaran</label>
								<select
									value={formData.paymentStatus || ""}
									onChange={(e) =>
										setFormData({
											...formData,
											paymentStatus: e.target.value as PaymentStatus,
										})
									}
									className="input w-full"
								>
									<option value="">-- Pilih Status Pembayaran --</option>
									{PAYMENT_STATUS_OPTIONS.map((s) => (
										<option key={s} value={s}>
											{s}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="label">Metode Pembayaran</label>
								<select
									value={formData.paymentMethod || ""}
									onChange={(e) =>
										setFormData({
											...formData,
											paymentMethod: e.target.value as PaymentMethod,
										})
									}
									className="input w-full"
								>
									<option value="">-- Pilih Metode Pembayaran --</option>
									{PAYMENT_METHODS.map((m) => (
										<option key={m} value={m}>
											{m}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="label">Pengirim / Nama Pemilik Akun</label>
								<input
									placeholder="Contoh: BCA - Andi Saputra"
									className="input w-full"
									value={formData.paymentSender || ""}
									onChange={(e) =>
										setFormData({
											...formData,
											paymentSender: e.target.value,
										})
									}
								/>
							</div>
						</div>

						{/* Upload Proof */}
						<div>
							<label className="label flex items-center gap-1">
								<UploadCloud size={14} /> Bukti Pembayaran
							</label>
							<p className="text-sm text-slate-500 mb-2">
								Unggah foto atau screenshot bukti transfer sebagai arsip dan
								verifikasi.
							</p>
							<input
								type="file"
								accept="image/*"
								onChange={(e) => {
									const file = e.target.files?.[0] || null;
									setProofFile(file);

									if (file) {
										const url = URL.createObjectURL(file);
										setPreviewUrl(url);
									} else {
										setPreviewUrl(null);
									}
								}}
								className="block w-full text-sm file:mr-4 file:py-2 file:px-4
	file:rounded-xl file:border-0
	file:bg-orange-100 file:text-orange-700
	hover:file:bg-orange-200 transition"
							/>

							{previewUrl && (
								<div className="mt-3 relative w-40 h-40 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
									<img
										src={previewUrl}
										alt="Preview Bukti Pembayaran"
										className="w-full h-full object-cover"
									/>
									<button
										type="button"
										onClick={() => {
											setProofFile(null);
											setPreviewUrl(null);
										}}
										className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition"
										title="Hapus gambar"
									>
										×
									</button>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-[32px]">
					<button
						onClick={onClose}
						className="px-5 py-2 rounded-xl border border-slate-300 font-semibold text-slate-600 hover:bg-slate-100 transition"
					>
						Batal
					</button>
					<button
						onClick={handleSubmit}
						disabled={isSubmitting}
						className="px-6 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow hover:shadow-lg transition disabled:opacity-50"
					>
						{isSubmitting ? "Menyimpan..." : "Update"}
					</button>
				</div>
			</div>
		</div>
	);
}
