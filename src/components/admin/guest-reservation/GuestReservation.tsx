import formatDateIndo from "@/components/format-tanggal/formatTanggal";
import { Reservation } from "@/fetching";
import Link from "next/link";

import { useState } from "react";
import ModalEditReservasi from "./editReservation";

type GuestReservationProps = {
	getPaginatedData: () => Reservation[];
	key?: number;
};

export default function GuestReservationTable({
	getPaginatedData,
}: GuestReservationProps) {
	const [selectedReservation, setSelectedReservation] =
		useState<Reservation | null>(null);
	// const [refreshKey, setRefreshKey] = useState(0);

	const handleClose = () => setSelectedReservation(null);

	const handleSuccess = () => {
		// setRefreshKey((prev) => prev + 1); // trigger re-render/pagination refresh
	};

	return (
		<div className="ml-[235px] border shadow rounded-lg p-4 w-[83%]">
			<table className="w-full text-left mt-2 tracking-wide">
				<thead>
					<tr>
						{[
							"NO",
							"NAMA TAMU",
							"NAMA KAMAR",
							"TANGGAL RESERVASI",
							"WAKTU/LAMA RESERVASI",
							"METODE PEMBAYARAN",
							"JUMLAH TAMU",
							"STATUS",
							"HARGA",
							"AKSI",
							"DETAIL",
						].map((header, idx) => (
							<th key={idx} className="text-[#5D6679] text-[10px] pr-2">
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{getPaginatedData().length > 0 ? (
						getPaginatedData().map((reservation, index) => (
							<tr
								key={reservation.id}
								className="text-gray-700 text-[10px] xs:text-[12px] border-b"
							>
								<td className="py-4">{index + 1}</td>
								<td className="py-4">{reservation.guest.name}</td>
								<td className="py-4">{reservation.room.name}</td>
								<td className="py-4">
									{formatDateIndo(reservation.createdAt)}
								</td>
								<td className="py-4">
									{formatDateIndo(reservation.checkIn)} -{" "}
									{formatDateIndo(reservation.checkOut)}
								</td>

								<td className="py-4">{reservation.Payment?.method}</td>
								<td className="py-4">{reservation.guestTotal}</td>
								<td className="py-4 text-xs">
									{reservation.Payment?.status === "PAID" ? (
										<span className="text-green-900 bg-green-100 p-1 border-green-200 border rounded-lg px-2">
											{reservation.Payment?.status}
										</span>
									) : reservation.Payment?.status === "HALF_PAID" ? (
										<span className="text-orange-900 bg-orange-100 p-1 border-orange-200 border rounded-lg px-2">
											{reservation.Payment?.status}
										</span>
									) : reservation.Payment?.status === "UNPAID" ? (
										<span className="text-red-900 bg-yellow-100 border border-yellow-200 rounded-lg p-1  px-2">
											{reservation.Payment?.status}
										</span>
									) : (
										<span>{reservation.Payment?.status}</span>
									)}
								</td>

								<td className="py-4">
									{reservation.totalPrice.toLocaleString("id-ID", {
										style: "currency",
										currency: "IDR",
									})}
								</td>

								<td className="flex flex-col gap-1 text-xs">
									<button
										onClick={() => setSelectedReservation(reservation)}
										className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
									>
										Edit
									</button>
									<button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
										Delete
									</button>
								</td>

								{/* Jangan lupa buat modal */}
								<td className="p-2 text-blue-600 text-xs">
									<Link href={`/checkout/${reservation.id}`}> See detail</Link>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td className="p-4 text-center text-gray-500" colSpan={13}>
								No reservations found.
							</td>
						</tr>
					)}
				</tbody>
			</table>

			{selectedReservation && (
				<ModalEditReservasi
					reservation={selectedReservation}
					onClose={handleClose}
					onSuccess={handleSuccess}
				/>
			)}
		</div>
	);
}
