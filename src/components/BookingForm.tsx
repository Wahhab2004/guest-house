"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { fetchReservations, Reservation } from "@/fetching";

const BookingForm = () => {
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [guests, setGuests] = useState(0);
	const [results, setResults] = useState<Reservation[]>([]);
	const [isSearching, setIsSearching] = useState(false);

	// Fething data
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

	const handleSearch = async () => {
		if (!checkIn || !checkOut || guests <= 0) {
			alert("Please fill in all fields with valid data!");
			return;
		}

		setIsSearching(true);

		const thisDay = new Date();
		console.log(thisDay);



		try {
			// Konversi input user ke timestamp
			const userCheckIn = new Date(checkIn).getTime();
			const userCheckOut = new Date(checkOut).getTime();

			// Ambil room ID yang *bentrok* dengan input user
			const bookedRoomIds = reservations
				.filter((res) => {
					const resCheckIn = res.checkInDate.seconds * 1000;
					const resCheckOut = res.checkOutDate.seconds * 1000;

					const isOverlapping =
						userCheckIn < resCheckOut && userCheckOut > resCheckIn;

					return isOverlapping;
				})
				.map((res) => res.idRoom);

			// Ambil reservasi yang TIDAK bentrok (berarti available)
			const availableReservations = reservations.filter(
				(res) => !bookedRoomIds.includes(res.idRoom)
			);

			setResults(availableReservations);
		} catch (error) {
			console.error("Error during search:", error);
			setResults([]);
		} finally {
			setIsSearching(false);
		}
	};

	return (
		<>
			<div className="flex justify-between items-center w-full bg-white shadow-xl p-4 transform -translate-y-1/2 rounded-xl px-6 lg:w-3/4 mx-auto z-10">
				{/* Check-in */}
				<div className="mr-1 w-full lg:w-1/2">
					<div className="flex items-center">
						<Image
							src="/images/calendar.svg"
							width={24}
							height={24}
							alt="icon calendar"
						/>
						<p className="text-sm ml-1.5 font-medium">Check-in</p>
					</div>
					<input
						type="date"
						name="check-in"
						id="check-in"
						className="border rounded-lg p-2 mt-2 w-full shadow"
						value={checkIn}
						onChange={(e) => setCheckIn(e.target.value)}
					/>
				</div>

				{/* Check-out */}
				<div className="mr-1 w-full lg:w-1/2 ml-2">
					<div className="flex items-center">
						<Image
							src="/images/calendar.svg"
							width={24}
							height={24}
							alt="icon calendar"
						/>
						<p className="text-sm ml-1.5 font-medium">Check-out</p>
					</div>
					<input
						type="date"
						name="check-out"
						id="check-out"
						className="border shadow rounded-lg p-2 mt-2 w-full"
						value={checkOut}
						onChange={(e) => setCheckOut(e.target.value)}
					/>
				</div>

				{/* Guests */}
				<div className="lg:w-1/2 ml-2">
					<div className="flex items-center">
						<Image
							src="/images/user.svg"
							width={24}
							height={24}
							alt="icon user"
						/>
						<p className="text-sm ml-1.5 font-medium">Guests</p>
					</div>
					<input
						type="number"
						name="guests"
						id="guests"
						className="border shadow rounded-lg p-2 mt-2 w-full"
						value={guests}
						onChange={(e) => setGuests(Number(e.target.value))}
					/>
				</div>

				<div className="flex items-center justify-center hidden md:flex lg:w-fit ml-2">
					<button
						onClick={handleSearch}
						className="hover:cursor-pointer object-cover bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
					>
						Search
					</button>
				</div>
			</div>

			{/* Search Button for Mobile */}
			<div className="flex items-center justify-center -translate-y-3/4 md:hidden">
				<button
					onClick={handleSearch}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-1/2"
				>
					Search
				</button>
			</div>

			{/* Search Results */}
			<div className="mt-8">
				{isSearching ? (
					<p>Loading...</p>
				) : results ? (
					results.length > 0 ? (
						<ul>
							{results
								.filter((room: Reservation) => {
									// Konversi Firestore Timestamp ke Date
									const roomCheckInDate = new Date(
										room.checkInDate.seconds * 1000
									);
									const roomCheckOutDate = new Date(
										room.checkOutDate.seconds * 1000
									);

									// Input user
									const userCheckInDate = new Date(checkIn); 
									const userCheckOutDate = new Date(checkOut);

									// Validasi konflik tanggal
									const isDateConflict =
										(userCheckInDate >= roomCheckInDate &&
											userCheckInDate <= roomCheckOutDate) ||
										(userCheckOutDate >= roomCheckInDate &&
											userCheckOutDate <= roomCheckOutDate) ||
										(userCheckInDate <= roomCheckInDate &&
											userCheckOutDate >= roomCheckOutDate);

									return !isDateConflict; // Tampilkan room yang tidak konflik
								})
								.map((room: Reservation, index: number) => {
									// Konversi Firestore Timestamp ke Date untuk ditampilkan
									const roomCheckIn = new Date(room.checkInDate.seconds * 1000);
									const roomCheckOut = new Date(
										room.checkOutDate.seconds * 1000
									);

									return (
										<li key={index}>
											<p>
												{room.room.roomNumber}: Available from{" "}
												{format(roomCheckIn, "yyyy-MM-dd")} to{" "}
												{format(roomCheckOut, "yyyy-MM-dd")}
											</p>
										</li>
									);
								})}
						</ul>
					) : (
						<p>No rooms available.</p>
					)
				) : null}
			</div>
		</>
	);
};

export default BookingForm;
