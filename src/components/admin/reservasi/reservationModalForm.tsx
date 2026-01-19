"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Guest, Room } from "@/fetching";
import { ReservationForm } from "@/types/forms";

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
		<div className="fixed inset-0 z-[101] bg-black/50">
			<div className="bg-white w-[720px] max-h-[90vh] overflow-y-auto rounded-xl p-6 mx-auto mt-16">
				<h2 className="text-xl font-semibold mb-4">Tambah Reservasi</h2>

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

				{/* Guest Count */}
				<div className="flex gap-3 mb-4">
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
						className="input w-1/2"
						placeholder="Adult"
					/>
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
						className="input w-1/2"
						placeholder="Child"
					/>
				</div>

				{/* Additional Guests */}
				{formData.additionalGuests.map((g, i) => (
					<div key={i} className="border p-3 rounded mb-3">
						<input
							placeholder="Nama Anak"
							className="input w-full mb-2"
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
						{isSubmitting ? "Menyimpan..." : "Simpan"}
					</button>
				</div>
			</div>
		</div>
	);
}
