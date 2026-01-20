"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Search, Sparkles } from "lucide-react";
import { Room, fetchRooms } from "@/fetching";

export default function ProductCardWithAvailability() {
	const [rooms, setRooms] = useState<Room[]>([]);
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [filtered, setFiltered] = useState(false);

	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

	useEffect(() => {
		loadAllRooms();
	}, []);

	const loadAllRooms = async () => {
		try {
			setLoading(true);
			setFiltered(false);
			const data = await fetchRooms();
			setRooms(data);
		} catch {
			setError("Failed to load rooms.");
		} finally {
			setLoading(false);
		}
	};

	const checkAvailability = async () => {
		if (!checkIn || !checkOut) {
			setError("Please select both check-in and check-out dates.");
			return;
		}

		setError(null);
		setLoading(true);
		setFiltered(true);

		try {
			const params = new URLSearchParams({
				checkIn: new Date(checkIn).toISOString(),
				checkOut: new Date(checkOut).toISOString(),
			});

			const res = await fetch(`${baseUrl}/rooms/available?${params}`);
			const json = await res.json();

			if (!res.ok) {
				setError(json.message || "Failed to check availability.");
				return;
			}

			setRooms(json.data || []);
		} catch {
			setError("Server error while checking availability.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container max-w-7xl mx-auto px-4 py-12 my-10 md:w-11/12 xl:w-full">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
				<div>
					<h1 className="text-[2.5rem] font-extrabold tracking-tight">
						Our Rooms
					</h1>
					<p className="text-slate-500 max-w-xl">
						Select your travel dates and discover rooms tailored for your
						perfect stay.
					</p>
				</div>

				{/* Booking Bar */}
				<div
					className="bg-white/80 backdrop-blur-xl border border-slate-200
					rounded-3xl shadow-lg p-4 flex flex-col md:flex-row gap-4 w-full md:w-auto"
				>
					<div>
						<label className="text-xs text-slate-500 flex items-center gap-1 mb-1">
							<Calendar size={12} /> Check-in
						</label>
						<input
							type="date"
							value={checkIn}
							onChange={(e) => setCheckIn(e.target.value)}
							className="border rounded-2xl px-4 py-2 text-sm w-full md:w-[170px]
								focus:ring-2 focus:ring-amber-400 outline-none"
						/>
					</div>

					<div>
						<label className="text-xs text-slate-500 flex items-center gap-1 mb-1">
							<Calendar size={12} /> Check-out
						</label>
						<input
							type="date"
							value={checkOut}
							onChange={(e) => setCheckOut(e.target.value)}
							className="border rounded-2xl px-4 py-2 text-sm w-full md:w-[170px]
								focus:ring-2 focus:ring-amber-400 outline-none"
						/>
					</div>

					<button
						onClick={checkAvailability}
						disabled={loading}
						className="flex items-center justify-center gap-2 px-6 py-2
							rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600
							text-white font-bold hover:shadow-xl transition-all
							disabled:opacity-50"
					>
						<Search size={14} />
						{loading ? "Checking..." : "Check Availability"}
					</button>

					{filtered && (
						<button
							onClick={loadAllRooms}
							className="px-5 py-2 rounded-2xl border border-slate-300
								text-slate-600 font-semibold hover:bg-slate-100 transition"
						>
							Show All
						</button>
					)}
				</div>
			</div>

			{/* Error */}
			{error && (
				<div className="mt-6 bg-red-100 text-red-600 p-4 rounded-2xl text-sm font-semibold">
					{error}
				</div>
			)}

			{/* Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
				{rooms.map((room) => (
					<div
						key={room.id}
						className="group w-full bg-white border border-slate-200 rounded-3xl shadow-md
							hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
					>
						<Link href={`/rooms/${room.id}`}>
							<div className="relative w-full h-[18rem] overflow-hidden rounded-t-3xl">
								<Image
									src={
										room.photoUrl
											? `${room.photoUrl}`
											: "/images/rooms/room-1.png"
									}
									alt={room.name}
									fill
									className="object-cover group-hover:scale-110 transition-transform duration-500"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>

								{/* Gradient Overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

								{/* Available Badge */}
								{filtered && (
									<div
										className="absolute top-4 left-4 px-3 py-1 rounded-full
										bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"
									>
										<Sparkles size={12} />
										Available
									</div>
								)}
							</div>
						</Link>

						<div className="px-6 pb-6 pt-5 space-y-3">
							<h5 className="text-lg font-bold tracking-tight text-slate-900">
								{room.name}
							</h5>

							<p className="text-sm text-slate-500 line-clamp-2">
								{room.description}
							</p>

							<div className="flex items-center justify-between pt-3">
								<span
									className="px-4 py-1 rounded-full bg-amber-100
									text-amber-700 font-bold text-sm"
								>
									¥{room.price.toLocaleString()} / person
								</span>

								<Link
									href={`/rooms/${room.id}`}
									className="text-white bg-gradient-to-r from-amber-500 to-amber-600
										hover:shadow-lg font-bold rounded-2xl text-sm px-5 py-2 transition"
								>
									Book Room
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Empty State */}
			{!loading && rooms.length === 0 && (
				<div className="text-center mt-16 space-y-3">
					<p className="text-slate-500 italic">
						No rooms available for the selected dates.
					</p>
					<button
						onClick={loadAllRooms}
						className="px-6 py-2 rounded-2xl border border-slate-300
							text-slate-600 font-semibold hover:bg-slate-100 transition"
					>
						Show All Rooms
					</button>
				</div>
			)}
		</div>
	);
}
