import FacilitiesCarousel from "@/components/home/FacilitiesCarousel";
import FeaturesSelection from "@/components/home/FeaturesSelection";
import ProductCard from "@/components/ProductCard";
import TestimonialsCarousel from "@/components/home/TestimonialsCards";
import React from "react";
import ExclusiveOffers from "@/components/home/ExclusiveOffers";
import PesanOwner from "@/components/home/PesanOwner";
import Maps from "@/components/home/Maps";
import HeroSection from "@/components/home/home";

export default function Home() {
	return (
		<>
			<div>
				<HeroSection />
				{/* Booking Form */}
				{/* <BookingForm /> */}

				{/* Main Section */}
				<div className="mt-4">
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
