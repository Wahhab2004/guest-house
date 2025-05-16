"use client";

import React, { useState } from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import './styles/style.css';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => setIsOpen(!isOpen);


    const pathname = usePathname();


	return (
		<nav className="fixed top-0 left-0 right-0 z-50 w-full bg-gray-100 shadow">
			<div className="flex items-center justify-between p-4 mx-10 lg:mx-2 ">
				{/* Logo */}
				<Link href="/">
					<p className="text-2xl font-bold hover:text-gray-200 cursor-pointer">
						Guest House Ryosuke
					</p>
				</Link>

				{/* Mobile menu button */}
				<button
					className="md:hidden text-white focus:outline-none "
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
				{/* Navigation Links */}
				<ul
					className={`md:flex md:items-center md:justify-between p-6 md:p-0 absolute md:relative w-full md:w-auto bg-gray-900 md:bg-transparent transition-all duration-500 ease-in-out ${
						isOpen ? "top-16 left-0 right-0" : "hidden md:flex"
					}`}
				>
					<li className="md:mr-5">
						<Link href="/">
							<p className={`py-2 px-4 cursor-pointer  hover:underline ${pathname === "/" ? "underline" : ""}`}>
								Home
							</p>
						</Link>
					</li>
					<li className="md:mr-5 ">
						<Link href="/rooms " className="">
							<p className={`py-2 px-4 cursor-pointer  hover:underline ${pathname === "/rooms" ? "underline" : ""}`}>
								Rooms
							</p>
						</Link>
					</li>
					<li className="md:mr-5">
						<Link href="/my-reservations/reservations#personal-info">
							<p className={`py-2 px-4 cursor-pointer  hover:underline ${pathname === "/my-reservations" ? "underline" : ""}`}>
								My Reservations
							</p>
						</Link>
					</li>
					<li className="md:mr-5 ml-4 mt-4 md:mt-0">
						<Link href="/sign-up">
							<button className="block md:inline-block font-semibold border-2 border-black rounded-full py-2 px-6 hover:bg-white hover:text-black cursor-pointer w-[35%] lg:w-full">
								Sign up
							</button>
						</Link>
					</li>
					<li className="md:mr-5 ml-4 mt-4 md:mt-0">
						<Link href="/login">
							<button className="block md:inline-block bg-black text-white text-black font-semibold rounded-full py-2 px-7 hover:bg-gray-400 hover:text-white cursor-pointer w-[35%] lg:w-full">
								Login
							</button>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
