"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Reservation } from "@/fetching";
import formatDateIndo from "../../format-tanggal/formatTanggal";
import Cookies from "js-cookie";
import PaginationControl from "@/components/admin/reservasi/PaginationControl";
import Badge from "@/components/Badge";
import ActionButton from "@/components/ActionButton";
import ReservationModal from "./reservationModalForm";
import EditReservationModal from "./editReservationModal";
import {
	PaymentMethod,
	PaymentStatus,
	ReservationStatus,
} from "@/types/prisma";
import { EditReservationForm } from "@/types/forms";

/* ================= TYPES ================= */
interface FilterState {
	search: string;
	searchType: "guestName" | "roomName";
	status: ReservationStatus | "";
	startDate: string;
	endDate: string;
	sortBy: "createdAt" | "checkIn" | "checkOut";
	order: "asc" | "desc";
}

/* ================= MAIN ================= */
export default function Reservasi() {
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [selected, setSelected] = useState<Reservation | null>(null);

	const [isAddOpen, setIsAddOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isDetailOpen, setIsDetailOpen] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const [showFilter, setShowFilter] = useState(false);

	const [filters, setFilters] = useState<FilterState>({
		search: "",
		searchType: "guestName",
		status: "",
		startDate: "",
		endDate: "",
		sortBy: "createdAt",
		order: "desc",
	});

	/* ================= FETCH ================= */
	const fetchReservations = useCallback(async () => {
		try {
			const token = Cookies.get("token");

			const params = new URLSearchParams({
				status: filters.status || "",
				startDate: filters.startDate,
				endDate: filters.endDate,
				guestName: filters.searchType === "guestName" ? filters.search : "",
				roomName: filters.searchType === "roomName" ? filters.search : "",
				order: filters.order,
				sortBy: filters.sortBy,
			});

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/reservations?${params}`,
				{
					headers: token ? { Authorization: `Bearer ${token}` } : {},
					cache: "no-store",
				},
			);

			if (!res.ok) throw new Error("Gagal memuat reservasi");

			const json = await res.json();
			setReservations(json.data || []);
			setCurrentPage(1);
		} catch (err) {
			console.error("Fetch reservations failed:", err);
		}
	}, [filters]);

	useEffect(() => {
		fetchReservations();
	}, [fetchReservations]);

	/* ================= FILTER + SORT ================= */
	const filtered = useMemo(() => {
		let data = [...reservations];

		if (filters.search) {
			data = data.filter((r) => {
				if (filters.searchType === "guestName") {
					return r.guest?.name
						?.toLowerCase()
						.includes(filters.search.toLowerCase());
				}
				return r.room?.name
					?.toLowerCase()
					.includes(filters.search.toLowerCase());
			});
		}

		if (filters.status) {
			data = data.filter((r) => r.status === filters.status);
		}

		data.sort((a, b) => {
			const aVal = new Date(
				(filters.sortBy === "createdAt"
					? a.createdAt
					: filters.sortBy === "checkIn"
						? a.checkIn
						: a.checkOut) || "",
			).getTime();

			const bVal = new Date(
				(filters.sortBy === "createdAt"
					? b.createdAt
					: filters.sortBy === "checkIn"
						? b.checkIn
						: b.checkOut) || "",
			).getTime();

			return filters.order === "asc" ? aVal - bVal : bVal - aVal;
		});

		return data;
	}, [reservations, filters]);

	/* ================= PAGINATION ================= */
	const totalPages = Math.ceil(filtered.length / itemsPerPage);

	const paginatedData = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		return filtered.slice(start, start + itemsPerPage);
	}, [filtered, currentPage, itemsPerPage]);

	/* ================= HANDLERS ================= */
	const handleEdit = (id: string) => {
		const found = reservations.find((r) => r.id === id);
		if (!found) return;

		setSelected(found);
		setIsEditOpen(true);
	};

	const handleDetail = (id: string) => {
		const found = reservations.find((r) => r.id === id);
		if (!found) return;

		setSelected(found);
		setIsDetailOpen(true);
	};

	const handleDelete = async (id: string) => {
		try {
			const token = Cookies.get("token");

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/reservations/${id}`,
				{
					method: "DELETE",
					headers: token ? { Authorization: `Bearer ${token}` } : {},
				},
			);

			if (!res.ok) throw new Error("Gagal menghapus reservasi");

			// Jika berhasil, update state lokal
			setReservations((prev) => prev.filter((r) => r.id !== id));
		} catch (err) {
			console.error("Delete reservation failed:", err);
			alert("Gagal menghapus reservasi");
		}
	};

	const resetFilters = () => {
		setFilters({
			search: "",
			searchType: "guestName",
			status: "",
			startDate: "",
			endDate: "",
			sortBy: "createdAt",
			order: "desc",
		});
		setItemsPerPage(10);
	};

	const EMPTY_EDIT_FORM: EditReservationForm = {
		id: "",
		guestId: "",
		roomId: "",
		checkIn: "",
		checkOut: "",

		additionalGuests: [],

		status: ReservationStatus.PENDING,
		paymentStatus: PaymentStatus.UNPAID,
		paymentMethod: PaymentMethod.TRANSFER,
		paymentSender: "",
	};

	/* ================= RENDER ================= */
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
							value={filters.searchType}
							onChange={(e) =>
								setFilters((p) => ({
									...p,
									searchType: e.target.value as "guestName" | "roomName",
								}))
							}
							className="border rounded-xl px-3 py-2"
						>
							<option value="guestName">Nama Tamu</option>
							<option value="roomName">Nama Kamar</option>
						</select>

						<input
							type="text"
							placeholder="Cari..."
							value={filters.search}
							onChange={(e) =>
								setFilters((p) => ({ ...p, search: e.target.value }))
							}
							className="border rounded-xl px-3 py-2"
						/>

						<select
							value={filters.status}
							onChange={(e) =>
								setFilters((p) => ({
									...p,
									status: e.target.value as ReservationStatus | "",
								}))
							}
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
				onEdit={handleEdit}
				onDelete={handleDelete}
				onDetail={handleDetail}
			/>

			<PaginationControl
				totalPages={totalPages}
				currentPage={currentPage}
				handleNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
				handlePrevious={() => setCurrentPage((p) => Math.max(1, p - 1))}
			/>

			{/* CREATE */}
			<ReservationModal
				isOpen={isAddOpen}
				onClose={() => setIsAddOpen(false)}
				onSave={(data) => {
					// Refresh data lengkap setelah tambah
					fetchReservations();
				}}
			/>

			{/* EDIT */}
			<EditReservationModal
				isOpen={isEditOpen}
				onClose={() => {
					setIsEditOpen(false);
					setSelected(null);
				}}
				onSave={(data) => {
					// Refresh data lengkap setelah update
					fetchReservations();
				}}
				initialData={
					selected
						? {
								id: selected.id,
								guestId: selected.guestId ?? "",
								roomId: selected.roomId,

								checkIn: selected.checkIn.split("T")[0],
								checkOut: selected.checkOut.split("T")[0],

								additionalGuests: selected.additionalGuests || [],

								status: selected.status as ReservationStatus,
								paymentStatus: selected.payment?.status as
									| PaymentStatus
									| undefined,
								paymentMethod: selected.payment?.method as
									| PaymentMethod
									| undefined,
								paymentSender: selected.payment?.sender || "",
							}
						: EMPTY_EDIT_FORM
				}
			/>

			{/* DETAIL */}
			<DetailReservation
				isOpen={isDetailOpen}
				onClose={() => {
					setIsDetailOpen(false);
					setSelected(null);
				}}
				reservation={selected}
			/>
		</div>
	);
}

