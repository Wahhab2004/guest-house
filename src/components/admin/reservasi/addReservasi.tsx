"use client";

import { Guest, Reservation, Room } from "@/fetching";
import { useEffect, useState } from "react";
import { validateReservationForm } from "./validateReservationform";

interface AddReservationProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (data: Reservation) => void;
	token: string | null;
}

const AddReservation: React.FC<AddReservationProps> = ({
	isOpen,
	onClose,
	onSave,
}) => {
	const [formData, setFormData] = useState<Reservation>({
		id: "",
		guestId: "",
		roomId: "",
		checkIn: "",
		checkOut: "",
		guestTotal: 0,
		totalPrice: 0,
		status: "",
		createdAt: "",
		guest: {
			id: "",
			name: "",
			username: "",
			email: "",
			phone: "",
			password: "",
			passport: "",
			dateOfBirth: "",
			country: "",
			gender: "",
		},
		room: {
			id: "",
			name: "",
			description: "",
			price: 0,
			status: "",
			photoUrl: "",
		},
		Payment: {
			id: "",
			reservationId: "",
			method: "",
			status: "",
			amount: 0,
			proofUrl: "",
		},
	});

	const [error, setError] = useState<{ [key: string]: string }>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [guests, setGuests] = useState<Guest[]>([]);
	const [rooms, setRooms] = useState<Room[]>([]);

	useEffect(() => {
	if (!isOpen) return;

	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

	// Fetch guest data
	const fetchGuests = async () => {
		try {
			const res = await fetch(`${baseUrl}/guests`);
			const data = await res.json();
			setGuests(data.data || []);
		} catch (err) {
			console.error("Gagal mengambil data tamu:", err);
		}
	};

	// Fetch room data dengan filter tanggal check-in & check-out
	const fetchRooms = async () => {
		try {
			if (!formData.checkIn || !formData.checkOut) return;

			const searchParams = new URLSearchParams();
			searchParams.append("checkIn", new Date(formData.checkIn).toISOString());
			searchParams.append("checkOut", new Date(formData.checkOut).toISOString());

			const res = await fetch(`${baseUrl}/rooms/available?${searchParams.toString()}`);
			const data = await res.json();
			setRooms(data.data || []);
		} catch (err) {
			console.error("Gagal mengambil data kamar:", err);
		}
	};

	fetchGuests();
	fetchRooms();

}, [isOpen, formData.checkIn, formData.checkOut]); // 👈 Tambahkan dependency agar filter jalan otomatis


	const handleSave = async () => {
		const validationErrors = validateReservationForm(formData);
		if (Object.keys(validationErrors).length > 0) {
			setError(validationErrors);
			return;
		}

		setError({});
		setIsSubmitting(true);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/reservations`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						guestId: formData.guestId,
						roomId: formData.roomId,
						checkIn: formData.checkIn,
						checkOut: formData.checkOut,
						guestTotal: parseInt(formData.guestTotal.toString(), 10),
					}),
				}
			);

			const result = await response.json();

			if (!response.ok) {
				console.error("Gagal:", result.message);
				// Tambahkan penanganan error dari server
				return;
			}

			console.log("Reservasi berhasil:", result.data);
			onSave(result.data);
			onClose();
		} catch (error) {
			console.error("Error saat mengirim permintaan:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div
			className="modal"
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
					width: "700px",
				}}
			>
				<h2 className="text-2xl font-semibold mb-4">Tambah Reservasi</h2>

				<div className="mb-4">
					<label className="block text-sm font-medium mb-1">Pilih Guest</label>
					<select
						value={formData.guestId}
						onChange={(e) =>
							setFormData({ ...formData, guestId: e.target.value })
						}
						className="w-full border border-gray-300 rounded-md px-3 py-2"
					>
						<option value="">-- Pilih Guest --</option>
						{guests.map((guest) => (
							<option key={guest.id} value={guest.id}>
								{guest.name} ({guest.email})
							</option>
						))}
					</select>
					{error.guestId && (
						<p className="text-red-500 text-sm mt-1">{error.guestId}</p>
					)}
				</div>

				<div className="flex flex-col md:flex-row gap-4 mb-6">
					<div className="mb-4">
						<label className="block text-sm font-medium mb-1">Pilih Room</label>
						<select
							value={formData.roomId}
							onChange={(e) =>
								setFormData({ ...formData, roomId: e.target.value })
							}
							className="w-full border border-gray-300 rounded-md px-3 py-2"
						>
							<option value="">-- Pilih Room --</option>
							{rooms.map((room) => (
								<option key={room.id} value={room.id}>
									{room.name} - Rp{room.price}
								</option>
							))}
						</select>
						{error.roomId && (
							<p className="text-red-500 text-sm mt-1">{error.roomId}</p>
						)}
					</div>

					<div className="w-full md:w-1/2">
						<label className="block text-sm font-medium mb-1">Check In</label>
						<input
							type="date"
							value={formData.checkIn}
							onChange={(e) =>
								setFormData({ ...formData, checkIn: e.target.value })
							}
							className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
						/>
						{error.checkIn && (
							<p className="text-red-500 text-sm mt-1">{error.checkIn}</p>
						)}
					</div>

					<div className="w-full md:w-1/2">
						<label className="block text-sm font-medium mb-1">Check Out</label>
						<input
							type="date"
							value={formData.checkOut}
							onChange={(e) =>
								setFormData({ ...formData, checkOut: e.target.value })
							}
							className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
						/>
						{error.checkOut && (
							<p className="text-red-500 text-sm mt-1">{error.checkOut}</p>
						)}
					</div>

					<div className="w-full md:w-1/2">
						<label className="block text-sm font-medium mb-1">
							Guest Total
						</label>
						<input
							type="number"
							value={formData.guestTotal}
							onChange={(e) =>
								setFormData({
									...formData,
									guestTotal: parseInt(e.target.value, 10),
								})
							}
							className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
						/>
						{error.guestTotal && (
							<p className="text-red-500 text-sm mt-1">{error.guestTotal}</p>
						)}
					</div>
				</div>

				<div className="flex justify-end gap-3">
					<button
						onClick={handleSave}
						disabled={isSubmitting}
						className={`px-4 py-2 bg-green-600 text-white rounded-xl ${
							isSubmitting ? "opacity-50 cursor-not-allowed" : ""
						}`}
					>
						{isSubmitting ? "Menyimpan..." : "Simpan"}
					</button>
					<button
						onClick={onClose}
						className="px-4 py-2 bg-gray-300 text-gray-800 rounded-xl"
					>
						Tutup
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddReservation;
