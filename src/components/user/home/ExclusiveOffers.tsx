import React from "react";
import Image from "next/image";
import Link from "next/link";

const ExclusiveOffers = () => {
	return (
		<section
			className="w-11/12 xl:w-full mx-auto px-4 py-8 antialiased md:py-16 max-w-7xl"
			id="exclusive-offers"
		>
			<h1 className="ml-6 text-[2.5rem] font-semibold">Exclusive Offers</h1>

			{/* Penawaran 1 */}
			<div className="mx-auto grid max-w-screen-xl rounded-lg p-4 md:p-8 lg:grid-cols-12 lg:gap-8 lg:p-16 xl:gap-16">
				<div className="lg:col-span-5 lg:mt-0">
					<Image
						src="/images/exclusive.jpg"
						alt="room image"
						width={600}
						height={300}
						className="mb-4 h-full w-full sm:h-96 sm:w-96 md:h-full md:w-full rounded-lg object-cover"
					/>
				</div>
				<div className="mx-auto place-self-center lg:col-span-7">
					<h1 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl mt-3 lg:mt-0">
						Kids Stay Free – Under 5 Years Old!
					</h1>
					<p className="mb-6 text-gray-500 dark:text-gray-400">
						Traveling with little ones? We’ve got you covered! Children under 5
						years old stay{" "}
						<span className="font-semibold text-gray-800">absolutely free</span>
						. Enjoy your family vacation without extra costs for your youngest
						guests.
					</p>
					<Link
						href="/rooms"
						className="inline-flex items-center justify-center rounded-lg bg-[#1A56DB] px-5 py-3 text-center text-base font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 bg-primary-700"
					>
						Book Now
					</Link>
				</div>
			</div>

			{/* Penawaran 2 */}
			<div className="mx-auto grid max-w-screen-xl rounded-lg p-4 md:p-8 lg:grid-cols-12 lg:gap-8 lg:p-16 xl:gap-16">
				<div className="lg:col-span-5 lg:mt-0 lg:hidden">
					<Image
						src="/images/exclusive.jpg"
						alt="room image"
						width={600}
						height={300}
						className="mb-4 h-full w-full sm:h-96 sm:w-96 md:h-full md:w-full rounded-lg object-cover"
					/>
				</div>
				<div className="mx-auto place-self-center lg:place-self lg:col-span-7">
					<h1 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl lg:text-end mt-3 lg:mt-0">
						Half Price Stay – For Kids Aged 5 to 10
					</h1>
					<p className="mb-6 text-gray-500 dark:text-gray-400 lg:text-end">
						Make your family getaway more affordable! Children aged{" "}
						<span className="font-semibold text-gray-800">5 to 10 years</span>{" "}
						enjoy their stay at{" "}
						<span className="font-semibold text-gray-800">
							half the regular price
						</span>
						. More savings means more fun for everyone.
					</p>

					<div className="flex lg:justify-end items-center lg:w-full">
						<Link
							href="/rooms"
							className="rounded-lg bg-[#1A56DB] px-5 py-3 text-center text-base font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 bg-primary-700"
						>
							Book Now
						</Link>
					</div>
				</div>

				<div className="lg:col-span-5 lg:mt-0 lg:block hidden">
					<a href="#">
						<Image
							src="/images/exclusive.jpg"
							alt="room image"
							width={600}
							height={300}
							className="mb-4 h-full w-full sm:h-96 sm:w-96 md:h-full md:w-full rounded-lg object-cover"
						/>
					</a>
				</div>
			</div>
		</section>
	);
};

export default ExclusiveOffers;