/* ================= TABLE ================= */
interface ReservasiTableProps {
	reservations: Reservation[];
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
	onDetail: (id: string) => void;
}

function ReservasiTable({
	reservations,
	onEdit,
	onDelete,
	onDetail,
}: ReservasiTableProps) {
	return (
		<div className="w-full">
			<h1 className="text-xl font-bold mb-3">Reservasi</h1>
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
						{reservations.length > 0 ? (
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
										{res.totalPrice.toLocaleString("id-ID", {
											style: "currency",
											currency: "IDR",
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
									colSpan={11}
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

/* ================= DETAIL ================= */
interface DetailProps {
	isOpen: boolean;
	onClose: () => void;
	reservation: Reservation | null;
}

function DetailReservation({ isOpen, onClose, reservation }: DetailProps) {
	if (!isOpen || !reservation) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[101]">
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
						<p className="text-gray-500">Email</p>
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
						<p className="font-medium">{reservation.payment?.method || "-"}</p>
					</div>

					<div>
						<p className="text-gray-500">Status Pembayaran</p>
						<p className="font-medium">{reservation.payment?.status || "-"}</p>
					</div>

					<div>
						<p className="text-gray-500">Status Reservasi</p>
						<p className="font-medium">{reservation.status}</p>
					</div>

					<div>
						<p className="text-gray-500">Bukti Pembayaran</p>
						{reservation.payment?.proofUrl ? (
							<a
								href={reservation.payment.proofUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 underline"
							>
								Lihat Bukti
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
