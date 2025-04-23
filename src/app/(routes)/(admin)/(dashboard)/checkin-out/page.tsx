"use client";

import Link from "next/link";
import { useState } from "react";
import reservations from "../../../../../components/admin/checkin-out/data";

export default function CheckInOutPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 15;

	// Search
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredReservations, setFilteredReservations] =
		useState(reservations);

	const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);

	// Fungsi mencari data pengguna berdasarkan nama
	const handleSearch = () => {
		const result = reservations.filter((reservation) =>
			reservation.guestName.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredReservations(result);
		setCurrentPage(1); // Reset ke halaman 1 setelah pencarian
	};

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

			{/* Search Bar */}
			<div className="mt-[20px] flex gap-2 mb-4 items-center">
				<div className="flex items-center justify-end w-11/12">
					<div className="border border-gray-400 flex items-center rounded-md">
						<label htmlFor="search" className="mr-3 ml-2">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M10.5 3.74891C9.61358 3.74891 8.73583 3.92351 7.91689 4.26273C7.09794 4.60194 6.35382 5.09915 5.72703 5.72594C5.10023 6.35274 4.60303 7.09685 4.26381 7.9158C3.92459 8.73475 3.75 9.61249 3.75 10.4989C3.75 11.3853 3.92459 12.2631 4.26381 13.082C4.60303 13.901 5.10023 14.6451 5.72703 15.2719C6.35382 15.8987 7.09794 16.3959 7.91689 16.7351C8.73583 17.0743 9.61358 17.2489 10.5 17.2489C12.2902 17.2489 14.0071 16.5378 15.273 15.2719C16.5388 14.006 17.25 12.2891 17.25 10.4989C17.25 8.7087 16.5388 6.99181 15.273 5.72594C14.0071 4.46007 12.2902 3.74891 10.5 3.74891ZM2.25 10.4989C2.25017 9.17401 2.56944 7.86864 3.18079 6.69321C3.79214 5.51779 4.67759 4.50689 5.76224 3.74603C6.84689 2.98517 8.09883 2.49674 9.41216 2.32204C10.7255 2.14734 12.0616 2.29151 13.3074 2.74237C14.5533 3.19322 15.6722 3.9375 16.5695 4.91223C17.4669 5.88697 18.1163 7.06349 18.4628 8.34227C18.8094 9.62106 18.8428 10.9645 18.5603 12.2589C18.2778 13.5534 17.6878 14.7607 16.84 15.7789L21.53 20.4689C21.6037 20.5376 21.6628 20.6204 21.7038 20.7124C21.7448 20.8044 21.7668 20.9037 21.7686 21.0044C21.7704 21.1051 21.7518 21.2051 21.7141 21.2985C21.6764 21.3919 21.6203 21.4767 21.549 21.548C21.4778 21.6192 21.393 21.6753 21.2996 21.713C21.2062 21.7508 21.1062 21.7693 21.0055 21.7675C20.9048 21.7657 20.8055 21.7437 20.7135 21.7027C20.6215 21.6617 20.5387 21.6026 20.47 21.5289L15.78 16.8389C14.5752 17.8424 13.1094 18.4818 11.5543 18.6822C9.99922 18.8826 8.41922 18.6356 6.99941 17.9703C5.5796 17.305 4.37878 16.2489 3.53763 14.9256C2.69648 13.6024 2.24983 12.0669 2.25 10.4989Z"
									fill="#5D6679"
								/>
							</svg>
						</label>

						<input
							type="text"
							id="search"
							placeholder="Search by guest name"
							value={searchQuery}
							className="p-2 outline-none text-[#5D6679]"
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>

				<button
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-5"
					onClick={handleSearch}
				>
					Search
				</button>
			</div>

			<div className="ml-[235px] border shadow rounded-lg p-4 w-[83%] ">
				{/* Check In/Out Table */}
				<table className="w-full text-left mt-2 tracking-wide">
					<thead>
						<tr>
							{[
								"Reservation ID",
								"Guest Name",
								"Date/Time Check In",
								"Date/Time Check Out",
								"Room Type",
								"Total Amount Paid",
								"Payment Method",
								"Number of Guests",
								"Detail",
							].map((header, idx) => (
								<th key={idx} className="text-[#5D6679] font-semibold text-sm">
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
									className="text-gray-400 text-sm border-b"
								>
									<td className="py-4">{reservation.id}</td>
									<td className="py-4">{reservation.guestName}</td>
									<td className="py-4">{reservation.checkinDate}</td>
									<td className="py-4">{reservation.checkoutDate}</td>
									<td className="py-4">{reservation.roomType}</td>
									<td className="py-4">{reservation.totalPaid}</td>
									<td className="py-4">{reservation.paymentMethod}</td>
									<td className="py-4">{reservation.numGuests}</td>

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
