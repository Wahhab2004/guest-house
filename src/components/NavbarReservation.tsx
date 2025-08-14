"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./styles/style.css";

const NavbarReservation = () => {
  const pathname = usePathname() || "";

  const isReservations = pathname.startsWith("/my-reservations/reservations");
  const isMyAccount = pathname === "/my-reservations/my-account";
  const isHome = pathname === "/";

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full text-white border-b-2 bg-white">
      <div className="flex items-center justify-between p-3">
        {/* Logo */}
        <Link href="#" className="w-1/4">
          <p className="font-bold hover:text-gray-700 cursor-pointer text-black text-sm lg:text-xl">
            GuestHouse Ryosuke
          </p>
        </Link>

        <ul className="flex items-center md:mr-5 mr-0 text-gray-400 text-xs lg:text-sm">
          <li className="md:mr-5">
            <Link href="/my-reservations/reservations">
              <p
                className={`mr-2 cursor-pointer hover:text-gray-600 hover:font-semibold ${
                  isReservations ? "text-gray-600 font-semibold" : "text-gray-400"
                }`}
              >
                Reservations
              </p>
            </Link>
          </li>

          <li className="md:mr-5">
            {/* Hapus spasi di akhir path */}
            <Link href="/my-reservations">
              <p
                className={`mr-2 cursor-pointer hover:text-gray-600 hover:font-semibold ${
                  pathname === "/my-reservations" ? "text-gray-600 font-semibold" : "text-gray-400"
                }`}
              >
                My Reservation
              </p>
            </Link>
          </li>

          <li className="md:mr-5">
            <Link href="/my-reservations/my-account">
              <p
                className={`mr-2 cursor-pointer hover:text-gray-600 hover:font-semibold ${
                  isMyAccount ? "text-gray-600 font-semibold" : "text-gray-400"
                }`}
              >
                My Account
              </p>
            </Link>
          </li>

          <li className="md:mr-5">
            <Link href="/">
              <p
                className={`cursor-pointer hover:text-gray-600 hover:font-semibold ${
                  isHome ? "text-gray-600 font-semibold" : "text-gray-400"
                }`}
              >
                Home
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarReservation;
