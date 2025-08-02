"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchReservations, Reservation } from "@/fetching";
import SearchBar from "@/components/admin/SearchBar";
import { FormatTanggalIndoUser } from "@/components/format-tanggal/formatTanggal";


export default function CheckInOutPage() {
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 15;

	// Search
	const [filteredReservations, setFilteredReservations] =
		useState(reservations);

	const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);

	// Fething data
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchReservations();
				setReservations(data);
				setFilteredReservations(data);
				console.log(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	// Mengatur halaman
	const getPaginatedData = () => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return filteredReservations.slice(startIndex, endIndex);
	};

	// Fungsi pindah halaman selanjutnya
	const handleNext = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	// Fungsi pindah halaman sebelumnya
	const handlePrevious = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<section>
			<h1 className="text-[#5D6679] text-xl font-bold mt-6 ml-[230px]">
				Check In/Out
			</h1>

			<SearchBar
				data={reservations}
				searchField="guest.name"
				onSearchResult={(results) => setFilteredReservations(results)}
				placeholder="Search by guest name"
			/>

			<div className="ml-[235px] border shadow rounded-lg p-4 w-[83%] ">
				{/* Check In/Out Table */}
				<table className="w-full text-left mt-2 tracking-wide">
					<thead>
						<tr>
							{[
								"RESERVATION ID",
								"GUEST NAME",
								"DATE/TIME CHECK IN",
								"DATE/TIME CHECK OUT",
								"ROOM NUMBER",
								"TOTAL PAYMENT",
								"PAYMENT METHOD",
								"GUESTS",
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
							getPaginatedData().map((reservation) => (
								<tr
									key={reservation.id}
									className="text-gray-700 text-sm border-b"
								>
									<td className="py-4">{reservation.id}</td>
									<td className="py-4">{reservation.guest.name}</td>
									<td className="py-4">
										{FormatTanggalIndoUser(reservation.checkInDate)}
									</td>
									<td className="py-4">
										{FormatTanggalIndoUser(reservation.checkOutDate)}
									</td>
									<td className="py-4">{reservation.room.roomNumber}</td>
									<td className="py-4">
										¥{reservation.payment.totalAmountPaid}
									</td>
									<td className="py-4">{reservation.payment.paymentMethod}</td>
									<td className="py-4">{reservation.numOfGuests}</td>

									<td className="p-2 text-blue-600 text-xs">
										<Link href={`/checkin/${reservation.id}`}>See detail</Link>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td className="p-4 text-center text-gray-500" colSpan={8}>
									No reservations found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Pagination Controls */}
			<div className="flex justify-evenly mt-8 mb-20 items-center">
				<button
					onClick={handlePrevious}
					disabled={currentPage === 1}
					className="border rounded-lg text-xs text-gray-600 border-gray-600 hover:bg-gray-200 px-4 py-2"
				>
					Previous
				</button>
				<span className="text-gray-600">
					Page {currentPage} of {totalPages}
				</span>
				<button
					onClick={handleNext}
					disabled={currentPage === totalPages}
					className="border rounded-lg text-xs text-gray-600 border-gray-600 hover:bg-gray-200 px-4 py-2"
				>
					Next
				</button>
			</div>
		</section>
	);
}
