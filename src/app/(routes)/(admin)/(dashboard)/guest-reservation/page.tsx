"use client";

import { useEffect, useState } from "react";
import { fetchReservations, Reservation } from "@/fetching";
import PaginationControl from "@/components/admin/guest-reservation/PaginationControl";
import SearchBar from "@/components/admin/SearchBar";
import GuestReservationTable from "@/components/admin/guest-reservation/GuestReservation";
import { Timestamp } from "firebase/firestore";

export default function GuestReservation() {
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	
	const [filteredReservations, setFilteredReservations] =
		useState(reservations);
	const itemsPerPage = 15;
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

	// Fungsi untuk mengubah status pemesanan
	const handleCheckStatusChange = async (id: string, newStatus: string) => {
		const now = Timestamp.fromDate(new Date());
		const checkStatus = newStatus === "checkin" ? "checked-in" : "checked-out";

		try {
			const res = await fetch(`/api/reservations?id=${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					checkStatus,
					confirmedCheckin: newStatus === "checkin" ? now : undefined,
					confirmedCheckout: newStatus === "checkout" ? now : undefined,
				}),
			});

			if (!res.ok) throw new Error("Failed to update reservation.");

			const updatedReservations = reservations.map((reservation) => {
				if (reservation.id === id) {
					return {
						...reservation,
						checkStatus,
						confirmedCheckin:
							newStatus === "checkin" ? now : reservation.confirmedCheckin,
						confirmedCheckout:
							newStatus === "checkout" ? now : reservation.confirmedCheckout,
					};
				}
				return reservation;
			});

			setReservations(updatedReservations);
		} catch (error) {
			console.error("Error updating reservation:", error);
		}
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

	// Mengubah status pembayaran
	const handleStatusChange = (id: string, newStatus: string) => {

		// Ini awal stts prevReserv: any
		setFilteredReservations((prevReservations: Reservation[]) =>
			prevReservations.map((reservation) =>
				reservation.id === id
					? { ...reservation, paymentStatus: newStatus }
					: reservation
			)
		);
	};

	return (
		<section>
			{/* Title */}
			<h1 className="text-[#5D6679] text-xl font-bold mt-6 ml-[230px] ">
				Guest Reservation
			</h1>

			<SearchBar
				data={reservations}
				searchField="guest.name"
				onSearchResult={(results) => setFilteredReservations(results)}
				placeholder="Search by guest name"
			/>
			
			<GuestReservationTable
				getPaginatedData={getPaginatedData}
				handleCheckStatusChange={handleCheckStatusChange}
				handleStatusChange={handleStatusChange}
			/>
			<PaginationControl
				totalPages={totalPages}
				currentPage={currentPage}
				handlePrevious={handlePrevious}
				handleNext={handleNext}
			/>
		</section>
	);
}
