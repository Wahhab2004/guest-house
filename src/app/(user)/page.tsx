import FacilitiesCarousel from "@/components/user/home/facilities-carousel";

import ExclusiveOffers from "@/components/user/home/exclusive-offers";
import PesanOwner from "@/components/user/home/pesan-owner";
import Maps from "@/components/user/home/maps";
import HeroSection from "@/components/user/home/home";
import FeaturesSection from "@/components/user/home/features-section";
import ProductCardWithAvailability from "@/components/user/home/product-card-with-avaibility";
import TestimonialsCarousel from "@/components/user/home/testimonial-card";
import WhatsAppFloating from '@/components/whatsapp-floating/WhatsAppFloating';

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
					<WhatsAppFloating />
				</div>
			</div>
		</>
	);
}
