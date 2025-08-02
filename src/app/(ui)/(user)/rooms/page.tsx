import React from "react";
import ProductCard from "@/components/ProductCard";

async function Rooms() {
	return (
		<section>
			{/* Hero Section */}
			<div
				className="w-full h-[70vh] bg-cover bg-center bg-no-repeat flex justify-center items-center text-white text-center"
				style={{ backgroundImage: "url(/images/bg-rooms.png)" }}
			>
				<h1 className="text-[2.5rem] font-semibold">Our Rooms</h1>
			</div>

			<ContentSection />
		</section>
	);
}

export default Rooms;

export function ContentSection() {
	// Content Section
	return (
		<div className="flex flex-col max-w-7xl mx-auto mb-20 mt-2 px-4 sm:mt-6 md:mt-8 lg:mt-10">
			<div className="w-[90%] mx-auto md:w-full">
				<h1 className="text-3xl font-semibold mb-2 ">Our Rooms Available</h1>
				<p className="text-gray-400 mb-8 ">
					Make yourself at home at GuestHouse Ummu – where every stay feels
					special.
				</p>
			</div>

			<ProductCard />
		</div>
	);
}
