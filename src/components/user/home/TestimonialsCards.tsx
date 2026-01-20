"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

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
								<div>
									{/* Rating */}
									<div className="flex items-center mb-6 gap-2 text-amber-500">
										{[...Array(5)].map((_, idx) => (
											<svg
												key={idx}
												className="w-5 h-5"
												viewBox="0 0 18 17"
												fill="currentColor"
											>
												<path d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z" />
											</svg>
										))}
										<span className="text-sm font-semibold text-amber-700">
											5.0
										</span>
									</div>

									{/* Text */}
									<p
										className="text-base text-slate-600 leading-relaxed pb-8
										group-hover:text-slate-800 transition"
									>
										Staying at Ummu Guest House was an unforgettable experience.
										The rooms were cozy, the staff was friendly, and everything
										felt perfectly designed for comfort and relaxation.
									</p>
								</div>

								{/* User */}
								<div className="flex items-center gap-4 border-t border-amber-100 pt-5">
									<Image
										width={44}
										height={44}
										className="rounded-full h-11 w-11 object-cover ring-2 ring-amber-200"
										src="https://pagedone.io/asset/uploads/1696229969.png"
										alt="avatar"
									/>
									<div>
										<h5 className="text-slate-900 font-semibold mb-1">
											Jane D
										</h5>
										<span className="text-sm text-slate-500">
											Guest Traveler
										</span>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default TestimonialsCarousel;
