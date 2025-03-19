

import { getData } from "@/services/products";

export default async function Rooms() {
	const rooms = await getData("http://localhost:3000/api/room");

	return (
		<main>
			<h1 className="text-[#5D6679] text-xl font-bold mt-6 ml-[230px] ">
				Room
			</h1>

			{/* Rooms Table */}
			<table className="ml-[235px] mt-10 w-[80%] border-collapse">
				<thead>
					<tr className="bg-[#D9D9D9]">
						{["Room ID", "Room Type", "Capacity", "Room Status"].map(
							(header, idx) => (
								<th
									key={idx}
									className="text-[#5D6679] text-xs font-semibold p-2 text-start"
								>
									{header}
								</th>
							)
						)}
					</tr>
				</thead>
				<tbody>
					{rooms.data.map((room: any) => (
						<tr key={room.id} className="border-t">
							<td className="p-2 text-[#5D6679] text-sm">{room.id}</td>
							<td className="p-2 text-[#5D6679] text-sm">{room.roomType}</td>
							<td className="p-2 text-[#5D6679] text-sm">{room.capacity}</td>
							<td className="p-2 text-[#5D6679] text-sm">
                                {room.roomStatus === "available" ? (
                                    <span className="bg-blue-100 text-blue-600 py-1 px-2 rounded">{room.roomStatus}</span>
                                ): (

                                    <span className="bg-red-100 text-red-600 py-1 px-2 rounded">{room.roomStatus}</span>
                                )}
                            </td>
						</tr>
					))}
				</tbody>
			</table>
		</main>
	);
}
