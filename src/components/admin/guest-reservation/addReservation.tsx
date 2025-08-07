"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";

type Props = {
	roomId: string;
	guestId: string;
	onClose: () => void;
	onSuccess: () => void;
};

export default function ModalReservasi({
	roomId,
	guestId,
	onClose,
	onSuccess,
}: Props) {
	const [guestTotal, setGuestTotal] = useState(1);
	const [checkIn, setCheckIn] = useState<Date | null>(null);
	const [checkOut, setCheckOut] = useState<Date | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		if (!checkIn || !checkOut || !guestTotal) {
			alert("Lengkapi semua data!");
			return;
		}

		setLoading(true);

		try {
			const res = await fetch("/api/reservation", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					roomId,
					guestId,
					checkIn,
					checkOut,
					guestTotal,
				}),
			});

			const result = await res.json();

			if (!res.ok) {
				throw new Error(result.message || "Gagal reservasi");
			}

			alert("Reservasi berhasil!");
			onSuccess(); // Refresh parent
			onClose(); // Tutup modal
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error("Login error:", error);
				alert(error.message);
			} else {
				console.error("Login error:", error);
				alert("Terjadi kesalahan saat login.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg space-y-4">
				<h2 className="text-xl font-bold">Reservasi Kamar</h2>

				<div>
					<label className="block text-sm mb-1">Jumlah Tamu</label>
					<input
						type="number"
						min={1}
						value={guestTotal}
						onChange={(e) => setGuestTotal(Number(e.target.value))}
						className="w-full border p-2 rounded"
					/>
				</div>

				<div>
					<label className="block text-sm mb-1">Check-in</label>
					<DatePicker
						selected={checkIn}
						onChange={(date) => setCheckIn(date)}
						minDate={addDays(new Date(), 3)}
						dateFormat="dd-MM-yyyy"
						className="w-full border p-2 rounded"
						placeholderText="Pilih tanggal check-in"
					/>
				</div>

				<div>
					<label className="block text-sm mb-1">Check-out</label>
					<DatePicker
						selected={checkOut}
						onChange={(date) => setCheckOut(date)}
						minDate={checkIn ? addDays(checkIn, 1) : addDays(new Date(), 4)}
						dateFormat="dd-MM-yyyy"
						className="w-full border p-2 rounded"
						placeholderText="Pilih tanggal check-out"
					/>
				</div>

				<div className="flex justify-end gap-2 mt-4">
					<button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
						Batal
					</button>
					<button
						onClick={handleSubmit}
						disabled={loading}
						className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
					>
						{loading ? "Menyimpan..." : "Reservasi"}
					</button>
				</div>
			</div>
		</div>
	);
}
