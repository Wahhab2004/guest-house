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
	const adminPage = ["/dasbor", "/checkin","/checkout", "/guest-reservation", "/room", "/guest-history", "/guest-book"];

	// Hide Navbar on specific paths
	const hideNavbar =
		pathname.startsWith("/rooms/") ||
		pathname.startsWith("/my-reservations/") ||
		pathname.includes("/my-reservations") ||
		adminPage.some((path) => pathname.startsWith(path));


    const hideFooter = adminPage.some((path) => pathname.startsWith(path));

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
