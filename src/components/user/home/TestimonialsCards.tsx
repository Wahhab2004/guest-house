"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import reviewers from "./feedbackData";

const TestimonialsCarousel = () => {
	return (
		<section className="relative py-24 mt-24">
			{/* Background */}
			<div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-white to-amber-100" />

			<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-11/12 xl:w-full">
				{/* Header */}
				<div className="text-center mb-14">
					<span
						className="inline-block mb-3 px-4 py-1 rounded-full
						bg-amber-100 text-amber-700 text-sm font-semibold tracking-wide"
					>
						TESTIMONIALS
					</span>
					<h2 className="text-4xl md:text-5xl font-bold text-slate-900">
						What Our Happy Guests Say
					</h2>
					<p className="mt-4 text-slate-600 max-w-xl mx-auto">
						Real experiences from guests who stayed and enjoyed their moments
						with Ummu Ryosuke Guest House.
					</p>
				</div>

				<Swiper
					slidesPerView={1}
					spaceBetween={32}
					loop={true}
					centeredSlides={true}
					pagination={{ clickable: true }}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
					}}
					breakpoints={{
						640: { slidesPerView: 1, spaceBetween: 24 },
						768: { slidesPerView: 2, spaceBetween: 32 },
						1024: { slidesPerView: 3, spaceBetween: 32 },
					}}
					modules={[Pagination, Autoplay]}
					className="mySwiper pb-10"
				>
					{[1, 2, 3, 4, 5, 6].map((_, i) => (
						<SwiperSlide key={i}>
							<div
								className="group bg-white/80 backdrop-blur-md
								border border-amber-100 rounded-2xl p-6
								transition-all duration-300
								hover:-translate-y-2 hover:shadow-xl hover:border-amber-300"
							>
								{reviewers.map((rev, index) => (
									<div key={index}>
										{/* User */}
										<div className="flex items-center gap-4 border-t border-amber-100 pt-5">
											<Image
												width={44}
												height={44}
												className="rounded-full h-11 w-11 object-cover ring-2 ring-amber-200"
												src={`${rev.avatar}`}
												alt="avatar"
											/>
											<div>
												<h5 className="text-slate-900 font-semibold mb-1">
													{rev.name}
												</h5>
												<span className="text-sm text-slate-500">
													Guest Traveler
												</span>
											</div>
										</div>

										{/* Text */}
										<p
											className="text-base text-slate-600 leading-relaxed pb-8
										group-hover:text-slate-800 transition"
										>
											{rev.review}
										</p>
									</div>
								))}
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default TestimonialsCarousel;
