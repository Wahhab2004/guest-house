"use client";

import Link from "next/link";
import Review from "./../../../../components/review";
import { useEffect, useState } from "react";
import { fetchRoomById, Room } from "@/fetching";
import { useParams } from "next/navigation";
import BookingForm from "@/components/user/room/BookingRoom";
import DetailRoom, {
	Description,
	Facilities,
	Katalog,
	Location,
	RefundPolicy,
} from "@/components/user/room/DetailRoom";
import FeedbackForm from "@/components/FeedbackForm";

export default function DetailProductPage() {
	const [room, setRoom] = useState<Room | null>(null);
	const { id } = useParams();

	useEffect(() => {
		const fetchRoomsId = async () => {
			if (!id) return;
			const data = await fetchRoomById(String(id));
			console.log(data);
			setRoom(data);
		};
		fetchRoomsId();
	}, [id]);

	return (
		<section>
			<nav className="fixed top-0 left-0 right-0 z-50  text-white border-b-2 p-4 flex items-center justify-center gap-4 bg-white lg:p-6">
				<Link href="/">
					<p className="text-xl font-bold hover:text-gray-700 cursor-pointer text-black ">
						GuestHouse Ryosuke
					</p>
				</Link>

				<p className="text-gray-600 lg:font-semibold">Detail Room</p>

				<div className="hidden lg:block"></div>
			</nav>

			<main className=" w-11/12 mx-auto mt-28 mb-20 object-cover lg:w-[85%]">
				<DetailRoom room={room} />
				<BookingForm room={room} id={id} />
				{/* <Availibilty /> */}
				<Katalog />
				<Facilities />
				<Description />
				<Location />
				<RefundPolicy />
				<FeedbackForm />
				<Review />
			</main>
		</section>
	);
}
