"use client";


import Link from "next/link";
import Image from "next/image";
import Calendar from "@/components/Calendar";
import FeedbackForm from "@/components/FeedbackForm";
import Review from "@/components/Review";
import { useEffect, useState } from "react";
import { fetchRoomById, Room } from "@/fetching";
import { useParams } from "next/navigation";

export default  function DetailProductPage() {
	const [room, setRooms] = useState<Room | null>(null);
	const { id } = useParams();

	useEffect(() => {
		const fetchRoomsId = async () => {
			if (!id) return;
			const data = await fetchRoomById(String(id));
			setRooms(data);
		};
		fetchRoomsId();
	}, [id]);

	return (
		<section>
			<nav className="fixed top-0 left-0 right-0 z-50 w-full text-white border-b-2 p-4 flex items-center justify-between lg:justify-between bg-white lg:p-6">
				<Link href="/">
					<p className="text-xl font-bold hover:text-gray-700 cursor-pointer text-black w-1/2 lg:w-full">
						GuestHouse Ryosuke
					</p>
				</Link>

				<p className="text-gray-600 lg:font-semibold">
					Detail room {room?.roomNumber}
				</p>

				<div className="hidden lg:block"></div>
			</nav>

			<main className=" w-11/12 mx-auto mt-28 mb-20 object-cover lg:w-[85%]">
				{/* Room */}
				{/* <h2 className="font-bold text-xl ml-4">{room.name}</h2> */}
				<div className="p-4 font-bold text-xl shadow lg:w-2/3 mx-auto">
					<Link href="#">
						<Image
							className="rounded-xl lg:h-[460px]"
							src={room?.image ? room.image : "/fallback-image.png"}
							alt={room?.roomNumber || "Product image"}
							width={1000}
							height={270}
						/>
					</Link>

					<div className="bg-gray-800 rounded-lg p-4 mt-2 text-white">
						images
					</div>

					<div className="pb-5 mt-10">
						<Link href="#">
							<h5 className="text-xl font-semibold tracking-tight text-black">
								{room?.roomNumber} {/* Tampilkan nama produk */}
							</h5>
						</Link>
						<div className="flex items-center mt-2.5 mb-5">
							<div className="flex items-center space-x-1">
								{[...Array(4)].map((_, i) => (
									<svg
										key={i}
										className="w-4 h-4 text-yellow-300"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 22 20"
									>
										<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
									</svg>
								))}
								<svg
									className="w-4 h-4 text-gray-200"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 22 20"
								>
									<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
								</svg>
							</div>
							<span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
								{room?.rating || "5.0"} {/* Tampilkan rating */}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-xl font-bold text-black w-1/2">
								¥{room?.price || "4000"} / night {/* Tampilkan harga */}
							</span>
							<Link
								href={`/my-reservations`}
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center lg:ml-2 lg:px-3"
							>
								Booking Room
							</Link>
						</div>
					</div>
				</div>

				{/* Katalog */}
				<div className="mt-10">
					<p className="text-gray-600">
						Download our room catalogue{" "}
						<span className="italic text-blue-600 underline">here</span>
					</p>
				</div>

				{/* Facilities */}
				<div className="mt-10">
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

				{/* Description */}
				<div className="mt-10">
					<h2 className="font-semibold text-lg">Description</h2>

					<p className="w-11/12 mx-auto mt-4 ">
						Enjoy the perfect summer escape in our guest house, equipped with
						all the essentials to make your stay comfortable and convenient.
						Cook your favorite summer dishes in the fully equipped kitchen, keep
						your clothes fresh with the washing machine, and store chilled
						drinks in the shared refrigerator. Relax in the bathtub, freshen up
						with the provided towels, toothbrush, and shampoo, or take advantage
						of the microwave, iron, and hairdryer to keep your summer vibes on
						point. Whether you’re cooling off after a sunny day or preparing for
						your next adventure, our thoughtfully curated amenities ensure a
						carefree and refreshing summer experience.
					</p>
				</div>

				{/* Availability */}
				<div className="mt-10">
					<h2 className="font-semibold text-lg">Check Availability</h2>

					{/* Calendar */}
					<Calendar />
				</div>

				{/* Location */}
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
								Bus stop across the road: From Komatsugawa Keisatsucho-mae,
								buses go to: Kameido Station No. 26, Kinshicho Station No. 25,
								Ryogoku Station No. 27, Hirai Station No. 23
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

				{/* Refund Pollicy */}
				<div className="mt-10">
					<h2 className="font-semibold text-lg">
						Cancellation & Refund Policy
					</h2>
					<ul className="w-11/12 mx-auto mt-2 list-outside list-disc ml-6">
						<li>
							2 Days Before Check-In: You can cancel your booking and receive a
							full refund.
						</li>
						<li>
							1 Day Before Check-In: You can cancel your booking and still
							receive a refund.
						</li>
						<li>
							Less Than 1 Day Before Check-In: Cancellations are not allowed,
							and no refund will be issued.
						</li>
					</ul>

					<p className="mt-6 italic">
						if you have already made a booking and wish to cancel, please go to
						the My Reservation page to proceed with the cancellation.
					</p>
				</div>

				{/* Reviews */}
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
			</main>
		</section>
	);
}
