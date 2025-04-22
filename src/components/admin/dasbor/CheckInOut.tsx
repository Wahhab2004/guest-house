"use client";

import ConvertDate from "@/components/ConvertDate";
import { Reservation, fetchReservations } from "@/fetching";
import React, { useEffect, useState } from "react";

const CheckInOut = () => {
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [currentPageCheckIn, setCurrentPageCheckIn] = useState(1);
	const [currentPageCheckOut, setCurrentPageCheckOut] = useState(1);
	const itemsPerPage = 3;

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

	// Data CheckIn dan CheckOut
	const checkInData = reservations.filter((item: any) => item.checkInDate);
	const checkOutData = reservations.filter((item: any) => item.checkOutDate);

	const getPaginatedData = (data: Reservation[], page: number) =>
		data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

	const totalPagesCheckIn = Math.ceil(checkInData.length / itemsPerPage);
	const totalPagesCheckOut = Math.ceil(checkOutData.length / itemsPerPage);

	const handlePrevCheckIn = () => {
		if (currentPageCheckIn > 1) {
			setCurrentPageCheckIn(currentPageCheckIn - 1);
		}
	};

	const handleNextCheckIn = () => {
		if (currentPageCheckIn < totalPagesCheckIn) {
			setCurrentPageCheckIn(currentPageCheckIn + 1);
		}
	};

	const handlePrevCheckOut = () => {
		if (currentPageCheckOut > 1) {
			setCurrentPageCheckOut(currentPageCheckOut - 1);
		}
	};

	const handleNextCheckOut = () => {
		if (currentPageCheckOut < totalPagesCheckOut) {
			setCurrentPageCheckOut(currentPageCheckOut + 1);
		}
	};

	return (
		<div className="mt-8 ml-[250px] flex justify-between items-center mr-20">
			{/* Checkin */}
			<div className="w-[48%] border shadow rounded-lg p-4">
				{/* Title */}
				<h1 className="font-semibold text-[#5D6679]">Guest Today Check In</h1>
				{/* Checkin Information  */}

				<div className="mt-2 overflow-x-auto rounded-lg shadow-sm">
					<table className="min-w-full text-left text-sm text-gray-500">
						<thead className=" text-[#5D6679] font-semibold">
							<tr>
								<th className="px-4 py-2">Guest Name</th>
								<th className="px-4 py-2">Room</th>
								<th className="px-4 py-2">Date/Time Check Reservation</th>
								<th className="px-4 py-2">Total Payment Amount</th>
							</tr>
						</thead>
						<tbody>
							{getPaginatedData(reservations, currentPageCheckIn).map(
								(item, index) => (
									<tr
										key={index}
										className="border-b hover:bg-gray-50 transition-colors duration-150"
									>
										<td className="px-4 py-2">{item.guest.name}</td>
										<td className="px-4 py-2">{item.room.roomNumber}</td>
										<td className="px-4 py-2">
											{ConvertDate(item.checkInDate)}
										</td>
										<td className="px-4 py-2">
											¥{item.payment.totalAmountPaid}
										</td>
									</tr>
								)
							)}
						</tbody>
					</table>
				</div>

				<div className="flex justify-between mt-8">
					<button
						onClick={handlePrevCheckIn}
						disabled={currentPageCheckIn === 1}
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
					<button
						onClick={handleNextCheckIn}
						disabled={currentPageCheckIn === totalPagesCheckIn}
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

			{/* Checkout */}
			<div className="w-[48%] border shadow rounded-lg p-4">
				<h1 className="font-semibold text-[#5D6679]">Guest Today Check Out</h1>

				<div className="mt-2 overflow-x-auto rounded-lg shadow-sm">
					<table className="min-w-full text-left text-sm text-gray-500">
						<thead className=" text-[#5D6679] font-semibold">
							<tr>
								<th className="px-4 py-2">Guest Name</th>
								<th className="px-4 py-2">Room</th>
								<th className="px-4 py-2">Date/Time Check Reservation</th>
								<th className="px-4 py-2">Total Payment Amount</th>
							</tr>
						</thead>
						<tbody>
							{getPaginatedData(reservations, currentPageCheckOut).map(
								(item, index) => (
									<tr
										key={index}
										className="border-b hover:bg-gray-50 transition-colors duration-150"
									>
										<td className="px-4 py-2">{item.guest.name}</td>
										<td className="px-4 py-2">{item.room.roomNumber}</td>
										<td className="px-4 py-2">
											{ConvertDate(item.checkOutDate)}
										</td>
										<td className="px-4 py-2">
											¥{item.payment.totalAmountPaid}
										</td>
									</tr>
								)
							)}
						</tbody>
					</table>
				</div>

				<div className="flex justify-between mt-8">
					{/* Previous */}
					<button
						onClick={handlePrevCheckOut}
						disabled={currentPageCheckOut === 1}
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

					{/* Next */}
					<button
						onClick={handleNextCheckOut}
						disabled={currentPageCheckOut === totalPagesCheckOut}
						className="border rounded-lg border-black text-xs text-gray-600 border-gray-600 hover:bg-gray-100 hover:text-gray-700  py-1 pr-2 pl-3 flex justify-center items-center font-semibold"
					>
						<p>Next</p>
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

export default CheckInOut;
