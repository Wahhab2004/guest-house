"use client";

import { useCallback, useEffect, useState } from "react";
import { type Reservation } from "@/fetching";
import formatDateIndo from "../../format-tanggal/formatTanggal";
import EditReservation from "./editReservasi";
import AddReservation from "./addReservasi";
import Cookies from "js-cookie";
import PaginationControl from "@/components/admin/reservasi/PaginationControl";
import Badge from "@/components/Badge";
import ActionButton from "@/components/ActionButton";

export default function Reservasi() {
	const [token, setToken] = useState<string | null>(null);
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [filteredReservations, setFilteredReservations] = useState<
		Reservation[]
	>([]);
	const [editReservation, setEditReservation] = useState<Reservation | null>(
		null
	);
	const [detailReservation, setDetailReservation] =
		useState<Reservation | null>(null);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const [search, setSearch] = useState("");
	const [searchType, setSearchType] = useState("guestName");
	const [status, setStatus] = useState("");
	const [paymentStatus, setPaymentStatus] = useState("");
	const [sortBy, setSortBy] = useState("createdAt");
	const [order, setOrder] = useState("desc");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const [showFilter, setShowFilter] = useState(false);
	const [isAddOpen, setIsAddOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isDetailOpen, setIsDetailOpen] = useState(false);
	const [selectedReservationId, setSelectedReservationId] = useState<
		string | null
	>(null);

	const fetchReservations = useCallback(async () => {
		try {
			const tokenValue = Cookies.get("token") || null;
			setToken(tokenValue);

			const params = new URLSearchParams({
				status,
				paymentStatus,
				startDate,
				endDate,
				guestName: searchType === "guestName" ? search : "",
				roomName: searchType === "roomName" ? search : "",
				order,
				sortBy,
			});

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/reservations?${params}`,
				{
					headers: { Authorization: tokenValue ? `Bearer ${tokenValue}` : "" },
					cache: "no-store",
				}
			);

			if (!res.ok) throw new Error("Gagal memuat reservasi");
			const json = await res.json();

			setReservations(json.data);
			setFilteredReservations(json.data);
		} catch (error) {
			console.error(error);
		}
	}, [
		status,
		paymentStatus,
		startDate,
		endDate,
		search,
		order,
		sortBy,
		searchType,
	]);

	useEffect(() => {
		fetchReservations();
	}, [fetchReservations]);

	const paginatedData = filteredReservations.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);

	const resetFilters = () => {
		setSearch("");
		setStatus("");
		setPaymentStatus("");
		setStartDate("");
		setEndDate("");
		setSortBy("createdAt");
		setOrder("desc");
		setItemsPerPage(10);
	};

	return (
		<div>
			{/* HEADER */}
			<div className="bg-white border border-stone-200 rounded-[32px] p-6 shadow-sm mb-10">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-2xl font-bold text-stone-800">
							Manajemen Reservasi
						</h1>
						<p className="text-sm text-stone-500 mt-1">
							Kelola seluruh data reservasi tamu
						</p>
					</div>

					<div className="flex gap-2">
						<button
							onClick={() => setShowFilter((p) => !p)}
							className="px-4 py-2 rounded-xl bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition"
						>
							{showFilter ? "Tutup Filter" : "Filter"}
						</button>

						<button
							onClick={() => setIsAddOpen(true)}
							className="px-4 py-2 rounded-xl bg-stone-800 text-white text-sm font-semibold hover:bg-stone-900 transition"
						>
							Tambah Reservasi
						</button>
					</div>
				</div>

				{/* FILTER */}
				{showFilter && (
					<div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 text-sm">
						<select
							value={searchType}
							onChange={(e) => setSearchType(e.target.value)}
							className="border rounded-xl px-3 py-2"
						>
							<option value="guestName">Nama Tamu</option>
							<option value="roomName">Nama Kamar</option>
						</select>

						<input
							type="text"
							placeholder="Cari..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="border rounded-xl px-3 py-2"
						/>

						<select
							value={status}
							onChange={(e) => setStatus(e.target.value)}
							className="border rounded-xl px-3 py-2"
						>
							<option value="">Semua Status</option>
							<option value="CONFIRMED">Disetujui</option>
							<option value="PENDING">Pending</option>
							<option value="CANCELED">Dibatalkan</option>
							<option value="CHECKED_OUT">Selesai</option>
						</select>

						<button
							onClick={resetFilters}
							className="rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 font-semibold"
						>
							Reset Filter
						</button>
					</div>
				)}
			</div>

			{/* TABLE */}
			<ReservasiTable
				reservations={paginatedData}
				onEdit={(id) => {
					setSelectedReservationId(id);
					setEditReservation(reservations.find((r) => r.id === id) || null);
					setIsEditOpen(true);
				}}
				onDelete={(id) => {
					setReservations((prev) => prev.filter((r) => r.id !== id));
					setFilteredReservations((prev) => prev.filter((r) => r.id !== id));
				}}
				onDetail={(id) => {
					setSelectedReservationId(id);
					setDetailReservation(reservations.find((r) => r.id === id) || null);
					setIsDetailOpen(true);
				}}
			/>

			<PaginationControl
				totalPages={totalPages}
				currentPage={currentPage}
				handleNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
				handlePrevious={() => setCurrentPage((p) => Math.max(1, p - 1))}
			/>

			{/* MODAL */}
			<AddReservation
				isOpen={isAddOpen}
				onClose={() => setIsAddOpen(false)}
				onSave={() => {}}
				token={token}
			/>

			<EditReservation
				isOpen={isEditOpen}
				onClose={() => setIsEditOpen(false)}
				reservation={editReservation}
				onUpdate={() => {}}
				token={token}
			/>
			<DetailReservation
				isOpen={isDetailOpen}
				onClose={() => setIsDetailOpen(false)}
				reservation={detailReservation}
			/>
		</div>
	);
}

interface ReservasiTableProps {
	reservations: Reservation[];
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
	// currentPage: number;
	// itemsPerPage: number;
	onDetail: (id: string) => void;
}

function ReservasiTable({
	reservations,
	onEdit,
	onDelete,
	onDetail,
}: ReservasiTableProps) {
	return (
		<div className="w-full ">
			<h1 className="text-xl font-bold mb-3 ">Reservasi</h1>
			<div className="border shadow-md rounded-xl bg-white overflow-x-auto">
				<table className="w-full text-left text-sm">
					<thead className="bg-gray-100 uppercase">
						<tr>
							{[
								"#",
								"Nama Tamu",
								"Nama Kamar",
								"Tgl Reservasi",
								"Waktu / Lama",
								"Jml Tamu",
								"Metode Bayar",
								"Status",
								"Pembayaran",
								"Harga",
								"Aksi",
							].map((header, idx) => (
								<th key={idx} className="px-4 py-3 whitespace-nowrap">
									{header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{reservations?.length > 0 ? (
							reservations.map((res, index) => (
								<tr
									key={res.id}
									className="border-b hover:bg-gray-50 transition"
								>
									<td className="px-4 py-3">{index + 1}</td>
									<td className="px-4 py-3">{res.guest?.name}</td>
									<td className="px-4 py-3">{res.room?.name}</td>
									<td className="px-4 py-3">{formatDateIndo(res.createdAt)}</td>
									<td className="px-4 py-3">
										{formatDateIndo(res.checkIn)} -{" "}
										{formatDateIndo(res.checkOut)}
									</td>
									<td className="px-4 py-3">{res.guestTotal}</td>
									<td className="px-4 py-3">
										<Badge type={res.payment?.method}>
											{res.payment?.method}
										</Badge>
									</td>
									<td className="px-4 py-3">
										<Badge type={res.status}>{res.status}</Badge>
									</td>
									<td className="px-4 py-3">
										<Badge type={res.payment?.status}>
											{res.payment?.status}
										</Badge>
									</td>
									<td className="px-4 py-3 whitespace-nowrap">
										{res.totalPrice.toLocaleString("jp-JP", {
											style: "currency",
											currency: "JPY",
										})}
									</td>
									<td className="px-4 py-3">
										<div className="flex gap-2">
											<ActionButton
												color="blue"
												label=""
												onClick={() => onDetail(res.id)}
												icon="📝"
											/>
											<ActionButton
												color="amber"
												label=""
												onClick={() => onEdit(res.id)}
												icon="✏️"
											/>
											<ActionButton
												color="red"
												label=""
												onClick={() => onDelete(res.id)}
												icon="🗑️"
											/>
										</div>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={12}
									className="text-center text-gray-500 py-6 text-sm"
								>
									Tidak ada data reservasi.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

interface DetailProps {
	isOpen: boolean;
	onClose: () => void;
	reservation: Reservation | null;
}

interface DetailProps {
	isOpen: boolean;
	onClose: () => void;
	reservation: Reservation | null;
}

export function DetailReservation({
	isOpen,
	onClose,
	reservation,
}: DetailProps) {
	if (!isOpen || !reservation) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
			<div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-2xl space-y-6 overflow-y-auto max-h-[90vh]">
				<h2 className="text-2xl font-semibold text-center text-gray-800 border-b pb-3">
					Detail Reservasi
				</h2>

				<div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
					<div>
						<p className="text-gray-500">Nama Tamu</p>
						<p className="font-medium">{reservation.guest?.name || "-"}</p>
					</div>

					<div>
						<p className="text-gray-500">Email Tamu</p>
						<p className="font-medium">{reservation.guest?.email || "-"}</p>
					</div>

					<div>
						<p className="text-gray-500">Nomor HP</p>
						<p className="font-medium">{reservation.guest?.phone || "-"}</p>
					</div>

					<div>
						<p className="text-gray-500">Kamar</p>
						<p className="font-medium">{reservation.room?.name || "-"}</p>
					</div>

					<div>
						<p className="text-gray-500">Check-In</p>
						<p className="font-medium">{formatDateIndo(reservation.checkIn)}</p>
					</div>

					<div>
						<p className="text-gray-500">Check-Out</p>
						<p className="font-medium">
							{formatDateIndo(reservation.checkOut)}
						</p>
					</div>

					<div>
						<p className="text-gray-500">Jumlah Tamu</p>
						<p className="font-medium">{reservation.guestTotal} orang</p>
					</div>

					<div>
						<p className="text-gray-500">Metode Pembayaran</p>
						<p className="font-medium">{reservation.payment?.method}</p>
					</div>

					<div>
						<p className="text-gray-500">Status Pembayaran</p>
						<span
							className={`px-2 py-1 text-xs rounded-full font-semibold ${
								reservation.payment?.status === "paid"
									? "bg-green-100 text-green-700"
									: "bg-red-100 text-red-700"
							}`}
						>
							{reservation.payment?.status === "paid" ? "Lunas" : "Belum Lunas"}
						</span>
					</div>

					<div>
						<p className="text-gray-500">Status</p>
						<span
							className={`px-2 py-1 text-xs rounded-full font-semibold ${
								reservation.status === "confirmed"
									? "bg-green-100 text-green-700"
									: reservation.status === "cancelled"
									? "bg-red-100 text-red-700"
									: "bg-yellow-100 text-yellow-700"
							}`}
						>
							{reservation.status}
						</span>
					</div>

					<div>
						<p className="text-gray-500 mb-1">Bukti Pembayaran</p>

						{reservation.payment?.proofUrl ? (
							// Nanti perbaiki href
							<a
								href={reservation.payment?.proofUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 underline"
							>
								Lihat Bukti Pembayaran
							</a>
						) : (
							<p className="italic text-gray-400">Tidak tersedia</p>
						)}
					</div>

					<div>
						<p className="text-gray-500">Total</p>
						<p className="font-medium">
							{reservation.totalPrice.toLocaleString("id-ID", {
								style: "currency",
								currency: "IDR",
							})}
						</p>
					</div>
				</div>

				<div className="text-right">
					<button
						onClick={onClose}
						className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
					>
						Tutup
					</button>
				</div>
			</div>
		</div>
	);
}
