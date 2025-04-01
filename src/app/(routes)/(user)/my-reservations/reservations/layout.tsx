"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	return (
		<>
			<nav className="mt-32 w-11/12 mx-auto">
				<ul className="flex justify-evenly items-center text-sm flex-wrap lg:text-base">
					{/* Personal-info */}
					<Link href="/my-reservations/reservations/personal-info" className="">
						<div className="flex items-center">
							<div className="border border-blue-600 rounded-full p-0.5 ">
								<div
									className={`w-5 h-5 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-blue-600 font-semibold ${
										pathname === "/my-reservations/reservations/personal-info"
											? "bg-blue-600 text-white"
											: ""
									}`}
								>
									1
								</div>
							</div>
							<li className="ml-2 text-blue-600">Personal Info</li>

							<div className="w-10 h-[0.5px] bg-blue-600 ml-2 lg:w-24"></div>
						</div>
					</Link>

					{/* Booking-details */}
					<Link
						href="/my-reservations/reservations/booking-details"
						className=""
					>
						<div className="flex items-center">
							<div className="border border-blue-600 rounded-full p-0.5">
								<div
									className={`w-5 h-5 rounded-full lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-blue-600 font-semibold ${
										pathname === "/my-reservations/reservations/booking-details"
											? "bg-blue-600 text-white"
											: ""
									}`}
								>
									2
								</div>
							</div>

							<li className="ml-2 text-blue-600">Booking Details</li>
							<div className="w-10 h-[0.5px] bg-blue-600 ml-2 lg:w-24"></div>
						</div>
					</Link>

					{/* Payment */}
					<Link href="/my-reservations/reservations/payment" className="">
						<div className="flex items-center">
							<div className="border border-blue-600 rounded-full p-0.5">
								<div
									className={`w-5 h-5 rounded-full lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-blue-600 font-semibold ${
										pathname === "/my-reservations/reservations/payment"
											? "bg-blue-600 text-white"
											: ""
									}`}
								>
									3
								</div>
							</div>
							<li className="ml-2 text-blue-600">Payment and Confirmation</li>

							<div className="w-10 h-[0.5px] bg-blue-600 ml-2 lg:w-24"></div>
						</div>
					</Link>

					{/* Summary */}
					<Link
						href="/my-reservations/reservations/summary-booking"
						className="col-span-3"
					>
						<div className="flex items-center">
							<div className="border border-blue-600 rounded-full p-0.5">
								<div
									className={`w-5 h-5 rounded-full lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-blue-600 font-semibold ${
										pathname === "/my-reservations/reservations/summary-booking"
											? "bg-blue-600 text-white"
											: ""
									}`}
								>
									4
								</div>
							</div>
							<li className="ml-2 text-blue-600">Summary Booking</li>
						</div>
					</Link>
				</ul>
			</nav>

			{children}
		</>
	);
}
