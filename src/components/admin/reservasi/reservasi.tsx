// pages/UserPage.tsx
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
	const [reservations, setReservation] = useState<Reservation[]>([]);
	const [filteredReservations, setFilteredReservation] = useState<
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
	const [status, setStatus] = useState("");
	const [sortBy, setSortBy] = useState("");
	const [order, setOrder] = useState("desc");
	const [paymentStatus, setPaymentStatus] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [searchType, setSearchType] = useState("guestName");
	const [showFilter, setShowFilter] = useState(false);

	const [isAddOpen, setIsAddOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isDetailOpen, setIsDetailOpen] = useState(false);

	const [selectedReservationId, setSelectedReservationId] = useState<
		string | null
	>(null);

	const fetchReservations = useCallback(async () => {
		try {
			const cookies = document.cookie.split("; ");
			const tokenCookie = cookies.find((row) => row.startsWith("token="));
			const tokenValue = tokenCookie?.split("=")[1] || null;
			setToken(tokenValue);

			const params = new URLSearchParams({
				status,
				paymentStatus,
				startDate,
				endDate,
				guestName: searchType === "guestName" ? search : "", // search digunakan untuk guestName
				roomName: searchType === "roomName" ? search : "",
				order,
				sortBy,
			});

			const res = await fetch(
				`${
					process.env.NEXT_PUBLIC_API_BASE_URL
				}/reservations?${params.toString()}`,
				{
					headers: {
						Authorization: tokenValue ? `Bearer ${tokenValue}` : "",
					},
					cache: "no-store",
				}
			);

			if (!res.ok) throw new Error("Failed to fetch reservations");
			const json = await res.json();

			setReservation(json.data);
			setFilteredReservation(json.data);
		} catch (error) {
			console.error("Error fetching reservations:", error);
		}
	}, [status, paymentStatus, startDate, endDate, search, order, sortBy, searchType]);

	useEffect(() => {
		fetchReservations();
	}, [fetchReservations]);

	const getPaginatedData = () => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return filteredReservations?.slice(startIndex, endIndex);
	};

	const totalPages = Math.ceil(filteredReservations?.length / itemsPerPage);

	const handleNext = () =>
		currentPage < totalPages && setCurrentPage(currentPage + 1);
	const handlePrevious = () =>
		currentPage > 1 && setCurrentPage(currentPage - 1);

	const handleOpenAddModal = () => setIsAddOpen(true);

	// handle open edit
	const handleOpenEditModal = (id: string) => {
		const reservationToEdit = reservations.find((res) => res.id === id);
		if (reservationToEdit) {
			setEditReservation(reservationToEdit);
			setSelectedReservationId(id);
			setIsEditOpen(true);
		}
	};

	const handleCloseEditModal = () => {
		setIsEditOpen(false);
		setSelectedReservationId(null);
		setEditReservation(null);
	};

	// handle open detail
	const handleOpenDetailModal = (id: string) => {
		setSelectedReservationId(id);
		setIsDetailOpen(true);
	};

	const handleCloseDetailModal = () => {
		setIsDetailOpen(false);
		setSelectedReservationId(null);
	};

	const handleCloseAddModal = () => setIsAddOpen(false);

	useEffect(() => {
		if (selectedReservationId) {
			const found = reservations.find((r) => r.id === selectedReservationId);
			setDetailReservation(found || null);
		}
	}, [selectedReservationId, reservations]);

	const handleSave = (data: Reservation) => {
		if (selectedReservationId) {
			const updatedReservations = reservations.map((res) => {
				if (res.id === selectedReservationId) {
					return data;
				}
				return res;
			});
			setReservation(updatedReservations);
			setFilteredReservation(updatedReservations);
			setIsEditOpen(false);
			setSelectedReservationId(null);
		}
	};

	const handleDeleteReservation = async (id: string) => {
		try {
			const token = Cookies.get("token"); // Ambil token dari cookie

			if (!token) {
				console.error("Token tidak tersedia.");
				return;
			}

			const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
			const response = await fetch(`${baseUrl}/reservations/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.message || "Gagal menghapus reservasi");
			}

			setReservation((prev) => prev.filter((res) => res.id !== id));
			setFilteredReservation((prev) => prev.filter((res) => res.id !== id));
		} catch (error) {
			console.error("Error deleting reservation:", error);
		}
	};
	const resetFilters = () => {
		setSearch("");
		setStatus("");
		setPaymentStatus("");
		setSortBy("createdAt");
		setOrder("desc");
		setItemsPerPage(5);
		setStartDate("");
		setEndDate("");
	};
	return (
		<div className="px-6">
			<div className="flex justify-between items-center xl:px-0 2xl:px-7 mb-4 py-2">
				<div className="w-full bg-white rounded-xl shadow p-6 flex flex-col gap-6">
					{/* Header */}
					<div className="flex justify-between items-center">
						<h2 className="text-lg font-bold text-gray-700">Reservasi</h2>
						<div className="flex gap-2">
							<button
								onClick={() => setShowFilter((prev) => !prev)}
								className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
							>
								{showFilter ? "Tutup Filter" : "Filter"}
							</button>
							{showFilter && (
								<button
									onClick={resetFilters}
									className="text-xs px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-gray-600"
								>
									Reset
								</button>
							)}
						</div>
					</div>

					{/* Filter Section */}
					{showFilter && (
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 text-sm transition-all duration-300">
							{/* Search Type */}
							<select
								value={searchType}
								onChange={(e) => setSearchType(e.target.value)}
								className="border rounded px-2 py-2"
							>
								<option value="guestName">Nama Tamu</option>
								<option value="roomName">Nama Kamar</option>
							</select>

							{/* Search Input */}
							<input
								type="text"
								placeholder={`Cari berdasarkan ${
									searchType === "guestName" ? "Nama Tamu" : "Nama Kamar"
								}...`}
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="border rounded px-3 py-2"
							/>

							{/* Status Reservasi */}
							<div className="flex flex-col">
								<label className="text-gray-600 text-xs font-semibold mb-1">
									Status Reservasi
								</label>
								<select
									value={status}
									onChange={(e) => setStatus(e.target.value)}
									className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
								>
									<option value="">Semua Status</option>
									<option value="CONFIRMED">✅ Disetujui</option>
									<option value="PENDING">⏳ Pending</option>
									<option value="CANCELED">❌ Dibatalkan</option>
									<option value="CHECKED_OUT">🏁 Selesai</option>
								</select>
							</div>

							{/* Status Pembayaran */}
							<div className="flex flex-col">
								<label className="text-gray-600 text-xs font-semibold mb-1">
									Status Pembayaran
								</label>
								<select
									value={paymentStatus}
									onChange={(e) => setPaymentStatus(e.target.value)}
									className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
								>
									<option value="">Semua</option>
									<option value="PAID">💰 Lunas</option>
									<option value="UNPAID">💸 Belum Lunas</option>
									<option value="REFUND">🔄 Refund</option>
								</select>
							</div>

							{/* Tanggal Booking */}
							<div className="flex flex-col">
								<label className="text-gray-600 text-xs font-semibold mb-1">
									Tanggal Booking
								</label>
								<div className="flex gap-1">
									<input
										type="date"
										value={startDate}
										onChange={(e) => setStartDate(e.target.value)}
										className="border px-2 py-2 rounded-lg w-full"
									/>
									<span className="text-gray-500 self-center">-</span>
									<input
										type="date"
										value={endDate}
										onChange={(e) => setEndDate(e.target.value)}
										className="border px-2 py-2 rounded-lg w-full"
									/>
								</div>
							</div>

							{/* Urutkan */}
							<div className="flex flex-col">
								<label className="text-gray-600 text-xs font-semibold mb-1">
									Urutkan
								</label>
								<div className="flex gap-1">
									<select
										value={sortBy}
										onChange={(e) => setSortBy(e.target.value)}
										className="border px-2 py-2 rounded-l-lg"
									>
										<option value="createdAt">📅 Waktu Booking</option>
										<option value="checkIn">🏨 Tanggal Check-In</option>
									</select>
									<select
										value={order}
										onChange={(e) => setOrder(e.target.value)}
										className="border px-2 py-2 rounded-r-lg"
									>
										<option value="desc">⬆ Terbaru</option>
										<option value="asc">⬇ Terdahulu</option>
									</select>
								</div>
							</div>

							{/* Items Per Page */}
							<div className="flex flex-col">
								<label className="text-gray-600 text-xs font-semibold mb-1">
									Tampilkan
								</label>
								<select
									value={itemsPerPage.toString()}
									onChange={(e) => setItemsPerPage(Number(e.target.value))}
									className="border px-3 py-2 rounded-lg"
								>
									<option value="5">5</option>
									<option value="10">10</option>
									<option value="15">15</option>
									<option value="30">30</option>
								</select>
							</div>
						</div>
					)}
				</div>

				<div className="flex gap-2">
					{/* Add */}
					<button
						onClick={handleOpenAddModal}
						className="bg-blue-500 text-white px-4 py-2 rounded text-[10px] xl:mr-4 xl:text-sm"
					>
						Tambah
					</button>
				</div>
			</div>

			<AddReservation
				isOpen={isAddOpen}
				onClose={handleCloseAddModal}
				onSave={handleSave}
				token={token}
			/>
			<EditReservation
				isOpen={isEditOpen}
				onClose={handleCloseEditModal}
				reservation={editReservation}
				onUpdate={handleSave}
				token={token}
			/>
			<ReservasiTable
				reservations={getPaginatedData()}
				onEdit={handleOpenEditModal}
				onDelete={handleDeleteReservation}
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
				onDetail={handleOpenDetailModal}
			/>
			<DetailReservation
				isOpen={isDetailOpen}
				onClose={handleCloseDetailModal}
				reservation={detailReservation}
			/>
			<PaginationControl
				totalPages={totalPages}
				currentPage={currentPage}
				handleNext={handleNext}
				handlePrevious={handlePrevious}
			/>
		</div>
	);
}

interface ReservasiTableProps {
	reservations: Reservation[];
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
	currentPage: number;
	itemsPerPage: number;
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
										<Badge type={res.Payment?.method}>
											{res.Payment?.method}
										</Badge>
									</td>
									<td className="px-4 py-3">
										<Badge type={res.status}>{res.status}</Badge>
									</td>
									<td className="px-4 py-3">
										<Badge type={res.Payment?.status}>
											{res.Payment?.status}
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
												label="Detail"
												onClick={() => onDetail(res.id)}
												icon="👁️"
											/>
											<ActionButton
												color="amber"
												label="Edit"
												onClick={() => onEdit(res.id)}
												icon="✏️"
											/>
											<ActionButton
												color="red"
												label="Hapus"
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
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
						<p className="font-medium">{reservation.Payment?.method}</p>
					</div>

					<div>
						<p className="text-gray-500">Status Pembayaran</p>
						<span
							className={`px-2 py-1 text-xs rounded-full font-semibold ${
								reservation.Payment?.status === "paid"
									? "bg-green-100 text-green-700"
									: "bg-red-100 text-red-700"
							}`}
						>
							{reservation.Payment?.status === "paid" ? "Lunas" : "Belum Lunas"}
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

						{reservation.Payment?.proofUrl ? (
							<a
								href={"http://localhost:5000" + reservation.Payment?.proofUrl}
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
