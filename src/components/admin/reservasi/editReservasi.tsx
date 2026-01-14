"use client";

import React, { useEffect, useState } from "react";
import { Reservation, Guest, Room } from "@/fetching";

interface EditReservationProps {
	isOpen: boolean;
	onClose: () => void;
	reservation: Reservation | null;
	onUpdate: (data: Reservation) => void;
	token: string | null;
}

const EditReservation: React.FC<EditReservationProps> = ({
	isOpen,
	onClose,
	reservation,
	onUpdate,
	token,
}) => {
	const [formData, setFormData] = useState<Reservation | null>(null);
	const [guests, setGuests] = useState<Guest[]>([]);
	const [rooms, setRooms] = useState<Room[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [proofFile] = useState<File | null>(null);

	useEffect(() => {
		if (!isOpen || !reservation) return;

		setFormData({ ...reservation });

		const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

		const fetchGuests = async () => {
			const res = await fetch(`${baseUrl}/guests`);
			const data = await res.json();
			setGuests(data.data || []);
		};

		const fetchRooms = async () => {
			const res = await fetch(`${baseUrl}/rooms`);
			const data = await res.json();
			setRooms(data.data || []);
		};

		fetchGuests();
		fetchRooms();
	}, [isOpen, reservation]);

	if (!isOpen || !formData) return null;
	const handleUpdate = async () => {
		if (!token || !formData) return;
		setIsSubmitting(true);

		try {
			const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

			const form = new FormData();

			form.append("guestId", formData.guestId || "");
			form.append("roomId", formData.roomId);
			form.append("checkIn", formData.checkIn);
			form.append("checkOut", formData.checkOut);
			form.append("guestTotal", String(formData.guestTotal));
			form.append("status", formData.status);
			form.append("paymentMethod", formData.payment?.method || "");
			form.append("paymentStatus", formData.payment?.status || "UNPAID");

			// Tambahkan file jika ada
			if (proofFile) {
				form.append("proofUrl", proofFile); // `proof` = nama field file yang diharapkan BE
			}

			const res = await fetch(`${baseUrl}/reservations/${formData.id}`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`, // Tanpa "Content-Type" agar browser set otomatis untuk FormData
				},
				body: form,
			});

			const result = await res.json();
			if (!res.ok) throw new Error(result.message);

			onUpdate(result.data);
			onClose();
		} catch (error) {
			console.error("Gagal memperbarui reservasi:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const inputStyle = "w-full border border-gray-300 rounded-md px-3 py-2";

	return (
		<div
			className="modal z-[101]"
			style={{
				display: isOpen ? "block" : "none",
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				background: "rgba(0,0,0,0.5)",
			}}
		>
			<div
				className="modal-content overflow-y-auto max-h-[90vh]"
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					background: "white",
					padding: "20px",
					borderRadius: "5px",
					width: "600px",
				}}
			>
				<h2 className="text-2xl font-semibold mb-4">Edit Reservasi</h2>

				{/* Guest Dropdown */}
				<div className="mb-4">
					<label className="block text-sm font-medium mb-1">Tamu</label>
					<select
						value={formData.guestId || ""}
						onChange={(e) =>
							setFormData({ ...formData, guestId: e.target.value })
						}
						className={inputStyle}
					>
						{guests.map((guest) => (
							<option key={guest.id} value={guest.id}>
								{guest.name} ({guest.email})
							</option>
						))}
					</select>
				</div>

				{/* Room Dropdown */}
				<div className="mb-4">
					<label className="block text-sm font-medium mb-1">Kamar</label>
					<select
						value={formData.roomId}
						onChange={(e) =>
							setFormData({ ...formData, roomId: e.target.value })
						}
						className={inputStyle}
					>
						{rooms.map((room) => (
							<option key={room.id} value={room.id}>
								{room.name}
							</option>
						))}
					</select>
				</div>

				{/* Check-in & Check-out */}
				<div className="mb-4">
					<label className="block text-sm font-medium mb-1">Check-in</label>
					<input
						type="date"
						value={formData.checkIn.slice(0, 10)}
						onChange={(e) =>
							setFormData({ ...formData, checkIn: e.target.value })
						}
						className={inputStyle}
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium mb-1">Check-out</label>
					<input
						type="date"
						value={formData.checkOut.slice(0, 10)}
						onChange={(e) =>
							setFormData({ ...formData, checkOut: e.target.value })
						}
						className={inputStyle}
					/>
				</div>

				{/* Total Guest */}
				<div className="mb-4">
					<label className="block text-sm font-medium mb-1">Jumlah Tamu</label>
					<input
						type="number"
						value={formData.guestTotal}
						onChange={(e) =>
							setFormData({ ...formData, guestTotal: Number(e.target.value) })
						}
						className={inputStyle}
					/>
				</div>

				{/* Status Reservasi */}
				<div className="mb-4">
					<label className="block text-sm font-medium mb-1">
						Status Reservasi
					</label>
					<select
						value={formData.status}
						onChange={(e) =>
							setFormData({ ...formData, status: e.target.value })
						}
						className={inputStyle}
					>
						<option value="PENDING">PENDING</option>
						<option value="CONFIRMED">CONFIRMED</option>
						<option value="CANCELED">CANCELLED</option>
						<option value="CHECKED_OUT">CHECKED_OUT</option>
					</select>
				</div>

				{/* Status Pembayaran */}
				{/* <div className="mb-4">
					<label className="block text-sm font-medium mb-1">
						Status Pembayaran
					</label>
					<select
						value={formData.payment?.status}
						onChange={(e) =>
							setFormData({
								...formData,
								payment: { ...formData.payment?.status, status: e.target.value },
							})
						}
						className={inputStyle}
					>
						<option value="UNPAID">UNPAID</option>
						<option value="PAID">PAID</option>
					</select>
				</div> */}

				{/* Metode Pembayaran */}
				{/* <div className="mb-4">
					<label className="block text-sm font-medium mb-1">
						Metode Pembayaran
					</label>
					<select
						value={formData.payment.method}
						onChange={(e) =>
							setFormData({
								...formData,
								payment: { ...formData.payment., method: e.target.value },
							})
						}
						className={inputStyle}
					>
						<option value="TRANSFER">TRANSFER</option>
						<option value="CASH">CASH</option>
					</select>
				</div> */}

				{/* Bukti Pembayaran */}

				{/* <div className="mb-4">
					<label className="block text-sm font-medium mb-1">
						Bukti Pembayaran (Upload)
					</label>
					<input
						type="file"
						accept="image/*,application/pdf"
						onChange={(e) => {
							if (e.target.files && e.target.files[0]) {
								setProofFile(e.target.files[0]);
							}
						}}
						className={inputStyle}
					/>
				</div> */}

				{/* Tombol aksi */}
				<div className="flex justify-end gap-3">
					<button
						onClick={handleUpdate}
						disabled={isSubmitting}
						className={`px-4 py-2 bg-blue-600 text-white rounded-xl ${
							isSubmitting ? "opacity-50 cursor-not-allowed" : ""
						}`}
					>
						{isSubmitting ? "Menyimpan..." : "Perbarui"}
					</button>
					<button
						onClick={onClose}
						className="px-4 py-2 bg-gray-300 text-gray-800 rounded-xl"
					>
						Batal
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditReservation;
