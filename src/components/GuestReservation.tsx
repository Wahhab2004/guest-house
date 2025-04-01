"use client";
import { Reservation, fetchReservations } from "@/fetching";
import React, { useEffect, useState } from "react";

const GuestReservation = () => {
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [currentPageCheckIn, setCurrentPageCheckIn] = useState(1);
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


	const getPaginatedData = (data: Reservation[], page: number) =>
		data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

	const totalPagesCheckIn = Math.ceil(reservations.length / itemsPerPage);

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

	const convertFirebaseTimestampToFormattedDate = (timestamp: {
		seconds: any;
		nanoseconds: any;
	}) => {
		const seconds = timestamp.seconds;
		const nanoseconds = timestamp.nanoseconds;

		// Mengonversi menjadi objek Date
		const date = new Date(seconds * 1000); // Mengonversi detik ke milidetik
		const dateWithNanoseconds = new Date(
			date.getTime() + nanoseconds / 1000000
		); // Menambahkan nanodetik

		// Menggunakan toLocaleString untuk mendapatkan format tanggal dan waktu yang diinginkan
		const formattedDate = dateWithNanoseconds.toLocaleString("id-ID", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		});

		return formattedDate.replace("/", "-").replace("/", "-").replace(".", ":");
	};

	return (
		<div className="mt-8 ml-[250px] mr-10">
			<div className="border shadow rounded-lg p-4 ">
				<h1 className="font-semibold text-[#5D6679]">Guest Reservation</h1>
				<div className="flex justify-between items-start mt-2 tracking-wide h-[100px]">
					{/* GuestName */}
					<div className=" w-[150px]">
						<h3 className="font-semibold text-[#5D6679]">Guest Name</h3>
						{getPaginatedData(reservations, currentPageCheckIn).map(
							(item, index) => (
								<p className="text-gray-400 text-[15px] leading-8" key={index}>
									{item.guestDetails.name}
								</p>
							)
						)}
					</div>

					{/* Room */}
					<div>
						<h3 className="font-semibold text-[#5D6679]">Room</h3>
						{getPaginatedData(reservations, currentPageCheckIn).map(
							(item, index) => (
								<p className="text-gray-400 text-[15px] leading-8" key={index}>
									{item.roomDetails.roomType}
								</p>
							)
						)}
					</div>

					{/* Date CheckIn */}
					<div>
						<h3 className="font-semibold text-[#5D6679]">
							Date/Time Check Reservation
						</h3>
						{getPaginatedData(reservations, currentPageCheckIn).map(
							(item, index) => {
								const date = convertFirebaseTimestampToFormattedDate(
									item.dateReservation
								);
								return (
									<p
										className="text-gray-400 text-[15px] leading-8"
										key={index}
									>
										{date}
									</p>
								);
							}
						)}
					</div>

					{/* Total Payment Amount */}
					<div>
						<h3 className="font-semibold text-[#5D6679]">
							Total Payment Amount
						</h3>
						{getPaginatedData(reservations, currentPageCheckIn).map(
							(item, index) => (
								<p className="text-gray-400 text-[15px] leading-8" key={index}>
									{item.paymentDetails.totalAmountPaid}
								</p>
							)
						)}
					</div>

					{/* Payment Status */}
					<div>
						<h3 className="font-semibold text-[#5D6679]">Payment Status</h3>
						{getPaginatedData(reservations, currentPageCheckIn).map(
							(item, index) => (
								<p className="text-xs leading-8" key={index}>
									{item.paymentDetails.paymentStatus === "paid" ? (
										<span className="text-green-500 bg-green-100 p-1 rounded px-2">
											{item.paymentDetails.paymentStatus}
										</span>
									) : item.paymentDetails.paymentStatus ===
									  "pending payment" ? (
										<span className="text-orange-500 bg-orange-100 p-1 rounded px-2">
											{item.paymentDetails.paymentStatus}
										</span>
									) : item.paymentDetails.paymentStatus ===
									  "pending verification" ? (
										<span className="text-red-500 bg-red-100 p-1 rounded px-2">
											{item.paymentDetails.paymentStatus}
										</span>
									) : (
										<span className="text-gray-400">
											{item.paymentDetails.paymentStatus}
										</span>
									)}
								</p>
							)
						)}
					</div>
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
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
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
								fill-rule="evenodd"
								clip-rule="evenodd"
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
