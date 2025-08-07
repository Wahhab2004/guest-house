"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import { Reservation } from "@/fetching";

const STATUS_OPTIONS = ["PENDING", "CONFIRMED", "CANCELLED"];
const PAYMENT_METHODS = ["E_WALLET", "BANK_TRANSFER", "CASH"];
const PAYMENT_STATUS = ["UNPAID", "PAID"];

interface Props {
	reservation: Reservation;
	onClose: () => void;
	onSuccess: () => void;
}

export default function ModalEditReservasi({
	reservation,
	onClose,
	onSuccess,
}: Props) {
	const [roomId, setRoomId] = useState(reservation.roomId);
	const [guestTotal, setGuestTotal] = useState(reservation.guestTotal);
	const [checkIn, setCheckIn] = useState<Date | null>(
		reservation.checkIn ? new Date(reservation.checkIn) : null
	);
	const [checkOut, setCheckOut] = useState<Date | null>(
		reservation.checkOut ? new Date(reservation.checkOut) : null
	);

	const [status, setStatus] = useState(reservation.status);
	const [paymentMethod, setPaymentMethod] = useState(
		reservation.Payment?.method
	);
	const [paymentStatus, setPaymentStatus] = useState(
		reservation.Payment?.status
	);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);

		try {
			const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
			const res = await fetch(`${baseURL}/reservations/${reservation.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					roomId,
					guestTotal,
					checkIn: checkIn?.toISOString(),
					checkOut: checkOut?.toISOString(),
					status,
					paymentMethod,
					paymentStatus,
				}),
			});

			const result = await res.json();

			if (!res.ok)
				throw new Error(result.message || "Gagal memperbarui reservasi.");

			alert("Reservasi berhasil diperbarui!");
			onSuccess();
			onClose();
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
		<div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4 shadow-lg">
				<h2 className="text-xl font-bold">Edit Reservasi</h2>

				<div>
					<label className="block text-sm mb-1">ID Kamar</label>
					<input
						type="text"
						value={roomId}
						onChange={(e) => setRoomId(e.target.value)}
						className="w-full border p-2 rounded"
					/>
				</div>

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
						dateFormat="dd-MM-yyyy"
						className="w-full border p-2 rounded"
					/>
				</div>

				<div>
					<label className="block text-sm mb-1">Check-out</label>
					<DatePicker
						selected={checkOut}
						onChange={(date) => setCheckOut(date)}
						minDate={checkIn ? addDays(checkIn, 1) : undefined}
						dateFormat="dd-MM-yyyy"
						className="w-full border p-2 rounded"
					/>
				</div>

				<div>
					<label className="block text-sm mb-1">Status Reservasi</label>
					<select
						value={status}
						onChange={(e) => setStatus(e.target.value)}
						className="w-full border p-2 rounded"
					>
						{STATUS_OPTIONS.map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block text-sm mb-1">Metode Pembayaran</label>
					<select
						value={paymentMethod}
						onChange={(e) => setPaymentMethod(e.target.value)}
						className="w-full border p-2 rounded"
					>
						{PAYMENT_METHODS.map((m) => (
							<option key={m} value={m}>
								{m}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block text-sm mb-1">Status Pembayaran</label>
					<select
						value={paymentStatus}
						onChange={(e) => setPaymentStatus(e.target.value)}
						className="w-full border p-2 rounded"
					>
						{PAYMENT_STATUS.map((p) => (
							<option key={p} value={p}>
								{p}
							</option>
						))}
					</select>
				</div>

				<div className="flex justify-end gap-2">
					<button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
						Batal
					</button>
					<button
						onClick={handleSubmit}
						disabled={loading}
						className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
					>
						{loading ? "Menyimpan..." : "Simpan"}
					</button>
				</div>
			</div>
		</div>
	);
}
