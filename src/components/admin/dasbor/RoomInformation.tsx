"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchRooms, Room } from "@/fetching";

export default function RoomInformation() {
	const [rooms, setRooms] = useState<Room[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchRooms();
				setRooms(data);
			} catch (error) {
				console.error("Gagal mengambil data kamar:", error);
			}
		};

		fetchData();
	}, []);

	let tersedia = 0;
	let terpakai = 0;
	let menginap = 0;

	rooms.forEach((room) => {
		if (room.status === "AVAILABLE") tersedia++;
		if (room.status === "BOOKED") terpakai++;
		if (room.status === "OVERNIGHT") menginap++;
	});

	return (
		<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
			<InfoCard
				title="Kamar Tersedia"
				value={tersedia}
				// icon="/svg/room-available.svg"
				href="/room"
			/>

			<InfoCard
				title="Kamar Terpakai"
				value={terpakai}
				// icon="/svg/used-room.svg"
				href="/room"
			/>

			<InfoCard
				title="Tamu Menginap"
				value={menginap}
				// icon="/svg/guest-overnight.svg"
				href="/room"
			/>
		</div>
	);
}

function InfoCard({
	title,
	value,
	// icon,
	href,
}: {
	title: string;
	value: number;
	// icon: string;
	href: string;
}) {
	return (
		<div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm hover:border-blue-300 transition-all group">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-semibold text-slate-500">{title}</p>
					<p className="text-4xl font-bold text-slate-900 mt-2">
						{value}
					</p>

					<Link
						href={href}
						className="inline-block mt-4 text-sm font-bold text-[#FFB22C] hover:underline"
					>
						Lihat detail →
					</Link>
				</div>

				<div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:scale-110 transition-transform duration-300">
					{/* <Image src={icon} alt={title} width={48} height={48} /> */}
				</div>
			</div>
		</div>
	);
}
