"use client";

import { Room } from "@/fetching";
import { useEffect, useState } from "react";
import { X, BedDouble, FileImage, JapaneseYenIcon } from "lucide-react";
import { toast } from "react-hot-toast";

interface Props {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: FormData) => void;
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
	});
	const [photoFile, setPhotoFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (initialData) {
			setForm({
				name: initialData.name,
				description: initialData.description,
				price: initialData.price,
				status: initialData.status,
			});

			// Kalau edit, tampilkan preview gambar lama
			if (initialData.photoUrl) {
				setPreviewUrl(initialData.photoUrl);
			}
		}
	}, [initialData]);

	if (!open) return null;

	const setErr = (msg: string) => {
		setError(msg);
		return false;
	};

	const validate = (): boolean => {
		if (!form.name.trim())
			return setErr("Nama kamar wajib diisi (min. 3 karakter).");
		if (form.price <= 0) return setErr("Harga kamar harus lebih dari 0.");
		// if (!form.description.trim()) return setErr("Deskripsi kamar wajib diisi.");

		setError(null);
		return true;
	};

	const handleSubmit = async () => {
		if (!validate()) return;
		setIsSubmitting(true);

		try {
			const fd = new FormData();
			fd.append("name", form.name);
			fd.append("description", form.description);
			fd.append("price", String(form.price));
			fd.append("status", form.status);

			if (photoFile) {
				fd.append("photoUrl", photoFile); // ⬅️ backend terima field "photo"
			}

			onSubmit(fd);
			// toast.success("Kamar berhasil disimpan.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="fixed inset-0 z-[101] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
			<div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[32px] shadow-2xl animate-in fade-in zoom-in duration-300">
				{/* Header */}
				<div className="bg-gradient-to-r from-orange-400 to-amber-500 p-6 rounded-t-[32px] flex items-center justify-between">
					<div>
						<h2 className="text-xl font-bold text-white">
							{initialData ? "Edit Kamar" : "Tambah Kamar"}
						</h2>
						<p className="text-white/80 text-sm">
							Lengkapi informasi kamar dan unggah foto
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
					{/* Nama & Harga */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="label flex items-center gap-1">
								<BedDouble size={14} /> Nama Kamar
							</label>
							<input
								placeholder="Contoh: Deluxe Room"
								value={form.name}
								onChange={(e) => setForm({ ...form, name: e.target.value })}
								className="input w-full"
							/>

							{error && <p className="text-xs text-red-500 mt-1">{error}</p>}
						</div>

						<div>
							<label className="label flex items-center gap-1">
								<JapaneseYenIcon size={14} /> Harga / Malam
							</label>
							<input
								type="number"
								placeholder="Contoh: 350000"
								value={form.price}
								onChange={(e) =>
									setForm({
										...form,
										price: Number(e.target.value),
									})
								}
								className="input w-full"
							/>
							{error && <p className="text-xs text-red-500 mt-1">{error}</p>}
						</div>
					</div>

					{/* Deskripsi */}
					<div>
						<label className="label">Deskripsi</label>
						<textarea
							placeholder="Fasilitas kamar, kapasitas, dll"
							value={form.description}
							onChange={(e) =>
								setForm({
									...form,
									description: e.target.value,
								})
							}
							className="input w-full min-h-[90px]"
						/>
					</div>

					{/* Status */}
					<div>
						<label className="label">Status Kamar</label>
						<select
							value={form.status}
							onChange={(e) =>
								setForm({
									...form,
									status: e.target.value,
								})
							}
							className="input w-full"
						>
							<option value="AVAILABLE">AVAILABLE (Tersedia)</option>
							<option value="BOOKED">BOOKED (Dipesan)</option>
							<option value="OVERNIGHT">OVERNIGHT (Menginap)</option>
						</select>
					</div>

					{/* Upload Foto */}
					<div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
						<label className="label flex items-center gap-1">
							<FileImage size={14} /> Foto Kamar
						</label>
						<p className="text-xs text-slate-500">
							Unggah foto kamar (JPG/PNG, max 10MB). Akan ditampilkan di halaman
							tamu.
						</p>

						<input
							type="file"
							accept="image/*"
							onChange={(e) => {
								const file = e.target.files?.[0] || null;
								setPhotoFile(file);

								if (file) {
									const url = URL.createObjectURL(file);
									setPreviewUrl(url);
								}
							}}
							className="block w-full text-sm file:mr-4 file:py-2 file:px-4
							file:rounded-xl file:border-0
							file:bg-orange-100 file:text-orange-700
							hover:file:bg-orange-200 transition"
						/>

						{/* Preview */}
						{previewUrl && (
							<div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
								<img
									src={previewUrl}
									alt="Preview Kamar"
									className="w-full h-full object-cover"
								/>
								<button
									type="button"
									onClick={() => {
										setPhotoFile(null);
										setPreviewUrl(null);
									}}
									className="absolute top-2 right-2 bg-black/60 text-white rounded-full px-2 py-1 text-xs hover:bg-black/80 transition"
								>
									Hapus
								</button>
							</div>
						)}
					</div>
				</div>

				{/* Footer */}
				<div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-[32px]">
					<button
						onClick={onClose}
						className="px-5 py-2 rounded-xl border border-slate-300 font-semibold text-slate-600 hover:bg-slate-100 transition"
					>
						Batal
					</button>
					<button
						onClick={handleSubmit}
						disabled={isSubmitting}
						className="px-6 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow hover:shadow-lg transition disabled:opacity-50"
					>
						{isSubmitting ? "Menyimpan..." : "Simpan"}
					</button>
				</div>
			</div>
		</div>
	);
}
