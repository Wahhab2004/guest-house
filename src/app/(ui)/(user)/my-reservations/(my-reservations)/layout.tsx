"use client";

import NavbarMyReservation from "@/components/NavbarMyReservation";
import { usePathname } from "next/navigation";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathName = usePathname();
	// const hidePath = pathName.startsWith("/my-reservations/will-come/");
	const hidePath = [
		"/my-reservations/will-come/detail",
		"/my-reservations/finished/detail",
		"/my-reservations/cancelled/detail",
	].some((path) => pathName.startsWith(path));

	return (
		<>
			<div className="w-11/12 mx-auto mt-28">
				<h1 className="text-xl text-blue-900 font-bold text-center">
					See Detail My Reservations
				</h1>

				<p className="text-center text-gray-400">
					Here are the details of your reservation
				</p>

				{!hidePath && <NavbarMyReservation />}
			</div>

			{children}
		</>
	);
}
