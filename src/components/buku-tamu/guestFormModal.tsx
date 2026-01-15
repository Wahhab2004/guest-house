"use client";

import { useEffect, useState } from "react";
import { Guest } from "@/fetching";
import Cookies from "js-cookie";

interface Props {
	open: boolean;
	initialData: Guest | null;
	onClose: () => void;
	onSubmit: (data: any) => void;
}

export default function GuestFormModal({
	open,
	initialData,
	onClose,
	onSubmit,
}: Props) {
	// 🔐 Detect role dari cookie (FE only)
	const user = Cookies.get("user");
	const parsedUser = user ? JSON.parse(user) : null;
	const isAdmin = parsedUser?.type === "admin";

	const [form, setForm] = useState({
		name: "",
		email: "",
		username: "",
		phone: "",
		passport: "",
		password: "", 
		gender: "Male",
		country: "",
		dateOfBirth: "",
	});

	useEffect(() => {
		if (initialData) {
			setForm({
				name: initialData.name,
				email: initialData.email || "",
				username: initialData.username,
				phone: initialData.phone,
				passport: initialData.passport,
				password: "", // ⛔ tidak auto-fill
				gender: initialData.gender,
				country: initialData.country || "",
				dateOfBirth: initialData.dateOfBirth || "",
			});
		} else {
			setForm({
				name: "",
				email: "",
				username: "",
				phone: "",
				passport: "",
				password: "",
				gender: "Male",
				country: "",
				dateOfBirth: "",
			});
		}
	}, [initialData, open]);

	if (!open) return null;

	const handleSubmit = () => {
		if (!initialData && !form.password) {
			alert("Password wajib diisi untuk guest baru");
			return;
		}

		if (form.password && form.password.length < 6) {
			alert("Password minimal 6 karakter");
			return;
		}

		const payload = {
			name: form.name,
			email: form.email,
			username: form.username,
			phone: form.phone,
			passport: form.passport,
			gender: form.gender,
			country: form.country,
			dateOfBirth: form.dateOfBirth,
			...(form.password ? { password: form.password } : {}),
		};

		onSubmit(payload);
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div className="relative w-full max-w-xl rounded-[28px] bg-white shadow-2xl border border-stone-200 overflow-hidden">
				{/* HEADER */}
				<div className="px-6 py-5 bg-gradient-to-r from-amber-500 to-amber-600">
					<h2 className="text-lg font-bold text-white">
						{initialData ? "Edit Guest" : "Tambah Guest"}
					</h2>
					<p className="text-sm text-amber-100">
						Lengkapi informasi tamu dengan benar
					</p>
				</div>

				{/* CONTENT */}
				<div className="p-6 space-y-5">
					<div className="grid grid-cols-2 gap-4">
						{/* NAME */}
						<Input
							label="Nama Lengkap"
							placeholder="John Doe"
							value={form.name}
							onChange={(v) => setForm({ ...form, name: v })}
						/>

						{/* EMAIL */}
						<Input
							label="Email"
							type="email"
							placeholder="email@example.com"
							value={form.email}
							onChange={(v) => setForm({ ...form, email: v })}
						/>

						{/* USERNAME */}
						<Input
							label="Username"
							placeholder="johndoe"
							value={form.username}
							onChange={(v) => setForm({ ...form, username: v })}
						/>

						{/* PHONE */}
						<Input
							label="No. Telepon"
							placeholder="+62..."
							value={form.phone}
							onChange={(v) => setForm({ ...form, phone: v })}
						/>

						{/* PASSPORT */}
						<Input
							label="Passport"
							placeholder="A12345678"
							value={form.passport}
							onChange={(v) => setForm({ ...form, passport: v })}
						/>

						{/* GENDER */}
						<div>
							<label className="block text-xs font-semibold text-stone-500 mb-1">
								Gender
							</label>
							<select
								className="input-ui"
								value={form.gender}
								onChange={(e) => setForm({ ...form, gender: e.target.value })}
							>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>
						</div>

						{/* PASSWORD – FE ONLY */}
						{!isAdmin && (
							<div className="col-span-2">
								<label className="block text-xs font-semibold text-stone-500 mb-1">
									Password{" "}
									{initialData && (
										<span className="text-stone-400">(opsional)</span>
									)}
								</label>
								<input
									type="password"
									className="input-ui"
									placeholder={
										initialData
											? "Kosongkan jika tidak diubah"
											: "Minimal 6 karakter"
									}
									value={form.password}
									onChange={(e) =>
										setForm({ ...form, password: e.target.value })
									}
								/>
							</div>
						)}

						{/* COUNTRY */}
						<Input
							label="Negara"
							placeholder="Indonesia"
							value={form.country}
							onChange={(v) => setForm({ ...form, country: v })}
							full
						/>

						{/* DOB */}
						<Input
							label="Tanggal Lahir"
							type="date"
							value={form.dateOfBirth}
							onChange={(v) => setForm({ ...form, dateOfBirth: v })}
							full
						/>
					</div>
				</div>

				{/* FOOTER */}
				<div className="flex justify-end gap-3 px-6 py-4 bg-stone-50 border-t border-stone-200">
					<button
						onClick={onClose}
						className="px-4 py-2 text-sm font-semibold rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100"
					>
						Batal
					</button>
					<button
						onClick={handleSubmit}
						className="px-5 py-2 text-sm font-semibold rounded-xl bg-amber-600 text-white hover:bg-amber-700 shadow-md"
					>
						Simpan
					</button>
				</div>
			</div>
		</div>
	);
}

interface InputProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	type?: string;
	full?: boolean;
}

function Input({
	label,
	value,
	onChange,
	placeholder,
	type = "text",
	full = false,
}: InputProps) {
	return (
		<div className={full ? "col-span-2" : ""}>
			<label className="block text-xs font-semibold text-stone-500 mb-1">
				{label}
			</label>
			<input
				type={type}
				className="input-ui"
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
}
