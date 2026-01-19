"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NavbarReservation from "@/components/my-reservation/reservation/navbarReservation";
import OrderDetails from "./order-details/orderDetails";
import PaymentForm from "./payment/paymentForm";
import SummaryBooking from "./summary-booking/summaryBooking";
import { fetchReservationById, Reservation } from "@/fetching";

export default function ReservationPage() {
	const pathName = usePathname();
	const [activeSection, setActiveSection] = useState("");
	const [reservation, setReservation] = useState<Reservation | null>(null);
	const searchParams = useSearchParams();
	const JPYeservation = searchParams.get("id");
	const [canAccess, setCanAccess] = useState({
		orderDetails: true, // selalu bisa akses
		payment: false, // hanya bisa setelah orderDetails lengkap
		summary: false, // hanya bisa setelah payment confirmed
	});

	// 1️⃣ Fetch reservation berdasarkan query id
	useEffect(() => {
		if (!JPYeservation) return;

		const getReservationByID = async () => {
			const data = await fetchReservationById(String(JPYeservation));
			setReservation(data);
		};

		getReservationByID();
	}, [JPYeservation]);

	// 2️⃣ Set active section berdasarkan status
	useEffect(() => {
		if (!reservation) return;

		const paymentCompleted = reservation.payment?.status === "CONFIRMED";
		const orderFilled =
			!!reservation.room && !!reservation.checkIn && !!reservation.checkOut;

		setCanAccess({
			orderDetails: true,
			payment: orderFilled,
			summary: paymentCompleted,
		});

		// Tentukan activeSection awal
		if (reservation.status === "CONFIRMED") {
			setActiveSection(orderFilled ? "payment" : "order-details");
		} else {
			setActiveSection("order-details");
		}
	}, [reservation]);

	useEffect(() => {
		if (pathName === "/my-reservations/reservations") {
			setActiveSection("order-details");
		}
	}, [pathName]);

	const handleNavigate = (section: string) => {
		setActiveSection(section);
	};

	const renderSection = () => {
		switch (activeSection) {
			case "order-details":
				return (
					<OrderDetails
						handleNavigate={handleNavigate}
						reservation={reservation}
					/>
				);
			case "payment":
				return (
					<PaymentForm
						reservation={reservation}
						handleNavigate={handleNavigate}
					/>
				);
			case "summary-booking":
				return <SummaryBooking />;
			default:
				return null;
		}
	};

	return (
		<NavbarReservation
			handleNavigate={handleNavigate}
			renderSection={renderSection}
			activeSection={activeSection}
			canAccess={canAccess}
		/>
	);
}
