"use client";


import NavbarReservation from "@/components/reservationNavbar";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<NavbarReservation />
			{children}
		</>
	);
}
