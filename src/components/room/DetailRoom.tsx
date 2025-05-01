import { Room } from "@/fetching";
import Image from "next/image";
import Link from "next/link";
import Calendar from "../Calendar";
import FeedbackForm from "../FeedbackForm";
import { useState } from "react";

interface BookingFormProps {
	room: Room | null;
}

const imageList = [];

export default function DetailRoom({ room }: BookingFormProps) {
	const fallbackImage = "/fallback-image.png";

	// Daftar gambar tambahan (ubah sesuai folder /public)
	const additionalImages = [
		"/images/facilities/facility-01.png",
		"/images/facilities/facility-02.png",
		"/images/facilities/facility-03.png",
		"/images/facilities/facility-01.png",
		"/images/facilities/facility-02.png",
		"/images/facilities/facility-03.png",
	];

	// Buat daftar image dengan room.image di awal (tanpa duplikat)
	const fullImageList = [
		room?.image || fallbackImage,
		...additionalImages.filter((img) => img !== room?.image),
	];

	const [mainImage, setMainImage] = useState<string>(fullImageList[0]);

	return (
		<div className="font-bold text-xl shadow w-[68%]">
			<Image
				className="rounded-xl lg:h-[600px] object-cover w-full"
				src={mainImage}
				alt={room?.roomNumber || "Product image"}
				width={1000}
				height={270}
			/>

			{/* Carousel Thumbnail */}
			<div className="overflow-x-auto whitespace-nowrap py-4 px-2 rounded-lg mt-4">
				<div className="flex gap-4">
					{fullImageList.map((src, index) => (
						<div
							key={index}
							onClick={() => setMainImage(src)}
							className={`cursor-pointer flex-shrink-0 rounded-xl overflow-hidden border-2 ${
								mainImage === src ? "border-blue-500" : "border-transparent"
							}`}
						>
							<Image
								src={src}
								alt={`Room ${index + 1}`}
								width={150}
								height={100}
								className="rounded-xl object-cover"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export function Katalog() {
	return (
		<div className="mt-10">
			<p className="text-gray-600">
				Download our room catalogue{" "}
				<span className="italic text-blue-600 underline">here</span>
			</p>
		</div>
	);
}

export function Availibilty() {
	return (
		<div className="float-right ml-auto w-[30%]">
			<div className="bg-white p-2 border border-solid border-gray-300 rounded-xl w-[90%] mx-auto">
				<h2 className="font-semibold text-lg text-center">
					Check Availability
				</h2>
			</div>
			
			<Calendar />
		</div>
	);
}

export function Description() {
	return (
		<div className="mt-10">
			<h2 className="font-semibold text-lg">Description</h2>

			<p className="w-11/12 mx-auto mt-4 ">
				Enjoy the perfect summer escape in our guest house, equipped with all
				the essentials to make your stay comfortable and convenient. Cook your
				favorite summer dishes in the fully equipped kitchen, keep your clothes
				fresh with the washing machine, and store chilled drinks in the shared
				refrigerator. Relax in the bathtub, freshen up with the provided towels,
				toothbrush, and shampoo, or take advantage of the microwave, iron, and
				hairdryer to keep your summer vibes on point. Whether you’re cooling off
				after a sunny day or preparing for your next adventure, our thoughtfully
				curated amenities ensure a carefree and refreshing summer experience.
			</p>
		</div>
	);
}

export function Facilities() {
	return (
		<div className="mt-10 w-[68%]">
			<h2 className="font-semibold text-lg">Facilities</h2>

			<div className="grid grid-cols-4 gap-4 mt-4">
				<Image
					src="/svg/kitchen.svg"
					alt="kitchen"
					width={100}
					height={100}
					className="w-70 h-70"
				/>

				<Image
					src="/svg/bathroom.svg"
					alt="kitchen"
					width={100}
					height={100}
					className="w-70 h-70"
				/>
				<Image
					src="/svg/heaters.svg"
					alt="kitchen"
					width={100}
					height={100}
					className="w-70 h-70"
				/>
				<Image
					src="/svg/laundry.svg"
					alt="kitchen"
					width={100}
					height={100}
					className="w-70 h-70"
				/>
				<Image
					src="/svg/refrigerator.svg"
					alt="kitchen"
					width={100}
					height={100}
					className="w-70 h-70"
				/>
				<Image
					src="/svg/bathub.svg"
					alt="kitchen"
					width={100}
					height={100}
					className="w-70 h-70"
				/>
			</div>

			{/* More Facilities */}
			<h3 className="text-lg mt-16">More Facilities :</h3>

			<ul className="grid grid-cols-2 mt-4 gap-2 w-11/12 mx-auto list-inside list-disc">
				<li>Kitchen for cooking</li>
				<li>Washing machine</li>
				<li>Shared refrigerator</li>
				<li>Bathtub</li>
				<li>Towels</li>
				<li>Toothbrush </li>
				<li>Shampoo </li>
				<li>Soap </li>
				<li>Cooking ware </li>
				<li>Hairdryer </li>
				<li>Iron </li>
				<li>Microwave </li>
				<li>Soap for washing clothes</li>
			</ul>
		</div>
	);
}

export function Location() {
	return (
		<div className="mt-10">
			<h2 className="font-semibold text-lg">
				Nearby Attractions and Transportatin information
			</h2>

			<ul className="w-11/12 mx-auto mt-2 list-inside list-decimal">
				{/* 1 */}
				<li className="font-medium">Nearby Locations</li>
				<ul className="w-11/12 mx-auto ml-8 list-disc  leading-relaxed">
					<li>Station Shinkoiwa JR: 15-20 minutes on foot.</li>
					<li>Direct access from Narita Airport.</li>
					<li>
						Bus stop across the road: From Komatsugawa Keisatsucho-mae, buses go
						to: Kameido Station No. 26, Kinshicho Station No. 25, Ryogoku
						Station No. 27, Hirai Station No. 23
					</li>
				</ul>

				{/* 2 */}
				<li className="font-medium mt-2">Straight Bus Route</li>
				<ul className="w-11/12 mx-auto ml-8 list-disc leading-relaxed">
					<li>Station Koiwa (No. 74 and No. 27).</li>
					<li>Station Funabori (No. 25 and No. 23)</li>
				</ul>

				{/* 3 */}
				<li className="font-medium mt-2">Nearby Amenities</li>
				<ul className="w-11/12 mx-auto ml-8 list-dis leading-relaxed">
					<li>Seven Eleven: 2-minute walk.</li>
					<li>MaxValue Supermarket: 5-minute walk</li>
				</ul>

				{/* 4 */}
				<li className="font-medium mt-2">Places of Interest</li>
				<ul className="w-11/12 mx-auto ml-8 list-disc leading-relaxed">
					<li>Masjid Shinkoiwa: 18-minute walk or 8 minutes by bicycle.</li>
					<li>Tokyo Skytree: 10 minutes by car.</li>
					<li>Disneyland: 30 minutes by car.</li>
					<li>Akihabara and Ueno: 30 minutes by train.</li>
					<li>Shibuya, Harajuku, and Shinjuku: 40 minutes by train.</li>
					<li>Odaiba: 45 minutes by train or 15 minutes by car.</li>
					<li>Asakusa: 30 minutes by train.</li>
				</ul>
			</ul>
		</div>
	);
}

export function RefundPolicy() {
	return (
		<div className="mt-10">
			<h2 className="font-semibold text-lg">Cancellation & Refund Policy</h2>
			<ul className="w-11/12 mx-auto mt-2 list-outside list-disc ml-6">
				<li>
					2 Days Before Check-In: You can cancel your booking and receive a full
					refund.
				</li>
				<li>
					1 Day Before Check-In: You can cancel your booking and still receive a
					refund.
				</li>
				<li>
					Less Than 1 Day Before Check-In: Cancellations are not allowed, and no
					refund will be issued.
				</li>
			</ul>

			<p className="mt-6 italic">
				if you have already made a booking and wish to cancel, please go to the
				My Reservation page to proceed with the cancellation.
			</p>
		</div>
	);
}

export function Review() {
	return (
		<div className="mt-10">
			<h2 className="font-semibold text-lg">Our Customer Reviews</h2>

			{/* Rating */}
			<div className="flex items-center mt-4">
				<p className="font-semibold text-lg mr-3">5.0</p>
				<div>
					<p className="font-semibold">Amazing</p>
					<p>100 verified reviews</p>
				</div>
			</div>

			<FeedbackForm />
			<Review />
		</div>
	);
}
