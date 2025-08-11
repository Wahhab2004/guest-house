"use client";
import Badge from "@/components/Badge";
import formatDateIndo from "@/components/format-tanggal/formatTanggal";
import { Reservation, fetchReservations } from "@/fetching";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const GuestReservation = () => {
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [currentPage, setcurrentPage] = useState(1);
	const itemsPerPage = 5;

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
		data?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

	const totalPages = Math.ceil(reservations?.length / itemsPerPage);

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
		<div className="mt-3 md:ml-[200px] lg:ml-[270px] xl:ml-[320px] px-4 ">
			<div className="flex justify-between">
				<h1 className="font-bold text-xl mb-4">Guest Reservation</h1>

				<Link href="/guest-reservation">
					<p>
						<span className="text-blue-500  italic font-semibold text-sm">
							See all
						</span>
					</p>
				</Link>
			</div>

			<div className="border shadow rounded-lg p-4 overflow-x-auto">
				<table className="min-w-full text-left tracking-wide ">
					<thead className="text-sm">
						<tr className="bg-gray-100 font-medium">
							<th className="px-2 py-2 whitespace-nowrap">#</th>
							<th className="px-2 py-2 whitespace-nowrap">GUEST NAME</th>
							<th className="px-2 py-2 whitespace-nowrap">ROOM</th>

							<th className="px-2 py-2 whitespace-nowrap">CHECKIN</th>
							<th className="px-2 py-2 whitespace-nowrap">CHECKOUT</th>
							<th className="px-2 py-2 whitespace-nowrap">TOTAL PAYMENT</th>
							<th className="px-2 py-2 whitespace-nowrap">STATUS</th>
						</tr>
					</thead>
					<tbody>
						{getPaginatedData(reservations, currentPage).map((item, index) => (
							<tr key={index} className="text-gray-700 border-b">
								<td className="py-4 px-2 whitespace-nowrap">
									{(currentPage - 1) * itemsPerPage + index + 1}
								</td>
								<td className="py-4 px-2 whitespace-nowrap">
									{item.guest.name}
								</td>
								<td className="py-4 px-2 whitespace-nowrap">
									{item.room.name}
								</td>
								<td className="py-4 px-2 whitespace-nowrap">
									{formatDateIndo(item.checkIn)}
								</td>
								<td className="py-4 px-2 whitespace-nowrap">
									{formatDateIndo(item.checkOut)}
								</td>
								<td className="py-4 px-2 whitespace-nowrap">
									{item.totalPrice.toLocaleString("jp-JP", {
										style: "currency",
										currency: "JPY",
									})}
								</td>
								<td className="py-4 px-2 whitespace-nowrap text-xs">
									<Badge type={item.status}>{item.status}</Badge>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* Pagination */}
			<div className="flex justify-between items-center mt-8 gap-4">
				{/* Previous Button */}
				<button
					onClick={handlePrevCheckIn}
					disabled={currentPage === 1}
					className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-400 text-gray-600 text-sm font-medium transition duration-200 ease-in-out
			hover:bg-gray-200 hover:text-gray-800 active:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
				>
					<svg width="16" height="16" viewBox="0 0 20 20" fill="none">
						<path
							d="M13.125 16.25L6.875 10L13.125 3.75"
							stroke="#5D6679"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<span>Previous</span>
				</button>

				{/* Page Info */}
				<p className="text-sm text-gray-600 font-semibold">
					Page {currentPage} of {totalPages}
				</p>

				{/* Next Button */}
				<button
					onClick={handleNextCheckIn}
					disabled={currentPage === totalPages}
					className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-400 text-gray-600 text-sm font-medium transition duration-200 ease-in-out
			hover:bg-gray-200 hover:text-gray-800 active:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
				>
					<span>Next</span>
					<svg width="16" height="16" viewBox="0 0 16 20" fill="none">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M9.9641 10.0005L4.0716 15.893L5.24993 17.0714L11.7316 10.5897C11.8878 10.4334 11.9756 10.2215 11.9756 10.0005C11.9756 9.77955 11.8878 9.56763 11.7316 9.41135L5.24993 2.92969L4.0716 4.10802L9.9641 10.0005Z"
							fill="#5D6679"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default GuestReservation;
