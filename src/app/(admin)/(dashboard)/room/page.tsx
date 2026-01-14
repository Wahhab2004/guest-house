"use client";

import { fetchRooms, Room } from "@/fetching";
import { useEffect, useState } from "react";

export default function Rooms() {
	const [rooms, setRooms] = useState<Room[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchRooms();
				setRooms(data);
			} catch (error) {
				console.error("Error fetching rooms:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<section className="ml-[235px] mt-6">
			{/* Title */}
			<h1 className="text-[#5D6679] text-xl font-bold">Room</h1>
			<div className="border shadow rounded p-4 mt-8 w-[90%]">
				{/* Rooms Table */}
				<table className="w-full">
					<thead>
						<tr>
							{["Room ID", "Room Number", "PricePerNight", "Room Status"].map(
								(header, idx) => (
									<th
										key={idx}
										className="text-[#5D6679] font-semibold text-sm text-start"
									>
										{header}
									</th>
								)
							)}
						</tr>
					</thead>

					<tbody>
						{rooms.map((room) => (
							<tr key={room.id} className="text-gray-400 text-sm border-b">
								<td className="py-4 text-[#5D6679] text-sm">{room.id}</td>
								<td className="py-4 text-[#5D6679] text-sm">
									{room.name}
								</td>
								<td className="py-4 text-[#5D6679] text-sm">
									¥{room.price}
								</td>
								<td className="py-4 text-[#5D6679] text-sm">
									{room.status === "available" ? (
										<span className="bg-blue-100 text-blue-600 py-1 px-2 rounded">
											{room.status}
										</span>
									) : (
										<span className="bg-red-100 text-red-600 py-1 px-2 rounded">
											{room.status}
										</span>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
