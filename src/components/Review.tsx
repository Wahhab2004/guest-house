"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const reviews = [
	{
		id: 1,
		name: "Wahhab Awaludin",
		rating: 5.0,
		comment:
			"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo corporis omnis consectetur dolor beatae! Cum!",
	},
	// Tambahkan lebih banyak review di sini
	{
		id: 2,
		name: "Jane Doe",
		rating: 4.5,
		comment: "Amet consectetur adipisicing elit. Nemo corporis omnis.",
	},
	{
		id: 3,
		name: "John Smith",
		rating: 5.0,
		comment: "Lorem ipsum dolor sit amet.",
	},
	{ id: 4, name: "Emily Stone", rating: 4.8, comment: "Beatae! Cum!" },
	{
		id: 5,
		name: "Michael Brown",
		rating: 5.0,
		comment: "Consectetur dolor beatae!",
	},
	{
		id: 6,
		name: "Sarah Johnson",
		rating: 4.9,
		comment: "Lorem ipsum dolor sit amet consectetur.",
	},
];

function Review() {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<Slider {...settings} className="">
			{reviews.map((review) => (
				<div
					key={review.id}
					className="group bg-white border border-solid border-gray-300 rounded-2xl py-6 px-3 transition-all duration-500 w-96 hover:border-indigo-600 mt-10 mx-2 "
				>
					<div className="flex items-center">
						<Image
							src="https://pagedone.io/asset/uploads/1695365794.png"
              width={40}
              height={40}
              className="rounded-full h-10 w-10 object-cover"
							alt={`${review.name} avatar`}
						/>
						<div className="ml-4">
							<div className="flex justify-between items-center">
								<div className="flex items-center gap-1 text-amber-500 transition-all duration-500">
									{[...Array(5)].map((_, index) => (
										<svg
											key={index}
											className={`w-5 h-5 ${
												index < Math.round(review.rating)
													? "fill-current"
													: "fill-gray-300"
											}`}
											viewBox="0 0 18 17"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
												fill="currentColor"
											/>
										</svg>
									))}
								</div>
								<p className="font-semibold">{review.rating.toFixed(1)}</p>
								<span className="text-sm leading-6 text-gray-500">
									| {review.name}
								</span>
							</div>
							<p className="mt-2">{review.comment}</p>
						</div>
					</div>
				</div>
			))}
		</Slider>
	);
}

export default Review;
