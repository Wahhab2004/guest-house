"use client";
import Image from "next/image";
import { useState, useEffect } from "react";


export default function MyReservations() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);


	useEffect(() => {
		// Check login status, e.g., from localStorage or session
		const paymentStatus = localStorage.getItem("isLoggedIn");
		if (paymentStatus === "true") {
			setIsLoggedIn(true);
		}
	}, []);

	return (
		<section>

			<div className="h-screen flex justify-center mt-28">
				{!isLoggedIn ? (
					<div className="text-center w-11/12 mx-auto">
						<p className="text-xl mb-4 text-blue-900 font-bold">
							Payment Pending Verification
						</p>

						<Image
							src="/svg/pending.svg"
							height={64}
							width={64}
							alt="timer"
							className="mx-auto mt-10"
						/>

						<p className="mt-10 text-gray-400 w-11/12 lg:w-1/2 mx-auto">
							Your payment for this reservation is still under verification.
							Please allow up to 1x24 hours for the process to complete. Once
							verified, your reservation details will appear here.
						</p>

						
							<button
								onClick={() => setIsLoggedIn(true)}
								className="block hover:bg-green-600  cursor-pointer text-white font-semibold text-center bg-[#77D57D] flex mt-10 w-fit px-4 mx-auto justify-center items-center rounded-lg py-2"
							>
								Refresh
								<Image
								src="/svg/refresh.svg"
								height={36}
								width={36}
								alt="timer"
								className=""
							/>
							</button>

							
						
					</div>
				) : (
					<div className="w-11/12 mx-auto">
						<h1 className="text-xl text-blue-900 font-bold text-center">
							See Detail My Reservations
						</h1>

						<p className="text-center text-gray-400">
							Here are the details of your reservation
						</p>

					</div>
				)}
			</div>
		</section>
	);
}
