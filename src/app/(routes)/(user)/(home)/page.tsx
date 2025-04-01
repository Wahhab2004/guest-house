import BookingForm from "@/components/BookingForm";
import FacilitiesCarousel from "@/components/home/FacilitiesCarousel";
import FeaturesSelection from "@/components/home/FeaturesSelection";
import ProductCard from "@/components/ProductCard";
import TestimonialsCarousel from "@/components/home/TestimonialsCards";
import React from "react";
import ExclusiveOffers from "@/components/home/ExclusiveOffers";
import PesanOwner from "@/components/home/PesanOwner";
import Maps from "@/components/home/Maps";

export default function Home() {
	return (
		<>
			<div>
				{/* Hero Section */}
				<section>
					<div
						style={{
							height: "100vh",
							backgroundImage: "url(/images/bg-homepage.png)",
							backgroundSize: "cover",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							textAlign: "center",
						}}
						className="w-full h-screen text-center m-auto text-white"
					>
						<div>
							<h1 className="text-[2.5rem]">
								Your perfect retreat for comfort, serenity, and
							</h1>
							<h1 className="text-[2.5rem]">unforgettable experiences.</h1>
						</div>
					</div>
				</section>

				{/* Booking Form */}
				<BookingForm />

				{/* Main Section */}
				<div className="w-11/12 mx-auto">
					{/* Rooms */}
					<ProductCard />
					<FacilitiesCarousel />
					<TestimonialsCarousel />
					<ExclusiveOffers />
					<FeaturesSelection />
					<PesanOwner />
					<Maps />
				</div>
			</div>
		</>
	);
}
