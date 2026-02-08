"use client";

import { fetchGuests, Guest } from "@/fetching";
import { useEffect, useState } from "react";
import GuestFormModal from "@/components/buku-tamu/guestFormModal";
import { createGuest, updateGuest, deleteGuest } from "@/lib/guests";
import ActionButton from "@/components/ActionButton";
import { Pencil, Trash2 } from "lucide-react";

export default function Guests() {
	const [guests, setGuests] = useState<Guest[]>([]);
	const [loading, setLoading] = useState(true);
	const [openForm, setOpenForm] = useState(false);
	const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchGuests();
				setGuests(data);
			} catch (error) {
				console.error("Error fetching guests:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="max-w-7xl mx-auto px-6 py-6 space-y-6 mt-20">
			<GuestFormModal
				open={openForm}
				initialData={selectedGuest}
				onClose={() => setOpenForm(false)}
				onSubmit={async (data) => {
					if (selectedGuest) {
						const res = await updateGuest(selectedGuest.id, data);
						setGuests((prev) =>
							prev.map((g) => (g.id === selectedGuest.id ? res.data : g)),
						);
					} else {
						const res = await createGuest(data);
						setGuests((prev) => [...prev, res.data]);
					}
					setOpenForm(false);
				}}
			/>

			{/* HEADER */}
			<div className="flex justify-between items-center bg-white border border-stone-200 rounded-[32px] p-6 shadow-sm">
				<div>
					<h1 className="text-2xl font-bold text-stone-800">
						Manajemen Buku Tamu
					</h1>
					<p className="text-sm text-stone-500 mt-1">
						Daftar tamu yang terdaftar
					</p>
				</div>

				<button
					onClick={() => {
						setSelectedGuest(null);
						setOpenForm(true);
					}}
					className="px-4 py-2 rounded-xl bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition"
				>
					Tambah Tamu
				</button>
			</div>

			{/* TABLE */}
			<div className="bg-white border border-stone-200 rounded-[32px] shadow-sm overflow-hidden">
				{loading ? (
					<div className="p-10 text-center text-stone-400 text-sm">
						Memuat data tamu...
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead className="bg-stone-50 border-b border-stone-200">
								<tr className="text-stone-600 font-semibold">
									<th className="px-6 py-4 text-left">Nama</th>
									<th className="px-6 py-4 text-left">Email</th>
									<th className="px-6 py-4 text-left">Telepon</th>
									<th className="px-6 py-4 text-left">Passport</th>
									<th className="px-6 py-4 text-left">Gender</th>
									<th className="px-6 py-4 text-left">Aksi</th>
								</tr>
							</thead>

							<tbody>
								{guests.length > 0 ? (
									guests.map((guest) => (
										<tr
											key={guest.id}
											className="border-b last:border-none hover:bg-stone-50 transition"
										>
											<td className="px-6 py-4 font-semibold">{guest.name}</td>
											<td className="px-6 py-4">{guest.email || "-"}</td>
											<td className="px-6 py-4">{guest.phone}</td>
											<td className="px-6 py-4">{guest.passport}</td>
											<td className="px-6 py-4">{guest.gender}</td>
											<td>
												<div className="flex gap-2 justify-center">
													<ActionButton
														onClick={() => {
															setSelectedGuest(guest);
															setOpenForm(true);
														}}
														label="edit"
														icon={<Pencil size={16} />}
														variant="warning"
														tooltip={
															<>
																Edit Tamu{" "}
																<span className="font-bold">{guest.name}</span>
															</>
														}
													/>

													<ActionButton
														onClick={async () => {
															if (!confirm("Hapus Guest ini?")) return;
															await deleteGuest(guest.id);

															setGuests((prev) =>
																prev.filter((g) => g.id !== guest.id),
															);
														}}
														label="Hapus"
														icon={<Trash2 size={16} />}
														variant="danger"
														tooltip={
															<>
																Hapus Tamu{" "}
																<span className="font-bold">{guest.name}</span>
															</>
														}
													/>
												</div>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan={6}
											className="px-6 py-10 text-center text-stone-400"
										>
											Tidak ada data guest
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
