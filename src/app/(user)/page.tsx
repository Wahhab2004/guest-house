import FacilitiesCarousel from "@/components/user/home/FacilitiesCarousel";
import ProductCard from "@/components/roomCard";
import TestimonialsCarousel from "@/components/user/home/TestimonialsCards";
import ExclusiveOffers from "@/components/user/home/ExclusiveOffers";
import PesanOwner from "@/components/user/home/PesanOwner";
import Maps from "@/components/user/home/Maps";
import HeroSection from "@/components/user/home/home";
import FeaturesSection from "@/components/user/home/FeaturesSection";

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
					<FeaturesSection />
					<PesanOwner />
					<Maps />
				</div>
			</div>
		</>
	);
}
