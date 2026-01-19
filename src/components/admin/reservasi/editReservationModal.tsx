"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Guest, Room } from "@/types/prisma";
import { EditReservationForm } from "@/types/forms";
import { PaymentMethod, PaymentStatus, ReservationStatus } from "@/types/prisma";



interface ReservationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (data: any) => void;
	initialData: EditReservationForm;
}

const STATUS_OPTIONS = ["PENDING", "CONFIRMED", "CANCELLED", "ACTIVE", "CHECKED_OUT"];
const PAYMENT_STATUS_OPTIONS = ["UNPAID", "PAID", "FAILED"];
const PAYMENT_METHODS = ["TRANSFER", "CASH", "EWALLET"];

export default function EditReservationModal({
	isOpen,
	onClose,
	onSave,
	initialData,
}: ReservationModalProps) {
	const [formData, setFormData] = useState(initialData);
	const [guests, setGuests] = useState<Guest[]>([]);
	const [rooms, setRooms] = useState<Room[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [token, setToken] = useState<string | null>(null);
	const [proofFile, setProofFile] = useState<File | null>(null);

	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

	/* ================= UPDATE FORM DATA WHEN INITIAL DATA CHANGES ================= */
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

			if (proofFile) {
				fd.append("proofUrl", proofFile);
			}

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
		} catch (err) {
			setError("Terjadi kesalahan server");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!isOpen) return null;

	/* ================= UI ================= */
	return (
		<div className="fixed inset-0 z-[101] bg-black/50">
			<div className="bg-white w-[760px] max-h-[90vh] overflow-y-auto rounded-xl p-6 mx-auto mt-16">
				<h2 className="text-xl font-semibold mb-4">Edit Reservasi</h2>

				{error && (
					<p className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</p>
				)}

				{/* Guest */}
				<select
					value={formData.guestId}
					onChange={(e) =>
						setFormData({ ...formData, guestId: e.target.value })
					}
					className="input w-full mb-3"
				>
					<option value="">-- Pilih Guest --</option>
					{guests.map((g) => (
						<option key={g.id} value={g.id}>
							{g.name} ({g.email})
						</option>
					))}
				</select>

				{/* Date */}
				<div className="flex gap-3 mb-3">
					<input
						type="date"
						value={formData.checkIn}
						onChange={(e) =>
							setFormData({ ...formData, checkIn: e.target.value })
						}
						className="input w-1/2"
					/>
					<input
						type="date"
						value={formData.checkOut}
						onChange={(e) =>
							setFormData({ ...formData, checkOut: e.target.value })
						}
						className="input w-1/2"
					/>
				</div>

				{/* Room */}
				<select
					value={formData.roomId}
					onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
					className="input w-full mb-3"
				>
					<option value="">-- Pilih Room --</option>
					{rooms.map((r) => (
						<option key={r.id} value={r.id}>
							{r.name} - Rp{r.price}
						</option>
					))}
				</select>

		

				{/* <p className="text-sm mb-4">
					Total Guest: <b>{guestTotal}</b>
				</p> */}

				{/* STATUS */}
				<div className="grid grid-cols-2 gap-3 mb-4">
					<select
						value={formData.status || ""}
						onChange={(e) =>
							setFormData({ ...formData, status: e.target.value as ReservationStatus })
						}
						className="input"
					>
						<option value="">-- Status Reservasi --</option>
						{STATUS_OPTIONS.map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>

					<select
						value={formData.paymentStatus || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								paymentStatus: e.target.value as PaymentStatus,
							})
						}
						className="input"
					>
						<option value="">-- Status Pembayaran --</option>
						{PAYMENT_STATUS_OPTIONS.map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
				</div>

				{/* PAYMENT */}
				<div className="grid grid-cols-2 gap-3 mb-4">
					<select
						value={formData.paymentMethod || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								paymentMethod: e.target.value as PaymentMethod,
							})
						}
						className="input"
					>
						<option value="">-- Metode Pembayaran --</option>
						{PAYMENT_METHODS.map((m) => (
							<option key={m} value={m}>
								{m}
							</option>
						))}
					</select>

					<input
						placeholder="Pengirim Pembayaran"
						className="input"
						value={formData.paymentSender || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								paymentSender: e.target.value,
							})
						}
					/>
				</div>

				{/* Upload Bukti */}
				<div className="mb-4">
					<label className="block text-sm mb-1">Bukti Pembayaran</label>
					<input
						type="file"
						accept="image/*"
						onChange={(e) => setProofFile(e.target.files?.[0] || null)}
					/>
				</div>

				{/* Action */}
				<div className="flex justify-end gap-3">
					<button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
						Batal
					</button>
					<button
						onClick={handleSubmit}
						disabled={isSubmitting}
						className="px-4 py-2 bg-green-600 text-white rounded"
					>
						{isSubmitting ? "Menyimpan..." : "Update"}
					</button>
				</div>
			</div>
		</div>
	);
}
