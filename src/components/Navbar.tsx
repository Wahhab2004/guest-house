"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { Guest } from "@/fetching";
import Image from "next/image";
import { ChevronDown, Menu, X, User } from "lucide-react";

const BRAND_GRADIENT = "bg-gradient-to-r from-amber-500 to-amber-600";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [user, setUser] = useState<Guest | null>(null);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const [hidden, setHidden] = useState(false);
	const lastScrollY = useRef(0);

	const pathname = usePathname();

	const toggleMenu = () => setIsOpen((p) => !p);
	const toggleDropdown = () => setDropdownOpen((p) => !p);

	const isActive = (path: string) => pathname === path;

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			// Always show when at top
			if (currentScrollY < 10) {
				setHidden(false);
				lastScrollY.current = currentScrollY;
				return;
			}

			// Scrolling down → hide
			if (currentScrollY > lastScrollY.current) {
				setHidden(true);
			} else {
				// Scrolling up → show
				setHidden(false);
			}

			lastScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const storedUser = Cookies.get("user");
		if (storedUser) setUser(JSON.parse(storedUser));
	}, []);

	// Close dropdown if click outside
	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	const handleLogout = () => {
		Cookies.remove("user");
		Cookies.remove("token");
		setUser(null);
		window.location.href = "/login";
	};

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300
	${hidden ? "-translate-y-full" : "translate-y-0"}`}
		>
			<div
				className="mx-auto flex items-center justify-between px-6 md:px-10 lg:px-20 py-3
				bg-white shadow-lg border-b border-amber-100"
			>
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2">
					<Image
						src="/images/ummu_logo_1.png"
						alt="Logo"
						width={120}
						height={50}
						className="object-contain"
					/>
				</Link>

				{/* Mobile Button */}
				<button
					className="md:hidden p-2 rounded-xl border border-amber-200
					text-amber-700 hover:bg-amber-50 transition"
					onClick={toggleMenu}
				>
					{isOpen ? <X size={20} /> : <Menu size={20} />}
				</button>

				{/* Menu */}
				<ul
					className={`md:flex md:items-center gap-2 absolute md:static top-full left-0 w-full md:w-auto
					bg-white md:bg-transparent
					border-b md:border-0 border-amber-100 md:shadow-none shadow-xl
					transition-all duration-300 ease-in-out
					${isOpen ? "block" : "hidden md:flex"}`}
				>
					<NavItem href="/" active={isActive("/")}>
						Home
					</NavItem>

					<NavItem href="#rooms" active={false}>
						Rooms
					</NavItem>

					{/* 🔒 Only show if logged in */}
					{user && (
						<NavItem
							href="/my-reservations"
							active={isActive("/my-reservations")}
						>
							My Reservations
						</NavItem>
					)}

					{/* Mobile Auth */}
					{!user && (
						<div className="md:hidden px-4 py-3 space-y-2">
							<Link href="/register">
								<button
									className="w-full rounded-xl border border-amber-400
									text-amber-600 font-bold py-2 hover:bg-amber-50 transition"
								>
									Sign Up
								</button>
							</Link>
							<Link href="/login">
								<button
									className={`w-full rounded-xl ${BRAND_GRADIENT}
									text-white font-bold py-2 hover:shadow-lg transition`}
								>
									Login
								</button>
							</Link>
						</div>
					)}

					{/* Mobile User */}
					{user && (
						<div className="md:hidden px-4 py-3 border-t border-amber-100">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2 text-amber-700">
									<User size={16} />
									<span className="font-semibold">{user.name}</span>
								</div>
								<button
									onClick={handleLogout}
									className="text-sm px-3 py-1 rounded-lg
									bg-red-100 text-red-600 hover:bg-red-200 transition"
								>
									Logout
								</button>
							</div>
						</div>
					)}
				</ul>

				{/* Desktop Right */}
				<div className="hidden md:flex items-center gap-3">
					{!user ? (
						<>
							<Link href="/register">
								<button
									className="px-5 py-2 rounded-xl border border-amber-400
									text-amber-600 font-bold hover:bg-amber-50 transition"
								>
									Sign Up
								</button>
							</Link>
							<Link href="/login">
								<button
									className={`px-5 py-2 rounded-xl ${BRAND_GRADIENT}
									text-white font-bold hover:shadow-lg transition`}
								>
									Login
								</button>
							</Link>
						</>
					) : (
						<div className="relative" ref={dropdownRef}>
							<button
								onClick={toggleDropdown}
								className="flex items-center gap-2 px-4 py-2
								rounded-xl bg-amber-50 hover:bg-amber-100 transition
								font-semibold text-amber-700 border border-amber-200"
							>
								<User size={16} />
								<span>{user.name}</span>
								<ChevronDown size={14} />
							</button>

							{dropdownOpen && (
								<div
									className="absolute right-0 mt-2 w-44
									bg-white rounded-xl shadow-lg border border-amber-200
									overflow-hidden"
								>
									<button
										onClick={handleLogout}
										className="w-full text-left px-4 py-2
										text-sm hover:bg-red-50 text-red-600 font-semibold"
									>
										Logout
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

/* ================= UI PARTS ================= */
function NavItem({
	href,
	active,
	children,
}: {
	href: string;
	active: boolean;
	children: React.ReactNode;
}) {
	return (
		<li>
			<Link href={href}>
				<span
					className={`block px-4 py-2 rounded-xl font-semibold transition
					${
						active
							? "bg-amber-100 text-amber-700 border border-amber-200 shadow-sm"
							: "text-slate-700 hover:bg-amber-50 hover:text-amber-700"
					}`}
				>
					{children}
				</span>
			</Link>
		</li>
	);
}
