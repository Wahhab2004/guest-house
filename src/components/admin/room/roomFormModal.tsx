"use client";

import { Room } from "@/fetching";
import { useEffect, useState } from "react";

interface Props {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: Omit<Room, "id">) => void;
	initialData?: Room | null;
}

export default function RoomFormModal({
	open,
	onClose,
	onSubmit,
	initialData,
}: Props) {
	const [form, setForm] = useState({
		name: "",
		description: "",
		price: 0,
		status: "AVAILABLE",
		photoUrl: "",
	});

	useEffect(() => {
		if (initialData) {
			setForm({
				name: initialData.name,
				description: initialData.description,
				price: initialData.price,
				status: initialData.status,
				photoUrl: initialData.photoUrl,
			});
		}
	}, [initialData]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black/40 z-[101] flex items-center justify-center">
			<div className="bg-white rounded-3xl p-6 w-full max-w-lg space-y-4">
				<h2 className="text-xl font-bold text-stone-800">
					{initialData ? "Edit Kamar" : "Tambah Kamar"}
				</h2>

				<input
					placeholder="Nama kamar"
					value={form.name}
					onChange={(e) => setForm({ ...form, name: e.target.value })}
					className="w-full border rounded-xl px-3 py-2"
				/>

				<textarea
					placeholder="Deskripsi"
					value={form.description}
					onChange={(e) =>
						setForm({ ...form, description: e.target.value })
					}
					className="w-full border rounded-xl px-3 py-2"
				/>

				<input
					type="number"
					placeholder="Harga"
					value={form.price}
					onChange={(e) =>
						setForm({ ...form, price: Number(e.target.value) })
					}
					className="w-full border rounded-xl px-3 py-2"
				/>

				<select
					value={form.status}
					onChange={(e) =>
						setForm({ ...form, status: e.target.value })
					}
					className="w-full border rounded-xl px-3 py-2"
				>
					<option value="AVAILABLE">AVAILABLE</option>
					<option value="BOOKED">BOOKED</option>
				</select>

				<input
					placeholder="Photo URL"
					value={form.photoUrl}
					onChange={(e) =>
						setForm({ ...form, photoUrl: e.target.value })
					}
					className="w-full border rounded-xl px-3 py-2"
				/>

				<div className="flex justify-end gap-2 pt-2">
					<button
						onClick={onClose}
						className="px-4 py-2 rounded-xl bg-stone-100"
					>
						Batal
					</button>
					<button
						onClick={() => onSubmit(form)}
						className="px-4 py-2 rounded-xl bg-amber-600 text-white"
					>
						Simpan
					</button>
				</div>
			</div>
		</div>
	);
}
 