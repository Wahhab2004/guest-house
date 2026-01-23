import FacilitiesCarousel from "@/components/user/home/FacilitiesCarousel";

import ExclusiveOffers from "@/components/user/home/ExclusiveOffers";
import PesanOwner from "@/components/user/home/PesanOwner";
import Maps from "@/components/user/home/Maps";
import HeroSection from "@/components/user/home/home";
import FeaturesSection from "@/components/user/home/FeaturesSection";
import ProductCardWithAvailability from "@/components/user/home/productCardWithAvaibility";
import TestimonialsCarousel from "@/components/user/home/TestimonialsCards";

export default function Home() {
	return (
		<>
			<div>
				<HeroSection />
				{/* Booking Form */}
				{/* <BookingForm /> */}

				
				{/* Main Section */}
				<div className="mt-4">
					{/* <RoomAvailabilityClient /> */}

					{/* Rooms */}
					<div id="rooms">
						<ProductCardWithAvailability />
					</div>
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
