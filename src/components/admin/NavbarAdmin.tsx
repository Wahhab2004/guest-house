"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Guest } from "@/fetching";

export default function NavbarAdmin() {
	const pathname = usePathname();
	const [user, setUser] = useState<Guest | null>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	useEffect(() => {
		const storedUser = Cookies.get("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const handleLogout = () => {
		Cookies.remove("user");
		Cookies.remove("token");
		setUser(null);
		window.location.href = "/login-admin";
	};

	const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

	return (
		<div>
			{/* Topbar */}
			<div className="p-4 shadow flex justify-between items-center bg-white">
				<div className="flex items-center gap-4">
					{/* Hamburger for mobile */}
					<button
						onClick={toggleSidebar}
						className="md:hidden text-gray-600 focus:outline-none"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>

					<h1 className=" md:text-2xl font-bold text-gray-600">
						Guesthouse Ryosuke
					</h1>
				</div>

				<p className="text-gray-600 text-base md:text-lg">
					Selamat datang, {user?.name} 💫
				</p>
			</div>

			{/* Sidebar */}
			<div
				className={`fixed z-40 top-0 left-0 h-[44vh] md:h-screen w-screen md:w-[20%] md:float-left lg:w-[20%]  bg-white rounded-b-xl border-r shadow-md transform transition-transform duration-300 ease-in-out
				md:static md:translate-x-0 ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex justify-between items-center p-4">
					<h1 className="text-lg font-bold text-gray-600 md:hidden">Guesthouse Ryosuke</h1>

					{/* Close button on mobile */}
					<div className="md:hidden flex justify-end ">
						<button onClick={toggleSidebar} className="text-gray-500">
							✖
						</button>
					</div>
				</div>

				{/* Navigation */}
				<nav className="px-4 leading-2">
					<ul>
						{/* Gunakan <SidebarItem /> komponen untuk DRY (jika mau dioptimalkan) */}
						<SidebarItem
							href="/dasbor"
							label="Dashboard"
							iconPath="M2.25 11.9991L11.204 3.04409C11.644 2.60509 12.356 2.60509 12.795 3.04409L21.75 11.9991M4.5 9.74909V19.8741C4.5 20.4951 5.004 20.9991 5.625 20.9991H9.75V16.1241C9.75 15.5031 10.254 14.9991 10.875 14.9991H13.125C13.746 14.9991 14.25 15.5031 14.25 16.1241V20.9991H18.375C18.996 20.9991 19.5 20.4951 19.5 19.8741V9.74909M8.25 20.9991H16.5"
							active={pathname === "/dasbor"}
						/>

						<SidebarItem
							href="/guest-reservation"
							label="Reservasi"
							iconPath="M6.75 3a.75.75 0 01.75.75V4.5h9V3.75a.75.75 0 011.5 0V4.5h.75A2.25 2.25 0 0121 6.75v11.25A2.25 2.25 0 0118.75 20.25H5.25A2.25 2.25 0 013 18V6.75A2.25 2.25 0 015.25 4.5H6V3.75a.75.75 0 01.75-.75zM18.75 9H5.25v9h13.5V9z"

							active={pathname === "/guest-reservation"}
						/>

						<SidebarItem
							href="/guest-book"
							label="Buku Tamu"
							iconPath="M15.75 3a3.75 3.75 0 00-7.5 0v1.5h-1.5A2.25 2.25 0 004.5 6.75v12A2.25 2.25 0 006.75 21h10.5A2.25 2.25 0 0019.5 18.75v-12A2.25 2.25 0 0017.25 4.5h-1.5V3zm-6 0a2.25 2.25 0 114.5 0v1.5h-4.5V3z"
							active={pathname === "/guest-book"}
						/>

						<SidebarItem
							href="/guest-history"
							label="Riwayat Reservasi"
							iconPath="M12 6v6l3.75 2.25m5.25-3.75a9 9 0 11-18 0 9 9 0 0118 0z"
							active={pathname === "/guest-history"}
						/>

						<SidebarItem
							href="/room"
							label="Kamar"
							iconPath="M2.25 9A2.25 2.25 0 014.5 6.75h15a2.25 2.25 0 012.25 2.25v10.5a.75.75 0 01-1.5 0v-2.25H3.75v2.25a.75.75 0 01-1.5 0V9zM3.75 13.5h16.5v-3H3.75v3z"
							active={pathname === "/room"}
						/>
					</ul>

					{/* Logout Button */}
					<div className="mt-6">
						<button
							onClick={handleLogout}
							className="bg-red-500 text-lg font-semibold text-white rounded w-full py-2 hover:bg-red-600 transition duration-200"
						>
							Keluar
						</button>
					</div>
				</nav>
			</div>

			{/* Overlay for mobile */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
					onClick={toggleSidebar}
				></div>
			)}
		</div>
	);
}

// Sidebar item component
interface SidebarItemProps {
	href: string;
	label: string;
	iconPath: string;
	active?: boolean;
}

function SidebarItem({ href, label, iconPath, active }: SidebarItemProps) {
	return (
		<Link
			href={href}
			className={`flex items-center p-2 rounded mb-2 hover:bg-blue-100 group text-lg ${
				active ? "bg-blue-100" : ""
			}`}
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d={iconPath}
					stroke="#5D6679"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					className={`group-hover:stroke-[#1366D9] group-hover:stroke-2 ${
						active ? "stroke-[#1366D9] stroke-2" : ""
					}`}
				/>
			</svg>
			<span
				className={`ml-2 font-medium group-hover:text-[#1366D9] ${
					active ? "text-[#1366D9]" : "text-gray-600"
				}`}
			>
				{label}
			</span>
		</Link>
	);
}
