"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function SummaryBooking() {
	const [showWAOptions, setShowWAOptions] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const indonesiaAdmins = [
		{ name: "Admin 1", number: "+6281322977332" },
		{ name: "Admin 2", number: "+6282119280050" },
	];

	const japanAdmins = [
		{ name: "Admin 1", number: "+818032423077" },
		{ name: "Admin 2", number: "+817091144166" },
		{ name: "Admin 3", number: "+817090442386" },
	];

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setShowWAOptions(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<section className="h-full my-10 mb-40" id="summary-booking">
			<main className="w-11/12 mx-auto text-center">
				<h1 className="text-xl lg:text-3xl font-bold mt-10 text-blue-900">
					Payment Verification in Progress
				</h1>
				<Image
					src="/svg/timer.svg"
					height={64}
					width={64}
					alt="timer"
					className="mx-auto mt-10"
				/>

				<p className="mt-10 text-gray-400 w-11/12 lg:w-1/2 mx-auto">
					Thank you for your payment. Your payment is being verified by our
					admin team and may take up to 1x24 hours.
				</p>

				<p className="mt-5 text-gray-400 w-11/12 lg:w-1/2 mx-auto">
					You can check your reservation details on the My Reservation page once
					the verification is complete.
				</p>

				{/* WhatsApp Button */}
				<div className="mt-10 relative inline-block" ref={dropdownRef}>
					<button
						onClick={() => setShowWAOptions(!showWAOptions)}
						className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-green-700"
					>
						Chat via WhatsApp
					</button>

					{showWAOptions && (
						<div className="absolute left-[12rem] transform -translate-y-[24rem] mt-3 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
							<div className="px-4 py-2 bg-green-50 text-green-800 font-semibold text-center">
								Indonesia Admin
							</div>
							{indonesiaAdmins.map((admin) => (
								<a
									key={admin.number}
									href={`https://wa.me/${admin.number.replace(/\D/g, "")}`}
									target="_blank"
									rel="noreferrer"
									className="block px-4 py-3 hover:bg-green-100 transition"
								>
									{admin.name} ({admin.number})
								</a>
							))}

							<div className="px-4 py-2 bg-blue-50 text-blue-800 font-semibold text-center mt-2">
								Japan Admin
							</div>
							{japanAdmins.map((admin) => (
								<a
									key={admin.number}
									href={`https://wa.me/${admin.number.replace(/\D/g, "")}`}
									target="_blank"
									rel="noreferrer"
									className="block px-4 py-3 hover:bg-blue-100 transition"
								>
									{admin.name} ({admin.number})
								</a>
							))}
						</div>
					)}
				</div>
			</main>
		</section>
	);
}
