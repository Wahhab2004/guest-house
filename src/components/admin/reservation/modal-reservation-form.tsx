"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Guest, Room } from "@/fetching";
import { ReservationForm } from "@/types/forms";
import { X, Calendar, Users, BedDouble } from "lucide-react";

interface ReservationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (data: any) => void;
}

const EMPTY_FORM: ReservationForm = {
	guestId: "",
	roomId: "",
	checkIn: "",
	checkOut: "",
	adultCount: 1,
	childCount: 0,
	additionalGuests: [],
};

export default function ReservationModal({
	isOpen,
	onClose,
	onSave,
}: ReservationModalProps) {
	const [formData, setFormData] = useState<ReservationForm>(EMPTY_FORM);
	const [guests, setGuests] = useState<Guest[]>([]);
	const [rooms, setRooms] = useState<Room[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [token, setToken] = useState<string | null>(null);

	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

	/* ================= TOKEN ================= */
	useEffect(() => {
		const storedToken = Cookies.get("token");
		if (storedToken) setToken(storedToken);
	}, []);

	/* ================= FETCH MASTER DATA ================= */
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

	/* ================= SYNC CHILD ↔ ADDITIONAL ================= */
	useEffect(() => {
		setFormData((prev) => ({
			...prev,
			additionalGuests: Array.from(
				{ length: prev.childCount },
				(_, i) =>
					prev.additionalGuests[i] || {
						name: "",
						dateOfBirth: "",
						passport: "",
						gender: "Male",
					},
			),
		}));
	}, [formData.childCount]);

	/* ================= VALIDATION ================= */
	const validate = (): boolean => {
		if (!formData.guestId) return setErr("Guest wajib dipilih");
		if (!formData.roomId) return setErr("Room wajib dipilih");
		if (!formData.checkIn || !formData.checkOut)
			return setErr("Tanggal wajib diisi");
		if (formData.adultCount < 1 || formData.adultCount > 3)
			return setErr("Adult harus 1–3");
		if (formData.childCount < 0 || formData.childCount > 2)
			return setErr("Child maksimal 2");

		for (const guest of formData.additionalGuests) {
			if (!guest.name || !guest.dateOfBirth)
				return setErr("Nama & tanggal lahir additional guest wajib");
		}

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
			const res = await fetch(`${baseUrl}/reservations`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			});

			const result = await res.json();

			if (!res.ok) {
				setError(result.message || "Gagal menyimpan reservasi");
				return;
			}

			onSave(result.data);
			onClose();
			setFormData(EMPTY_FORM);
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
						<h2 className="text-xl font-bold text-white">Tambah Reservasi</h2>
						<p className="text-white/80 text-sm">
							Lengkapi informasi reservasi dengan benar
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
							<label className="label">Guest</label>
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

					{/* Guest Count */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="label flex items-center gap-1">
								<Users size={14} /> Adult
							</label>
							<input
								type="number"
								min={1}
								max={3}
								value={formData.adultCount}
								onChange={(e) =>
									setFormData({
										...formData,
										adultCount: Number(e.target.value),
									})
								}
								className="input w-full"
							/>
						</div>

						<div>
							<label className="label flex items-center gap-1">
								<Users size={14} /> Child
							</label>
							<input
								type="number"
								min={0}
								max={2}
								value={formData.childCount}
								onChange={(e) =>
									setFormData({
										...formData,
										childCount: Number(e.target.value),
									})
								}
								className="input w-full"
							/>
						</div>
					</div>

					{/* Additional Guests */}
					{formData.additionalGuests.length > 0 && (
						<div className="space-y-3">
							<h3 className="font-bold text-slate-700">Additional Guests</h3>

							{formData.additionalGuests.map((g, i) => (
								<div
									key={i}
									className="bg-slate-50 border border-slate-200 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-2 gap-3"
								>
									<input
										placeholder="Nama Anak"
										className="input w-full"
										value={g.name ?? ""}
										onChange={(e) => {
											const updated = [...formData.additionalGuests];
											updated[i] = {
												...updated[i],
												name: e.target.value,
											};
											setFormData({
												...formData,
												additionalGuests: updated,
											});
										}}
									/>

									<input
										type="date"
										className="input w-full"
										value={g.dateOfBirth ?? ""}
										onChange={(e) => {
											const updated = [...formData.additionalGuests];
											updated[i] = {
												...updated[i],
												dateOfBirth: e.target.value,
											};
											setFormData({
												...formData,
												additionalGuests: updated,
											});
										}}
									/>
								</div>
							))}
						</div>
					)}
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
						{isSubmitting ? "Menyimpan..." : "Simpan"}
					</button>
				</div>
			</div>
		</div>
	);
}
