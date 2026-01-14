"use client";


import NavbarReservation from "@/components/NavbarReservation";

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
