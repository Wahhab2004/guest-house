import BookingForm from "@/components/BookingForm";
import MultipleSlideCarousel from "@/components/Carousel";
import Carousel from "@/components/Carousel";
import PromoSection from "@/components/ExclusiveOffers";
import FeaturesSelection from "@/components/FeaturesSelection";
import ProductCard from "@/components/ProductCard";
import TestimonialsCarousel from "@/components/TestimonialsCards";
import Image from "next/image";
import React from "react";

export default function Home() {
	return (
		<>
			<main>
				{/* Hero Section */}
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

				<div className="w-11/12 mx-auto">
					{/* Reservation */}
					{/* Clearfix */}
					<BookingForm />

					{/* Rooms */}
					{/* Clear, tinggal logic nya saja. Bisa buat perulangan (opsional) */}
					<div>
						<h1 className="ml-6 text-[2.5rem] font-semibold ml-12">
							Our Rooms
						</h1>
						<p className="ml-6 text-gray-500 ml-12">
							Make yourself at home at GuestHouse Ummu – where every stay feels
							special.
						</p>

						<ProductCard params={{
							slug: []
						}} />
					</div>

					{/* Facilities */}
					{/* Clear, tinggal logic nya saja. Bisa buat perulangan (opsional) */}
					<div className="mt-28 h-screen">
						<h1 className="ml-6 text-[2.5rem] font-semibold">
							We do our best facilities provide you
						</h1>
						<p className="ml-6 text-gray-500 lg:w-1/2">
							At Ummu Guest House, we are committed to ensuring your stay is as
							comfortable and enjoyable as possible.
						</p>

						<MultipleSlideCarousel />
					</div>

					{/* Reviews */}
					{/* Clear */}
					<div className="mt-20 h-screen">
						<TestimonialsCarousel />
					</div>

					{/* Exclusive Offers */}
					{/* Clear, tinggal logic nya saja. Bisa buat perulangan (opsional) */}
					<div>
						<h1 className="ml-6 text-[2.5rem] font-semibold">
							Exclusive Offers
						</h1>
					
						<PromoSection />
					</div>

					{/* Why Choose Ummur Geust House */}
					{/* Clear */}
					<div className="">
						<h1 className="ml-6 text-[2.5rem] font-semibold ml-12">
							Why Choose Ummu Guest House?
						</h1>
						<p className="ml-6 text-gray-500 ml-12 lg:w-1/2">
							"Stay with us and experience hospitality like never before!"
						</p>

						<FeaturesSelection />
					</div>

					{/* Persuasif dari Owner */}
					{/* Clear */}
					<div className="mt-20 sm:bg-white sm:mt-[]">
						<figure className="max-w-screen-md mx-auto text-center">
							<svg
								className="w-10 h-10 mx-auto mb-3 text-gray-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 18 14"
							>
								<path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
							</svg>
							<blockquote>
								<p className="text-2xl italic font-medium text-gray-900">
									"Flowbite is just awesome. It contains tons of predesigned
									components and pages starting from login screen to complex
									dashboard. Perfect choice for your next SaaS application."
								</p>
							</blockquote>
							<figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
								<img
									className="w-6 h-6 rounded-full"
									src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
									alt="profile picture"
								/>
								<div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
									<cite className="pe-3 font-medium text-gray-900">
										Michael Gough
									</cite>
									<cite className="ps-3 text-sm text-gray-500">
										CEO at Google
									</cite>
								</div>
							</figcaption>
						</figure>
					</div>

					{/* Maps */}
					<div className="mt-20">
						<section className="">
							<div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
								<div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
									<h2 className="text-3xl font-extrabold text-gray-900">
										Visit Our Location
									</h2>
									<p className="mt-4 text-lg text-gray-500">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
									</p>
								</div>
								<div className="mt-16 lg:mt-20">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
										<div className="rounded-lg overflow-hidden">
											<iframe
												src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11672.945750644447!2d-122.42107853750231!3d37.7730507907087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2fbd55%3A0xa71491d736f62d5c!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1619524992238!5m2!1sen!2sus"
												width="100%"
												height="480"
												style={{ border: 0 }}
												// allowFullScreen=""
												loading="lazy"
											></iframe>
										</div>
										<div>
											<div className="max-w-full mx-auto rounded-lg overflow-hidden">
												<div className="px-6 py-4">
													<h3 className="text-lg font-medium text-gray-900">
														Our Address
													</h3>
													<p className="mt-1 text-gray-600">
														123 Main St, San Francisco, CA 94105
													</p>
												</div>
												<div className="border-t border-gray-200 px-6 py-4">
													<h3 className="text-lg font-medium text-gray-900">
														Hours
													</h3>
													<p className="mt-1 text-gray-600">
														Monday - Friday: 9am - 5pm
													</p>
													<p className="mt-1 text-gray-600">
														Saturday: 10am - 4pm
													</p>
													<p className="mt-1 text-gray-600">Sunday: Closed</p>
												</div>
												<div className="border-t border-gray-200 px-6 py-4">
													<h3 className="text-lg font-medium text-gray-900">
														Contact
													</h3>
													<p className="mt-1 text-gray-600">
														Email: info@example.com
													</p>
													<p className="mt-1 text-gray-600">
														Phone: +1 23494 34993
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</main>
		</>
	);
}
