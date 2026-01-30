"use client";
import { Reservation } from "@/fetching";
import Link from "next/link";
import Image from "next/image";

interface ReservationDetailModalProps {
	reservation: Reservation;
	onClose: () => void;
}

export default function ReservationDetailModal({
	reservation,
	onClose,
}: ReservationDetailModalProps) {
	// Format dates for better readability
	const formattedCheckIn = new Date(reservation.checkIn).toLocaleDateString(
		"en-US",
		{
			month: "short",
			day: "numeric",
			year: "numeric",
		}
	);
	const formattedCheckOut = new Date(reservation.checkOut).toLocaleDateString(
		"en-US",
		{
			month: "short",
			day: "numeric",
			year: "numeric",
		}
	);

	// Calculate total nights
	const checkInDate = new Date(reservation.checkIn);
	const checkOutDate = new Date(reservation.checkOut);
	const totalNights = Math.ceil(
		(checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
	);

	// Status color mapping
	const statusColors: Record<string, string> = {
		PENDING: "bg-yellow-400 text-yellow-900",
		CONFIRMED: "bg-green-500 text-white",
		ACTIVE: "bg-green-500 text-white",
		CHECKED_OUT: "bg-gray-400 text-white",
		CANCELED: "bg-red-500 text-white",
	};

	const paymentStatusColors: Record<string, string> = {
		UNPAID: "bg-yellow-400 text-yellow-900",
		PAID: "bg-green-500 text-white",
		HALF_PAID: "bg-orange-400 text-white",
		REFUNDED: "bg-red-500 text-white",
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity duration-300">
			<div className="bg-white w-11/12 max-w-lg p-6 rounded-2xl relative shadow-xl transform transition-all duration-300 scale-100 hover:scale-[1.01] max-h-[80vh] overflow-y-auto">
				{/* Close Button */}
				<button
					className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-xl transition-colors duration-200"
					onClick={onClose}
				>
					×
				</button>

				{/* Header with GuestHouse Ryosuke Branding */}
				<div className="mb-4">
					<h1 className="text-2xl font-bold text-gray-800">
						GuestHouse Ryosuke
					</h1>
					<h2 className="text-lg font-semibold text-gray-700">
						{reservation.room.name}
					</h2>
				</div>

				{/* Room Image */}
				<div className="mb-4">
					<Image
						src={
							reservation.room.photoUrl ||
							"https://via.placeholder.com/600x200?text=Room+Image"
						}
						alt={reservation.room.name}
						width={600}
						height={200}
						className="w-full h-48 object-cover rounded-lg shadow-sm"
					/>
				</div>

				{/* Booking Details */}
				<div className="space-y-2 text-gray-700 text-sm mb-4">
					<p className="flex justify-between">
						<strong>Booking #:</strong> <span>{reservation.id}</span>
					</p>
					<p className="flex justify-between">
						<strong>Check-in:</strong> <span>{formattedCheckIn}</span>
					</p>
					<p className="flex justify-between">
						<strong>Check-out:</strong> <span>{formattedCheckOut}</span>
					</p>
					<p className="flex justify-between">
						<strong>Total Nights:</strong>
						<span>
							{totalNights} {totalNights === 1 ? "night" : "nights"}
						</span>
					</p>
					<p className="flex justify-between">
						<strong>Total Guests:</strong> <span>{reservation.guestTotal}</span>
					</p>
					<p className="flex justify-between">
						<strong>Total Price:</strong>
						<span className="text-base font-bold">
							${reservation.finalPrice}
						</span>
					</p>
					<p className="flex justify-between">
						<strong>Status:</strong>
						<span
							className={`px-2 py-1 rounded-full text-xs font-semibold ${
								statusColors[reservation.status] || "bg-gray-200 text-gray-800"
							}`}
						>
							{reservation.status}
						</span>
					</p>
					<p className="flex justify-between">
						<strong>Payment Status:</strong>
						<span
							className={`px-2 py-1 rounded-full text-xs font-semibold ${
								paymentStatusColors[reservation.payment?.status || "UNPAID"]
							}`}
						>
							{reservation.payment?.status || "N/A"}
						</span>
					</p>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-3">
					<Link
						href="https://wa.me/+6281322977332"
						target="_blank"
						className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-center transition-all duration-200 transform hover:scale-105 shadow-sm"
					>
						Chat Admin Indonesia
					</Link>
					<Link
						href="https://wa.me/+818032423077"
						target="_blank"
						className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-center transition-all duration-200 transform hover:scale-105 shadow-sm"
					>
						Chat Admin Japan
					</Link>
				</div>
			</div>
		</div>
	);
}
