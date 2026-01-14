"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";

export default function LayoutClient({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const adminPage = [
		"/dasbor",
		"/checkin",
		"/checkout",
		"/guest-reservation",
		"/room/",
		"/guest-history",
		"/guest-book",
	];
	const loginPage = ["/login", "/register", "/reset-password"];

	// Hide Navbar on specific paths
	const hideNavbar = [
		...adminPage,
		...loginPage,
		"/my-reservations",
		"/rooms/",
	].some((path) => pathname.startsWith(path));

	const hideFooter = [
		...adminPage,
		...loginPage,
		"/my-reservations",
		"/rooms/",
	].some((path) => pathname.startsWith(path));

	return (
		<>
			{!hideNavbar && <Navbar />}
			{children}
			{!hideFooter && <Footer />}
		</>
	);
}
