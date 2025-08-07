"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import "./styles/style.css";
import { Guest } from "@/fetching";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [user, setUser] = useState<Guest | null>(null);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const pathname = usePathname();

	const toggleMenu = () => setIsOpen(!isOpen);
	const toggleDropdown = () => setDropdownOpen((prev) => !prev);

	const isActive = (path: string) => pathname === path;

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
		window.location.href = "/login";
	};

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 w-full shadow">
			<div className="flex items-center justify-between py-4 px-6 shadow-lg bg-black/50">
				{/* Logo */}
				<Link href="/">
					<p className="text-xl font-bold text-white">Guest House Ryosuke</p>
				</Link>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden text-white focus:outline-none"
					onClick={toggleMenu}
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
							strokeWidth={2}
							d="M4 6h16M4 12h16m-7 6h7"
						/>
					</svg>
				</button>

				{/* Navigation Menu */}
				<ul
					className={`md:flex md:items-center md:justify-between absolute md:relative bg-black/40 md:bg-transparent transition-all duration-500 ease-in-out text-white text-xs md:text-sm lg:text-base w-full md:w-auto ${
						isOpen ? "top-[3.8rem] left-0 right-0 md:top-0" : "hidden md:flex"
					}`}
				>
					<li>
						<Link href="/">
							<p
								className={`py-2 px-4 hover:scale-x-105 ${
									isActive("/") ? "rounded-lg border border-2" : ""
								}`}
							>
								Home
							</p>
						</Link>
					</li>

					<li>
						<Link href="/rooms">
							<p
								className={`py-2 px-4 hover:scale-x-105 ${
									isActive("/rooms") ? "rounded-lg border border-2" : ""
								}`}
							>
								Rooms
							</p>
						</Link>
					</li>

					<li>
						<Link href="/my-reservations/reservations#personal-info">
							<p
								className={`py-2 px-4 hover:scale-x-105 ${
									isActive("/my-reservations")
										? "rounded-lg border border-2"
										: ""
								}`}
							>
								My Reservations
							</p>
						</Link>
					</li>

					{/* Mobile Buttons */}
					{user ? (
						<li className="md:hidden mt-2 px-4">
							<div className="flex items-center justify-between rounded-xl  py-3 shadow-md">
								<span className="font-semibold text-base italic ">{user.name}</span>
								<button
									onClick={handleLogout}
									className="text-sm px-3 py-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600 font-medium transition duration-150"
								>
									Logout
								</button>
							</div>
						</li>
					) : (
						<>
							<li className="md:hidden mt-2">
								<Link href="/sign-up">
									<button className="w-full border-2 border-white text-white font-bold rounded-full py-2 hover:bg-white hover:text-black">
										Sign Up
									</button>
								</Link>
							</li>

							<li className="md:hidden mt-2">
								<Link href="/login">
									<button className="w-full bg-white text-black font-bold rounded-full py-2 hover:bg-transparent hover:border-2 hover:text-white">
										Login
									</button>
								</Link>
							</li>
						</>
					)}
				</ul>

				{/* Desktop Right Section */}
				<div className="hidden md:flex gap-2 text-xs md:text-sm items-center relative">
					{user ? (
						<div className="relative">
							<button
								onClick={toggleDropdown}
								className="flex items-center gap-2 text-white font-semibold"
							>
								<span>{user.name}</span>
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>

							{dropdownOpen && (
								<div className="absolute right-0 mt-2 bg-white text-black rounded shadow w-40">
									<button
										onClick={handleLogout}
										className="w-full text-left px-4 py-2 hover:bg-gray-100"
									>
										Logout
									</button>
								</div>
							)}
						</div>
					) : (
						<>
							<Link href="/sign-up">
								<button className="font-bold border-2 text-white border-white rounded-full py-2 w-[150px] hover:bg-white hover:text-black">
									Sign Up
								</button>
							</Link>

							<Link href="/login">
								<button className="bg-white text-black font-bold rounded-full py-2 w-[150px] hover:border hover:bg-transparent hover:border-2 hover:text-white">
									Login
								</button>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
