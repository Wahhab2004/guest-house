"use client";

import { useEffect, useState } from "react";
import { Guest } from "@/fetching";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

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
	const [errors, setErrors] = useState<Record<string, string>>({});

	const setField = (field: string, value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }));
		setErrors((prev) => ({ ...prev, [field]: "" }));
	};

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

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		// NAME
		if (!form.name || form.name.trim().length < 3) {
			newErrors.name = "Nama minimal 3 karakter";
		}

		// EMAIL (non-admin only)
		if (!isAdmin) {
			if (!form.email) {
				newErrors.email = "Email wajib diisi";
			} else {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(form.email)) {
					newErrors.email = "Format email tidak valid";
				}
			}
		}

		// PHONE
		if (!form.phone || form.phone.length < 8) {
			newErrors.phone = "No. telepon minimal 8 karakter";
		}

		// PASSWORD
		if (!initialData && !isAdmin && !form.password) {
			newErrors.password = "Password wajib diisi untuk guest baru";
		}

		if (form.password && form.password.length < 6) {
			newErrors.password = "Password minimal 6 karakter";
		}

		// GENDER
		if (!["Male", "Female"].includes(form.gender)) {
			newErrors.gender = "Gender harus Male atau Female";
		}

		// PASSPORT
		if (!form.passport) {
			newErrors.passport = "Nomor passport wajib diisi";
		} else if (form.passport.length < 5) {
			newErrors.passport = "Nomor passport minimal 5 karakter";
		}

		// COUNTRY
		if (form.country && form.country.length < 2) {
			newErrors.country = "Nama negara minimal 2 karakter";
		}

		// DOB
		if (form.dateOfBirth) {
			if (isNaN(Date.parse(form.dateOfBirth))) {
				newErrors.dateOfBirth = "Format tanggal tidak valid";
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = () => {
		if (!validateForm()) return;

		const payload = {
			name: form.name.trim(),
			email: isAdmin ? null : form.email,
			username: form.username || undefined,
			phone: form.phone,
			passport: form.passport,
			gender: form.gender,
			country: form.country || undefined,
			dateOfBirth: form.dateOfBirth || undefined,
			...(form.password ? { password: form.password } : {}),
		};

		onSubmit(payload);
		toast.success("Data tamu berhasil disimpan");
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
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
							error={errors.name}
						/>

						{/* EMAIL */}
						<Input
							label="Email"
							type="email"
							placeholder="email@example.com"
							value={form.email}
							onChange={(v) => setForm({ ...form, email: v })}
							error={errors.email}
						/>

						{/* USERNAME */}
						<Input
							label="Username"
							placeholder="johndoe"
							value={form.username}
							onChange={(v) => setForm({ ...form, username: v })}
							error={errors.username}
						/>

						{/* PHONE */}
						<Input
							label="No. Telepon"
							placeholder="+62..."
							value={form.phone}
							onChange={(v) => setForm({ ...form, phone: v })}
							error={errors.phone}
						/>

						{/* PASSPORT */}
						<Input
							label="Passport"
							placeholder="A12345678"
							value={form.passport}
							onChange={(v) => setForm({ ...form, passport: v })}
							error={errors.passport}
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
							{errors.gender && (
								<p className="text-xs text-red-500 mt-1 animate-pulse">
									{errors.gender}
								</p>
							)}
						</div>

						<Input
							label="Password"
							placeholder="Minimal 6 karakter"
							value={form.password}
							onChange={(v) => setForm({ ...form, password: v })}
							type="password"
							error={errors.password}
						/>

						{/* PASSWORD – FE ONLY
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
						)} */}

						{/* COUNTRY */}
						<Input
							label="Negara"
							placeholder="Indonesia"
							value={form.country}
							onChange={(v) => setForm({ ...form, country: v })}
							error={errors.country}
							// full
						/>

						{/* DOB */}
						<Input
							label="Tanggal Lahir"
							type="date"
							value={form.dateOfBirth}
							onChange={(v) => setForm({ ...form, dateOfBirth: v })}
							error={errors.dateOfBirth}
							// full
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
	error?: string;
}

function Input({
	label,
	value,
	onChange,
	placeholder,
	type = "text",
	full = false,
	error,
}: InputProps) {
	return (
		<div className={full ? "col-span-2" : ""}>
			<label className="block text-xs font-semibold text-stone-500 mb-1">
				{label}
			</label>

			<input
				type={type}
				className={`input-ui ${
					error ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""
				}`}
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>

			{error && (
				<p className="text-xs text-red-500 mt-1">{error}</p>
			)}
		</div>
	);
}
