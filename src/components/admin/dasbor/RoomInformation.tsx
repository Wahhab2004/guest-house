"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchRooms, Room } from "@/fetching";

export default function RoomInformation() {
	const [rooms, setRoom] = useState<Room[]>([]);

	useEffect(() => {
		const fecthData = async () => {
			try {
				const data = await fetchRooms();
				setRoom(data);
			} catch (error) {
				console.error("Error fetching: ", error);
			}
		};

		fecthData();
	}, []);

	let totalRoomsAvailable = 0;
	let totalRoomsBooked = 0;
	let totalRoomsOvernight = 0;

	rooms.forEach((room) => {
		if (room.status === "AVAILABLE") {
			totalRoomsAvailable++;
		} else if (room.status === "BOOKED") {
			totalRoomsBooked++;
		} else if (room.status === "MAINTENANCE") {
			totalRoomsOvernight++;
		}
	});

	return (
		<div className="flex justify-between items-center w-2/3 ml-[250px] mt-8">
			{/* Rooms Available */}
			<div className="leading-10 flex justify-between items-center p-4 w-1/3 shadow border border-gray-200 rounded-lg mr-4 hover:bg-gray-100 ">
				<div>
					<h3 className="text-[#5D6679] text-sm font-semibold">
						Rooms Available
					</h3>

					<p className="text-[#5D6679] text-3xl font-bold">
						{totalRoomsAvailable}
					</p>

					<Link href="/room">
						<p className="text-[#00B69B] font-semibold text-sm">
							See More Detail
						</p>
					</Link>
				</div>

				<Image
					src="/svg/room-available.svg"
					height={48}
					width={54}
					alt="room-available"
					className=""
				/>
			</div>

			{/* Used Room */}
			<div className="leading-10 flex justify-between items-center p-4 w-1/3 shadow border border-gray-200 rounded-lg mr-4 hover:bg-gray-100 ">
				<div>
					<h3 className="text-[#5D6679] text-sm font-semibold">Used Room</h3>

					<p className="text-[#5D6679] text-3xl font-bold">
						{totalRoomsBooked}
					</p>

					<Link href="/room">
						<p className="text-[#00B69B] font-semibold text-sm">
							See More Detail
						</p>
					</Link>
				</div>

				<Image
					src="/svg/used-room.svg"
					height={48}
					width={54}
					alt="used-room"
					className=""
				/>
			</div>

			{/* Guest Overnight */}
			<div className="leading-10 flex justify-between items-center p-4 w-1/3 shadow border border-gray-200 rounded-lg hover:bg-gray-100 ">
				<div>
					<h3 className="text-[#5D6679] text-sm font-semibold">
						Guest Overnight
					</h3>

					<p className="text-[#5D6679] text-3xl font-bold">
						{totalRoomsOvernight}
					</p>

					<Link href="/room">
						<p className="text-[#00B69B] font-semibold text-sm">
							See More Detail
						</p>
					</Link>
				</div>

				<Image
					src="/svg/guest-overnight.svg"
					height={48}
					width={54}
					alt="guest-overnight"
					className=""
				/>
			</div>
		</div>
	);
}
