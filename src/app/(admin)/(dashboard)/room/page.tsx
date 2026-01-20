"use client";

import { fetchRooms, Room } from "@/fetching";
import Image from "next/image";
import { useEffect, useState } from "react";
import RoomFormModal from "@/components/admin/room/roomFormModal";
import { createRoom, updateRoom, deleteRoom } from "@/lib/room";
import { getProofUrl } from "@/components/admin/reservasi/reservasi";

export default function Rooms() {
	const [rooms, setRooms] = useState<Room[]>([]);
	const [loading, setLoading] = useState(true);
	const [openForm, setOpenForm] = useState(false);
	const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchRooms();
				setRooms(data);
			} catch (error) {
				console.error("Error fetching rooms:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="max-w-7xl mx-auto px-6 py-6 space-y-6 mt-20">
			<RoomFormModal
				open={openForm}
				initialData={selectedRoom}
				onClose={() => setOpenForm(false)}
				onSubmit={async (data) => {
					if (selectedRoom) {
						const res = await updateRoom(selectedRoom.id, data);
						setRooms((prev) =>
							prev.map((r) => (r.id === selectedRoom.id ? res.data : r)),
						);
					} else {
						const res = await createRoom(data);
						setRooms((prev) => [...prev, res.data]);
					}
					setOpenForm(false);
				}}
			/>
			{/* HEADER */}
			<div className="flex justify-between items-center bg-white border border-stone-200 rounded-[32px] p-6 shadow-sm">
				<div>
					<h1 className="text-2xl font-bold text-stone-800">Manajemen Kamar</h1>
					<p className="text-sm text-stone-500 mt-1">
						Daftar kamar beserta status dan harga
					</p>
				</div>

				<button
					onClick={() => {
						setSelectedRoom(null);
						setOpenForm(true);
					}}
					className="px-4 py-2 rounded-xl bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition"
				>
					Tambah Kamar
				</button>
			</div>
			{/* TABLE */}
			<div className="bg-white border border-stone-200 rounded-[32px] shadow-sm overflow-hidden">
				{loading ? (
					<div className="p-10 text-center text-stone-400 text-sm">
						Memuat data kamar...
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead className="bg-stone-50 border-b border-stone-200">
								<tr className="text-stone-600 font-semibold">
									<th className="px-6 py-4 text-left">Gambar</th>
									<th className="px-6 py-4 text-left">Nama Kamar</th>
									<th className="px-6 py-4 text-left">Deskripsi</th>
									<th className="px-6 py-4 text-left">Harga / Malam</th>
									<th className="px-6 py-4 text-left">Status</th>
									<th className="px-6 py-4 text-left">Aksi</th>
								</tr>
							</thead>

							<tbody>
								{rooms.length > 0 ? (
									rooms.map((room) => (
										<tr
											key={room.id}
											className="border-b last:border-none hover:bg-stone-50 transition"
										>
											{/* IMAGE */}
											<td className="px-6 py-4">
												<div className="relative w-24 h-16 rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
													<img
														src={getProofUrl(room.photoUrl) || "/no-image.png"}
														alt={room.name}
														className="object-cover object-center w-full h-full"
													/>
												</div>
											</td>

											{/* NAME */}
											<td className="px-6 py-4 font-semibold text-stone-800 whitespace-nowrap">
												{room.name}
											</td>

											{/* DESCRIPTION */}
											<td className="px-6 py-4 text-stone-600 max-w-xs truncate">
												{room.description}
											</td>

											{/* PRICE */}
											<td className="px-6 py-4 text-stone-700 whitespace-nowrap">
												{room.price.toLocaleString("ja-JP", {
													style: "currency",
													currency: "JPY",
												})}
											</td>

											{/* STATUS */}
											<td className="px-6 py-4">
												{room.status === "AVAILABLE" ? (
													<span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200">
														Tersedia
													</span>
												) : (
													<span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600 border border-red-200">
														Dipesan
													</span>
												)}
											</td>

											<td className="px-6 py-4">
												<div className="flex gap-2">
													<button
														onClick={() => {
															setSelectedRoom(room);
															setOpenForm(true);
														}}
														className="px-3 py-1 rounded-lg bg-amber-100 text-amber-700"
													>
														Edit
													</button>
													<button
														onClick={async () => {
															if (!confirm("Hapus kamar ini?")) return;
															await deleteRoom(room.id);
															
															setRooms((prev) =>
																prev.filter((r) => r.id !== room.id),
															);
														}}
														className="px-3 py-1 rounded-lg bg-red-100 text-red-600"
													>
														Hapus
													</button>
												</div>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan={5}
											className="px-6 py-10 text-center text-stone-400"
										>
											Tidak ada data kamar
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}
