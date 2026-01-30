"use client";

import { Reservation } from "@/fetching";
import { useRouter } from "next/navigation";

interface ReservationCardProps {
	reservation: Reservation;
	onViewDetail: () => void;
}

// Warna status
const statusColors: Record<string, string> = {
	PENDING: "bg-yellow-400 text-yellow-900",
	CONFIRMED: "bg-yellow-500 text-white",
	CHECKED_OUT: "bg-gray-400 text-white",
	CANCELED: "bg-red-500 text-white",
	ACTIVE: "bg-green-500 text-white",
};

// Background card per status
const cardBackground: Record<string, string> = {
	PENDING: "bg-gradient-to-br from-yellow-50 to-yellow-100",
	CONFIRMED: "bg-gradient-to-br from-yellow-50 to-yellow-100",
	CHECKED_OUT: "bg-gradient-to-br from-gray-100 to-gray-200",
	CANCELED: "bg-gradient-to-br from-red-50 to-red-100",
	ACTIVE: "bg-gradient-to-br from-green-50 to-green-100",
};

// Sub-komponen untuk menampilkan label + value
const ReservationInfo = ({
	label,
	value,
}: {
	label: string;
	value: string | number;
}) => (
	<p className="flex justify-between py-1 border-b border-gray-200 last:border-0">
		<span className="font-medium text-gray-600">{label}:</span>
		<span className="text-gray-800">{value}</span>
	</p>
);

export default function ReservationCard({
	reservation,
	onViewDetail,
}: ReservationCardProps) {
	const {
		id,
		room,
		checkIn,
		checkOut,
		guestTotal,
		finalPrice,
		payment,
		status,
	} = reservation;

	const router = useRouter();

	// Tentukan label status
	const statusLabel =
		status === "CONFIRMED"
			? "Pending Payment"
			: status === "ACTIVE"
				? "Active"
				: status === "CHECKED_OUT"
					? "Checked Out"
					: "Cancelled";

	const handleRedirectPayment = (e: React.MouseEvent) => {
		e.stopPropagation();
		// Redirect ke halaman /reservations dengan query id
		router.push(`/my-reservations/reservations?id=${id}`);
	};

	return (
		<div
			className={`relative p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${cardBackground[status]} border border-gray-100`}
			onClick={onViewDetail}
		>
			{/* Booking ID di pojok kanan atas */}
			<div className="absolute top-3 left-5 text-xs text-gray-500 font-mono bg-gray-50 italic px-2 py-1 rounded-md shadow-sm">
				Booking #{id}
			</div>

			{/* Header: Nama Room + Status */}
			<div className="flex justify-between items-start mb-4 mt-4">
				<h3 className="font-bold text-xl text-gray-800 pr-16">{room.name}</h3>
				<span
					className={`text-sm font-bold px-4 py-2 rounded-full ${statusColors[status]} shadow-md transform transition-transform hover:scale-105`}
				>
					{statusLabel}
				</span>
			</div>

			{/* Body Info */}
			<div className="space-y-2 text-gray-700 text-sm">
				<ReservationInfo
					label="Check-in"
					value={new Date(checkIn).toLocaleDateString()}
				/>
				<ReservationInfo
					label="Check-out"
					value={new Date(checkOut).toLocaleDateString()}
				/>
				<ReservationInfo label="Total Guests" value={guestTotal} />
				<ReservationInfo
					label="Payment Status"
					value={payment?.status || "N/A"}
				/>
			</div>

			{/* Total Price - lebih ditekan */}
			<div className="mt-4 pt-4 border-t border-gray-200">
				<p className="text-lg font-bold text-gray-800 flex justify-between items-center">
					<span>Total Price:</span>
					<span className="text-2xl">¥{finalPrice}</span>
				</p>
			</div>

			{/* Action Button untuk Pending */}
			{payment?.status === "UNPAID" && status === "CONFIRMED" && (
				<div className="mt-4">
					<button
						className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105 shadow-md"
						onClick={handleRedirectPayment}
					>
						Complete Payment
					</button>
				</div>
			)}
		</div>
	);
}
