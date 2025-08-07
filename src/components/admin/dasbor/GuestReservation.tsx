"use client";
import formatDateIndo, {
	FormatTanggalIndoUser,
} from "@/components/format-tanggal/formatTanggal";
import { Reservation, fetchReservations } from "@/fetching";
import React, { useEffect, useState } from "react";

const GuestReservation = () => {
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [currentPage, setcurrentPage] = useState(1);
	const itemsPerPage = 10;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchReservations();
				setReservations(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	// Mengatur halaman
	const getPaginatedData = (data: Reservation[], page: number) =>
		data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

	const totalPages = Math.ceil(reservations.length / itemsPerPage);

	// Previous
	const handlePrevCheckIn = () => {
		if (currentPage > 1) {
			setcurrentPage(currentPage - 1);
		}
	};

	// Next
	const handleNextCheckIn = () => {
		if (currentPage < totalPages) {
			setcurrentPage(currentPage + 1);
		}
	};

	return (
		<div className="mt-8 ml-[250px] mr-10">
			<div className="border shadow rounded-lg p-4 ">
				<h1 className="font-semibold text-[#5D6679]">Guest Reservation</h1>
				<table className="w-full text-left mt-5 tracking-wide">
					<thead>
						<tr className="text-[#5D6679] text-[10px] p-2">
							<th className="px-2">#</th>
							<th>GUEST NAME</th>
							<th>ROOM</th>
							<th>DATE/TIME RESERVATION</th>
							<th>CHECKIN</th>
							<th>CHECKOUT</th>
							<th>TOTAL PAYMENT</th>
							<th>PAYMENT STATUS</th>
						</tr>
					</thead>
					<tbody>
						{getPaginatedData(reservations, currentPage).map(
							(item, index) => (
								<tr key={index} className="text-gray-700 text-sm border-b ">
									<td className="py-4 px-2 ">
										{(currentPage - 1) * itemsPerPage + index + 1}
									</td>
									<td className="py-4">{item.guest.name}</td>
									<td className="py-4">{item.room.name}</td>
									<td className="py-4">
										{formatDateIndo(item.createdAt)}

									
									</td> 
									<td className="py-4">
										{FormatTanggalIndoUser(item.checkIn)}
									</td>
									<td className="py-4">
										{FormatTanggalIndoUser(item.checkOut)}
									</td>
									{/* Bisa payment indo, bisa juga japan atau japan */}
									<td className="py-4">¥{item.totalPrice}</td>
					
									<td className="py-4 text-xs">
										{item.Payment?.status === "PAID" ? (
											<span className="text-green-900 bg-green-100 p-1 border-green-200 border rounded-lg px-2">
												{item.Payment?.status}
											</span>
										) : item.Payment?.status === "HALF PAID" ? (
											<span className="text-orange-900 bg-orange-100 p-1 border-orange-200 border rounded-lg px-2">
												{item.Payment?.status}
											</span>
										) : item.Payment?.status ===
										  "UNPAID" ? (
											<span className="text-red-900 bg-red-100 p-1 border-red-200  border rounded-lg px-2">
												{item.Payment?.status}
											</span>
										) : (
											<span>{item.Payment?.status}</span>
										)}
									</td>
								</tr>
							)
						)}
					</tbody>
				</table>

				{/* Handle prev and next */}
				<div className="flex justify-between mt-8">
					<button
						onClick={handlePrevCheckIn}
						disabled={currentPage === 1}
						className="border rounded-lg border-black text-xs text-gray-600 border-gray-600 hover:bg-gray-100 hover:text-gray-700 pr-2 py-1 flex justify-center items-center font-semibold"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M13.125 16.25L6.875 10L13.125 3.75" fill="white" />
							<path
								d="M13.125 16.25L6.875 10L13.125 3.75"
								stroke="#5D6679"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						Previous
					</button>

					<div>
						<p className="text-xs text-gray-600 font-semibold">
							Page {currentPage} of {totalPages}
						</p>
					</div>
					<button
						onClick={handleNextCheckIn}
						disabled={currentPage === totalPages}
						className="border rounded-lg border-black text-xs text-gray-600 border-gray-600 hover:bg-gray-100 hover:text-gray-700  py-1 pr-2 pl-3 flex justify-center items-center font-semibold"
					>
						Next
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M9.9641 10.0005L4.0716 15.893L5.24993 17.0714L11.7316 10.5897C11.8878 10.4334 11.9756 10.2215 11.9756 10.0005C11.9756 9.77955 11.8878 9.56763 11.7316 9.41135L5.24993 2.92969L4.0716 4.10802L9.9641 10.0005Z"
								fill="#5D6679"
								className="stroke-none "
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default GuestReservation;
