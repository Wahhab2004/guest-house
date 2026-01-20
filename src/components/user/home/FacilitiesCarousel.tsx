"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { Sparkles } from "lucide-react";

const FacilitiesCarousel: React.FC = () => {
	return (
		<section className="relative py-20 bg-gradient-to-br from-white via-amber-200 to-amber-400 overflow-hidden">
			{/* Decorative Glow */}
			<div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl" />
			<div className="absolute -bottom-32 -left-32 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl" />

			<div className="container max-w-7xl w-11/12 xl:w-full relative mx-auto px-4">
				{/* Header */}
				<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
					<div>
						<h1 className="text-[2.5rem] font-extrabold tracking-tight text-slate-900">
							Our Premium Facilities
						</h1>
						<p className="text-slate-600 lg:w-1/2 mt-2">
							At Ummu Ryosuke Guest House, we provide thoughtfully curated facilities
							designed to elevate your comfort and enhance every moment of your
							stay.
						</p>
					</div>

					<div
						className="flex items-center gap-2 px-5 py-2 rounded-full
						bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-lg"
					>
						<Sparkles size={16} />
						Guest Favorites
					</div>
				</div>

				{/* Carousel */}
				<Swiper
					spaceBetween={30}
					slidesPerView={1}
					breakpoints={{
						640: {
							slidesPerView: 1,
							spaceBetween: 20,
						},
						768: {
							slidesPerView: 2,
							spaceBetween: 30,
						},
						1024: {
							slidesPerView: 3,
							spaceBetween: 30,
						},
					}}
					navigation={{
						prevEl: ".custom-swiper-navigation .swiper-button-prev",
						nextEl: ".custom-swiper-navigation .swiper-button-next",
					}}
					pagination={{ clickable: true }}
					loop
					modules={[Navigation, Pagination]}
					className="multiple-slide-carousel"
				>
					{[1, 2, 3, 4, 5, 6].map((_, index) => (
						<SwiperSlide key={index}>
							<div
								className="group rounded-3xl bg-white/70 backdrop-blur-xl
								border border-white/60 shadow-lg hover:shadow-2xl
								transition-all duration-300 overflow-hidden"
							>
								<div className="relative w-full h-[26rem]">
									<Image
										src={`/images/facilities/facility-0${(index % 3) + 1}.png`}
										alt={`facility-${(index % 3) + 1}`}
										fill
										className="object-cover group-hover:scale-110 transition-transform duration-500"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
								</div>

								<div className="p-5">
									<h3 className="font-bold text-slate-800">
										Comfort Facility {index + 1}
									</h3>
									<p className="text-sm text-slate-600 mt-1 line-clamp-2">
										Designed to provide relaxation, convenience, and a memorable
										experience throughout your stay.
									</p>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				{/* Navigation */}
				<div className="custom-swiper-navigation flex justify-center gap-6 mt-10">
					<button
						className="swiper-button-prev !static !w-12 !h-12
						rounded-full bg-white shadow-md border border-slate-200
						hover:bg-amber-50 hover:border-amber-400 transition"
					/>
					<button
						className="swiper-button-next !static !w-12 !h-12
						rounded-full bg-white shadow-md border border-slate-200
						hover:bg-amber-50 hover:border-amber-400 transition"
					/>
				</div>
			</div>
		</section>
	);
};

export default FacilitiesCarousel;
