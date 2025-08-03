"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function RootLayout({
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
	const hideNavbar = [...adminPage, ...loginPage, "/my-reservations", "/rooms/"].some(
		(path) => pathname.startsWith(path)
	);

	const hideFooter =
		adminPage.some((path) => pathname.startsWith(path)) ||
		pathname.includes("/login");

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{!hideNavbar && <Navbar />}

				{children}
				{!hideFooter && <Footer />}
			</body>
		</html>
	);
}
