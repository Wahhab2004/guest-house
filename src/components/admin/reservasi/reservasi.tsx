"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Reservation } from "@/fetching";
import formatDateIndo from "../../format-tanggal/formatTanggal";
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
import {
	X,
	Image as ImageIcon,
	CreditCard,
	User,
	BedDouble,
	Calendar,
} from "lucide-react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

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

	const handleDelete = async (reservation: { id: string; status: string }) => {
		try {
			// 🚫 Block kalau status ACTIVE
			if (reservation.status === "ACTIVE") {
				toast.error(
					"Reservasi aktif tidak bisa dihapus. Silakan check-out dulu.",
				);
				return;
			}

			// ❓ Konfirmasi user
			const confirmed = window.confirm(
				"Apakah kamu yakin ingin menghapus reservasi ini?\nTindakan ini tidak bisa dibatalkan.",
			);

			if (!confirmed) return;

			const token = Cookies.get("token");

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/reservations/${reservation.id}`,
				{
					method: "DELETE",
					headers: token ? { Authorization: `Bearer ${token}` } : {},
				},
			);

			if (!res.ok) {
				const result = await res.json();
				throw new Error(result.message || "Gagal menghapus reservasi");
			}

			// ✅ Update state lokal
			setReservations((prev) => prev.filter((r) => r.id !== reservation.id));

			toast.success("Reservasi berhasil dihapus");
		} catch (err: any) {
			console.error("Delete reservation failed:", err);
			toast.error(err.message || "Gagal menghapus reservasi");
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
	onDelete: (reservation: { id: string; status: string }) => void;
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
												onClick={() => onDelete({ id: res.id, status: res.status })}
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
const getProofUrl = (url?: string | null) => {
	if (!url) return null;

	// Kalau sudah full URL, pakai langsung
	if (url.startsWith("http")) return url;

	// Kalau masih relative, gabungkan dengan API base URL
	const base = "http://localhost:5000";
	return `${base}${url}`;
};

interface DetailProps {
	isOpen: boolean;
	onClose: () => void;
	reservation: any;
}

function DetailReservation({ isOpen, onClose, reservation }: DetailProps) {
	const [showImageModal, setShowImageModal] = useState(false);

	if (!isOpen || !reservation) return null;

	const proofUrl = getProofUrl(reservation.payment?.proofUrl);

	return (
		<>
			{/* MAIN MODAL */}
			<div className="fixed inset-0 z-[101] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
				<div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[32px] shadow-2xl animate-in fade-in zoom-in duration-300">
					{/* Header */}
					<div className="bg-gradient-to-r from-orange-400 to-amber-500 p-6 rounded-t-[32px] flex items-center justify-between">
						<div>
							<h2 className="text-xl font-bold text-white">Detail Reservasi</h2>
							<p className="text-white/80 text-sm">
								Informasi lengkap tamu & pembayaran
							</p>
						</div>
						<button
							onClick={onClose}
							className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition"
						>
							<X size={20} />
						</button>
					</div>

					{/* Body */}
					<div className="p-6 space-y-6 text-sm text-slate-700">
						{/* Info Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<DetailItem
								icon={<User size={14} />}
								label="Nama Tamu"
								value={reservation.guest?.name}
							/>
							<DetailItem
								icon={<User size={14} />}
								label="Email"
								value={reservation.guest?.email}
							/>
							<DetailItem
								icon={<User size={14} />}
								label="Nomor HP"
								value={reservation.guest?.phone}
							/>
							<DetailItem
								icon={<BedDouble size={14} />}
								label="Kamar"
								value={reservation.room?.name}
							/>

							<DetailItem
								icon={<Calendar size={14} />}
								label="Check-In"
								value={formatDateIndo(reservation.checkIn)}
							/>
							<DetailItem
								icon={<Calendar size={14} />}
								label="Check-Out"
								value={formatDateIndo(reservation.checkOut)}
							/>

							<DetailItem
								icon={<User size={14} />}
								label="Jumlah Tamu"
								value={`${reservation.guestTotal} orang`}
							/>

							<DetailItem
								icon={<CreditCard size={14} />}
								label="Metode Pembayaran"
								value={reservation.payment?.method}
							/>

							<DetailItem
								icon={<CreditCard size={14} />}
								label="Status Pembayaran"
								value={reservation.payment?.status}
							/>

							<DetailItem
								icon={<CreditCard size={14} />}
								label="Status Reservasi"
								value={reservation.status}
							/>

							<DetailItem
								icon={<User size={14} />}
								label="Nama Pengirim"
								value={reservation.payment?.sender}
							/>
						</div>

						{/* Bukti Pembayaran */}
						<div className="space-y-2">
							<p className="label flex items-center gap-1">
								<ImageIcon size={14} /> Bukti Pembayaran
							</p>

							{proofUrl ? (
								<div
									className="relative w-44 h-44 rounded-2xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer group"
									onClick={() => setShowImageModal(true)}
								>
									<img
										src={proofUrl}
										alt="Bukti Pembayaran"
										className="w-full h-full object-cover group-hover:scale-105 transition-transform"
									/>
									<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-semibold">
										Klik untuk perbesar
									</div>
								</div>
							) : (
								<p className="italic text-slate-400">Tidak tersedia</p>
							)}
						</div>

						{/* Total */}
						<div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex justify-between items-center">
							<p className="font-semibold text-slate-600">Total Pembayaran</p>
							<p className="text-xl font-bold text-orange-500">
								{reservation.totalPrice.toLocaleString("jp-JP", {
									style: "currency",
									currency: "JPY",
								})}
							</p>
						</div>
					</div>

					{/* Footer */}
					<div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-[32px]">
						<button
							onClick={onClose}
							className="px-5 py-2 rounded-xl border border-slate-300 font-semibold text-slate-600 hover:bg-slate-100 transition"
						>
							Tutup
						</button>
					</div>
				</div>
			</div>

			{/* IMAGE MODAL (ZOOM) */}
			{showImageModal && proofUrl && (
				<div
					className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
					onClick={() => setShowImageModal(false)}
				>
					<div
						className="relative max-w-4xl max-h-[90vh]"
						onClick={(e) => e.stopPropagation()}
					>
						<img
							src={proofUrl}
							alt="Preview Bukti Pembayaran"
							className="max-h-[90vh] rounded-[32px] shadow-2xl"
						/>

						<button
							onClick={() => setShowImageModal(false)}
							className="absolute top-3 right-3 p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition"
						>
							<X size={18} />
						</button>
					</div>
				</div>
			)}
		</>
	);
}

/* ================= SMALL COMPONENT ================= */
function DetailItem({
	label,
	value,
	icon,
}: {
	label: string;
	value?: string;
	icon?: React.ReactNode;
}) {
	return (
		<div className="space-y-1">
			<p className="text-slate-500 text-xs flex items-center gap-1">
				{icon} {label}
			</p>
			<p className="font-semibold text-slate-800">{value || "-"}</p>
		</div>
	);
}
