// "use client";

// import { useState, useEffect } from "react";
// import NavbarReservation from "@/components/my-reservation/reservation/navbarReservation";
// import SummaryBooking from "@/components/my-reservation/reservation/summaryBooking";
// import PaymentForm from "@/components/my-reservation/reservation/paymentForm";
// import { useSearchParams } from "next/navigation";
// import { fetchReservationById, Reservation } from "@/fetching";
// import OrderDetails from "@/components/my-reservation/reservation/orderDetails";

// export default function Reservations() {
// 	const [activeSection, setActiveSection] = useState("personal-info");
// 	const [reservation, setReservation] = useState<Reservation | null>(null);
// 	const searchParams = useSearchParams();
// 	const idReservation = searchParams.get("id");

// 	useEffect(() => {
// 		// Cek apakah URL punya hash saat pertama load
// 		if (typeof window !== "undefined") {
// 			const currentHash = window.location.hash.replace("#", "");
// 			if (currentHash) {
// 				setActiveSection(currentHash);
// 			}
// 		}
// 		const getReservationByID = async () => {
// 			if (!idReservation) return;
// 			const data = await fetchReservationById(String(idReservation));
// 			setReservation(data);
// 			console.log(data);
// 		};
// 		getReservationByID();
// 	}, );

// 	const handleNavigate = (section: string) => {
// 		setActiveSection(section);
// 		window.location.hash = section; // opsional, supaya bisa di-reload atau dikopi
// 	};

// 	const renderSection = () => {
// 		switch (activeSection) {
// 			case "order-details":
// 				return (
// 					<OrderDetails
// 						reservation={reservation}
// 						handleNavigate={handleNavigate}
// 					/>
// 				);
// 			case "summary-booking":
// 				return <SummaryBooking />;
// 			case "payment":
// 				return <PaymentForm handleNavigate={handleNavigate} reservation={reservation}/>;
// 			default:
// 				return (
// 					<OrderDetails
// 						reservation={reservation}
// 						handleNavigate={handleNavigate}
// 					/>
// 				);
// 		}
// 	};

// 	return (
// 		<div>
// 			<NavbarReservation
// 				handleNavigate={handleNavigate}
// 				renderSection={renderSection}
// 				activeSection={activeSection}
// 			/>
// 			test : {reservation?.id}
// 		</div>
// 	);
// }
