"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { logout } from "@/store/slices/authSlice";
import toast from "react-hot-toast";
import {
	LayoutDashboard,
	CalendarCheck,
	BookOpen,
	Hotel,
	Menu,
	X,
	Home,
} from "lucide-react";

import Image from "next/image";

const menus = [
	{ label: "Dashboard", href: "/dasbor", icon: LayoutDashboard },
	{ label: "Reservasi", href: "/guest-reservation", icon: CalendarCheck },
	{ label: "Buku Tamu", href: "/buku-tamu", icon: BookOpen },
	// { label: "Riwayat", href: "/guest-history", icon: History },
	{ label: "Kamar", href: "/room", icon: Hotel },
];

export default function NavbarAdmin() {
	const pathname = usePathname();
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector((state: RootState) => state.auth);
	const [isOpen, setIsOpen] = useState(false);

	const handleLogout = () => {
		dispatch(logout());
		toast.success("Logout berhasil!");
		setTimeout(() => {
			router.push("/login-admin");
		}, 500);
	};

	return (
		<nav className="fixed top-0 left-0 right-0 z-[5] h-20 bg-white/80 backdrop-blur-md border-b border-stone-200">
			<div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
				{/* LOGO */}
				<div className="flex items-center gap-3">
					<Image
						src="/images/ummu_logo_1.png"
						alt="Umy Logo"
						width={100}
						height={100}
						className="shadow-lg shadow-amber-100"
					/>

					<div className="hidden sm:block">
						<h1 className="font-bold text-stone-800 text-xl leading-none">
							Ummu Ryosuke
						</h1>
						<p className="font-bold leading-none text-[10px] text-[#FFB22C] font-bold  tracking-widest mt-1 uppercase">
							Admin Panel
						</p>
					</div>
				</div>

				{/* MENU DESKTOP */}
				<div className="hidden lg:flex items-center gap-2 bg-stone-50 p-1.5 rounded-2xl border border-stone-100">
					{menus.map((menu) => {
						const Icon = menu.icon;
						const isActive = pathname.startsWith(menu.href);

						return (
							<Link
								key={menu.href}
								href={menu.href}
								className={clsx(
									"flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 font-semibold text-sm",
									isActive
										? "bg-white text-[#FFB22C] shadow-sm border border-stone-100"
										: "text-stone-500 hover:text-stone-800",
								)}
							>
								<Icon size={18} />
								{menu.label}
							</Link>
						);
					})}
				</div>

				{/* USER + LOGOUT + MOBILE TOGGLE */}
				<div className="flex items-center gap-4">
					<div className="hidden lg:flex items-center gap-3">
						<span className="text-sm font-medium text-stone-600">
							Hai, {user?.name}
						</span>
						<button
							onClick={handleLogout}
							className="px-4 py-2 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition"
						>
							Keluar
						</button>
					</div>

					<button
						onClick={() => setIsOpen(!isOpen)}
						className="lg:hidden p-2.5 bg-stone-50 text-stone-600 rounded-xl border border-stone-100"
					>
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>

			{/* MENU MOBILE */}
			{isOpen && (
				<div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-stone-200 p-6 flex flex-col gap-3 shadow-2xl animate-in slide-in-from-top duration-300">
					{menus.map((menu) => {
						const Icon = menu.icon;
						const isActive = pathname.startsWith(menu.href);

						return (
							<Link
								key={menu.href}
								href={menu.href}
								onClick={() => setIsOpen(false)}
								className={clsx(
									"flex items-center gap-4 px-5 py-4 rounded-2xl font-bold",
									isActive
										? "bg-amber-50 text-amber-700"
										: "text-stone-600 bg-stone-50",
								)}
							>
								<Icon size={20} />
								{menu.label}
							</Link>
						);
					})}

					<button
						onClick={handleLogout}
						className="mt-3 w-full py-3 rounded-2xl bg-red-50 text-red-600 font-bold"
					>
						Keluar
					</button>
				</div>
			)}
		</nav>
	);
}
