// pages/UserPage.tsx
import { useCallback, useEffect, useState } from "react";
import PaginationControl from "../guest-reservation/PaginationControl";
import { fetchFilteredReservations, type Reservation } from "@/fetching";
import formatDateIndo from "../../format-tanggal/formatTanggal";
import EditReservation from "./editReservasi";
import AddReservation from "./addReservasi";
import Cookies from "js-cookie";

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

			const data = await fetchFilteredReservations(
				
				
			);

			setReservation(data);
			setFilteredReservation(data);
		} catch (error) {
			console.error("Error fetching reservations:", error);
		}
	}, [search, status, sortBy, order]);

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

	return (
		<div className="overflow-y-auto w-[80%] xl:w-[85%]">
			<div className="flex justify-between items-center px-8 xl:px-0 2xl:px-7 mb-4 py-2">
				{/* Filter & Search, Sort, Order, Atur Halaman */}
				<div className="flex items-center">
					<div className="flex flex-wrap gap-2 xl:gap-4 xl:px-5 text-[10px] xl:text-sm">
						<input
							type="text"
							placeholder="Cari reservasi..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="border px-3 py-2 rounded"
						/>

						<select
							value={status}
							onChange={(e) => setStatus(e.target.value)}
							className="border px-3 py-2 rounded"
						>
							<option value="">Semua Status</option>
							<option value="accepted">Disetujui</option>
							<option value="pending">Pending</option>
							<option value="rejected">Rejected</option>
						</select>

						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="border px-3 py-2 rounded"
						>
							<option value="created_at">Waktu Booking</option>
							<option value="event_date">Tanggal Acara</option>
						</select>

						<select
							value={order}
							onChange={(e) => setOrder(e.target.value)}
							className="border px-3 py-2 rounded"
						>
							<option value="" disabled>
								Pilih Urutan
							</option>
							<option value="desc">Terbaru</option>
							<option value="asc">Terdahulu</option>
						</select>
					</div>
					{/* Pagination */}
					<div className="flex items-center">
						<select
							value={itemsPerPage.toString()}
							onChange={(e) => setItemsPerPage(Number(e.target.value))}
							className="border px-3 py-1.5 rounded w-16"
						>
							<option value="" disabled>
								Pilih Tampilan
							</option>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="15">15</option>
							<option value="30">30</option>
						</select>
					</div>
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
		<div className="ml-5 max-w-[1800px] border shadow rounded-lg p-4 ">
			<table className="w-full text-left mt-2 tracking-wide">
				<thead>
					<tr>
						{[
							"#",
							"NAMA TAMU",
							"NAMA KAMAR",
							"TANGGAL RESERVASI",
							"WAKTU/LAMA RESERVASI",
							"JUMLAH TAMU",
							"METODE PEMBAYARAN",

							"STATUS",
							"PEMBAYARAN",
							"HARGA",
							"AKSI",
						].map((header, idx) => (
							<th
								key={idx}
								className="text-[#5D6679] text-[8px] xl:text-[10px] pr-2"
							>
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
								className="text-gray-700 text-[14px] xs:text-[12px] border-b"
							>
								<td className="py-4">{index + 1}</td>
								<td className="py-4">{res.guest?.name}</td>
								<td className="py-4">{res.room?.name}</td>
								<td className="py-4">{formatDateIndo(res.createdAt)}</td>
								<td className="py-4">
									{formatDateIndo(res.checkIn)} - {formatDateIndo(res.checkOut)}
								</td>

								<td className="py-4">{res.guestTotal}</td>

								<td className="py-4 text-xs">
									{res.Payment?.method === "TRANSFER" ? (
										<span className="text-yellow-900 bg-yellow-100 p-1 border border-yellow-200 rounded-lg px-2">
											{res.Payment?.method}
										</span>
									) : res.Payment?.method === "CASH" ? (
										<span className="text-green-900 bg-green-100 p-1 border border-green-200 rounded-lg px-2">
											{res.Payment?.method}
										</span>
									) : (
										<span className="text-pink-900 bg-red-100 p-1 border border-red-200 rounded-lg px-2">
											{res.Payment?.method}
										</span>
									)}
								</td>

								<td className="py-4 text-xs">
									{res.status === "PENDING" ? (
										<span className="text-yellow-900 bg-yellow-100 p-1 border border-yellow-200 rounded-lg px-2">
											{res.status}
										</span>
									) : res.status === "CONFIRMED" ? (
										<span className="text-green-900 bg-green-100 p-1 border border-green-200 rounded-lg px-2">
											{res.status}
										</span>
									) : res.status === "CANCELLED" ? (
										<span className="text-red-900 bg-red-100 p-1 border border-red-200 rounded-lg px-2">
											{res.status}
										</span>
									) : (
										<span>{res.status}</span>
									)}
								</td>
								<td className="py-4 text-xs">
									{res.Payment?.status === "PAID" ? (
										<span className="text-green-900 bg-green-100 p-1 border-green-200 border rounded-lg px-2">
											{res.Payment?.status}
										</span>
									) : res.Payment?.status === "HALF_PAID" ? (
										<span className="text-orange-900 bg-orange-100 p-1 border-orange-200 border rounded-lg px-2">
											{res.Payment?.status}
										</span>
									) : res.Payment?.status === "UNPAID" ? (
										<span className="text-red-900 bg-red-100 border border-yellow-200 rounded-lg p-1  px-2">
											{res.Payment?.status}
										</span>
									) : (
										<span>{res.Payment?.status}</span>
									)}
								</td>

								<td className="py-4">
									{res.totalPrice.toLocaleString("id-ID", {
										style: "currency",
										currency: "IDR",
									})}
								</td>

								<td className="flex gap-1 py-4 text-[12px]">
									<button
										onClick={() => onDetail(res.id)}
										className="bg-blue-500 text-white p-1 rounded"
									>
										Detail
									</button>
									<button
										onClick={() => onEdit(res.id)}
										className="bg-yellow-500 text-white p-1 rounded"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="size-6 w-4 h-4"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
											/>
										</svg>
									</button>

									<button
										onClick={() => onDelete(res.id)}
										className="bg-red-500 text-white p-1 rounded"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="size-6 w-4 h-4"
										>
											<path
												fill="none"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M6 7h12M9 7v10m6-10v10M4 7h16l-1 12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 7zM10 3h4a1 1 0 0 1 1 1v1H9V4a1 1 0 0 1 1-1z"
											/>
										</svg>
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={12} className="p-4 text-center text-gray-500">
								Tidak ada data reservasi.
							</td>
						</tr>
					)}
				</tbody>
			</table>
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
						<p className="font-medium">{reservation.totalPrice.toLocaleString("id-ID", {
										style: "currency",
										currency: "IDR",
									})}</p>
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
