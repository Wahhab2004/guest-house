"use client";

import Badge from "@/components/Badge";
import formatDateIndo from "@/components/format-tanggal/formatTanggal";
import { Reservation, fetchReservations } from "@/fetching";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const GuestReservation = () => {
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchReservations();
				setReservations(data);
			} catch (error) {
				console.error("Gagal mengambil data reservasi:", error);
			}
		};

		fetchData();
	}, []);

	const totalPages = Math.ceil(reservations?.length / itemsPerPage);

	const paginatedData = reservations.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	return (
		<div className="max-w-7xl mx-auto px-6 mt-10 space-y-6 animate-in fade-in duration-500">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-stone-800 tracking-tight">
						Reservasi Tamu
					</h1>
					<p className="text-stone-500 text-sm mt-1">
						Daftar reservasi terbaru di guesthouse Anda
					</p>
				</div>

				<Link
					href="/guest-reservation"
					className="text-[#FFB22C] font-bold text-sm flex items-center gap-1 hover:underline"
				>
					Lihat semua <ArrowUpRight size={14} />
				</Link>
			</div>

			{/* Table Card */}
			<div className="bg-white border border-stone-200 rounded-[32px] shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead className="bg-amber-50 border-b border-amber-100 text-stone-700">
							<tr>
								<th className="px-6 py-4 text-left font-bold">#</th>
								<th className="px-6 py-4 text-left font-bold">Nama Tamu</th>
								<th className="px-6 py-4 text-left font-bold">Kamar</th>
								<th className="px-6 py-4 text-left font-bold">Check-in</th>
								<th className="px-6 py-4 text-left font-bold">Check-out</th>
								<th className="px-6 py-4 text-left font-bold">
									Total Pembayaran
								</th>
								<th className="px-6 py-4 text-left font-bold">Status</th>
							</tr>
						</thead>

						<tbody className="divide-y divide-stone-100">
							{paginatedData?.map((item, index) => (
								<tr key={index} className="hover:bg-stone-50 transition">
									<td className="px-6 py-4 font-medium text-stone-600">
										{(currentPage - 1) * itemsPerPage + index + 1}
									</td>
									<td className="px-6 py-4 font-semibold text-stone-800">
										{item.guest?.name}
									</td>
									<td className="px-6 py-4 text-stone-700">{item.room.name}</td>
									<td className="px-6 py-4 text-stone-600">
										{formatDateIndo(item.checkIn)}
									</td>
									<td className="px-6 py-4 text-stone-600">
										{formatDateIndo(item.checkOut)}
									</td>
									<td className="px-6 py-4 font-semibold text-[#FFB22C]">
										{item.totalPrice.toLocaleString("ja-JP", {
											style: "currency",
											currency: "JPY",
										})}
									</td>
									<td className="px-6 py-4 text-xs">
										<Badge type={item.status}>{item.status}</Badge>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				<div className="flex items-center justify-between px-6 py-4 border-t border-stone-100 bg-stone-50">
					<button
						onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
						disabled={currentPage === 1}
						className="flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-300 text-stone-600 text-sm font-semibold
						hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
					>
						<ChevronLeft size={16} />
						Sebelumnya
					</button>

					<p className="text-sm font-semibold text-stone-600">
						Halaman {currentPage} dari {totalPages}
					</p>

					<button
						onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
						disabled={currentPage === totalPages}
						className="flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-300 text-stone-600 text-sm font-semibold
						hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
					>
						Selanjutnya
						<ChevronRight size={16} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default GuestReservation;
