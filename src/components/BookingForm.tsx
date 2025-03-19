"use client";

import React, { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";

const BookingForm = () => {
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [guests, setGuests] = useState(0);
	const [results, setResults] = useState(null);
	const [isSearching, setIsSearching] = useState(false);

	const handleSearch = async () => {
		// Validasi input
		if (!checkIn || !checkOut || guests <= 0) {
			alert("Please fill in all fields with valid data!");
			return;
		}

		setIsSearching(true);

		try {
			// Fetch data berdasarkan input pengguna
			const response = await fetch(
				`/api/reservation?checkInDate=${checkIn}&checkOutDate=${checkOut}&guestId=${guests}`
			);
			const data = await response.json();

			// Menampilkan hasil pencarian
			console.log(data);

			if (response.ok) {
				setResults(data);
			} else {
				console.error("Error fetching rooms:", data.message);
				setResults([]);
			}
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
								.filter((room: any) => {

									
									// Konversi Firestore Timestamp ke Date
									const roomCheckInDate = new Date(
										room.checkInDate.seconds * 1000
									);
									const roomCheckOutDate = new Date(
										room.checkOutDate.seconds * 1000
									);

									const userCheckInDate = new Date(checkIn); // Input user
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
								.map((room: any, index: number) => {
									// Konversi Firestore Timestamp ke Date untuk ditampilkan
									const roomCheckIn = new Date(room.checkInDate.seconds * 1000);
									const roomCheckOut = new Date(
										room.checkOutDate.seconds * 1000
									);

									return (
										<li key={index}>
											<p>
												{room.roomDetails.roomType}: Available from{" "}
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
