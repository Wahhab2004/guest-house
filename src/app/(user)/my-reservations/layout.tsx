"use client";


import NavbarReservation from "@/components/reservation-navbar";

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
