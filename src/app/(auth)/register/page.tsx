"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
	User,
	Mail,
	Lock,
	Phone,
	Globe,
	Calendar,
	CreditCard,
	Eye,
	EyeOff,
} from "lucide-react";

const BRAND_GRADIENT = "bg-gradient-to-r from-amber-500 to-amber-600";

export default function Register() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
		phone: "",
		passport: "",
		dateOfBirth: "",
		country: "",
		gender: "",
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const router = useRouter();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		setLoading(true);

		const {
			name,
			email,
			username,
			password,
			confirmPassword,
			phone,
			passport,
			dateOfBirth,
			country,
			gender,
		} = form;

		if (
			!name ||
			!email ||
			!username ||
			!password ||
			!confirmPassword ||
			!phone ||
			!passport ||
			!dateOfBirth ||
			!country ||
			!gender
		) {
			setError("All fields are required.");
			setLoading(false);
			return;
		}

		if (password !== confirmPassword) {
			setError("Password and confirmation do not match.");
			setLoading(false);
			return;
		}

		try {
			const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
			const response = await fetch(`${baseUrl}/guests`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					email,
					username,
					password,
					phone,
					passport,
					dateOfBirth,
					country,
					gender,
				}),
			});

			const result = await response.json();

			if (!response.ok) {
				setError(result.message || "Registration failed.");
			} else {
				setForm({
					name: "",
					email: "",
					username: "",
					password: "",
					confirmPassword: "",
					phone: "",
					passport: "",
					dateOfBirth: "",
					country: "",
					gender: "",
				});

				setSuccess("🎉 Registration successful! Redirecting to login...");
				setTimeout(() => {
					router.push("/login");
				}, 2000);
			}
		} catch {
			setError("Server error. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="relative min-h-screen flex items-center justify-center">
			{/* Background */}
			<Image
				src="/images/house.jpg"
				alt="Guest House Background"
				fill
				priority
				className="object-cover"
			/>
			<div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

			{/* Card */}
			<div className="relative z-10 w-full max-w-4xl mx-4 py-16">
				<div
					className="bg-white/90 backdrop-blur-xl
		rounded-3xl shadow-2xl border border-amber-100
		p-8 md:p-10"
				>
					{/* Logo */}
					<div className="flex justify-center mb-8">
						<Image
							src="/images/ummu_logo_1.png"
							alt="Ummu Guest House"
							width={140}
							height={60}
							className="object-contain"
						/>
					</div>

					{/* Header */}
					<h1 className="text-3xl font-bold text-center text-slate-800 mb-1">
						Create Your Account
					</h1>
					<p className="text-center text-slate-500 mb-8">
						Join Ummu Guest House and start your journey
					</p>

					{/* Alerts */}
					{error && (
						<p className="mb-6 text-sm text-red-600 bg-red-100 border border-red-200 rounded-xl p-3">
							{error}
						</p>
					)}
					{success && (
						<p className="mb-6 text-sm text-green-700 bg-green-100 border border-green-200 rounded-xl p-3">
							{success}
						</p>
					)}

					<form
						onSubmit={handleSubmit}
						className="grid grid-cols-1 md:grid-cols-2 gap-4"
					>
						{/* LEFT COLUMN */}
						<Input
							label="Full Name"
							name="name"
							icon={<User size={18} />}
							value={form.name}
							onChange={handleChange}
							placeholder="Masitoh"
						/>

						<Input
							label="Email"
							name="email"
							type="email"
							icon={<Mail size={18} />}
							value={form.email}
							onChange={handleChange}
							placeholder="masitoh@gmail.com"
						/>

						<Input
							label="Username"
							name="username"
							icon={<User size={18} />}
							value={form.username}
							onChange={handleChange}
							placeholder="masitoh"
						/>

						<Input
							label="Phone"
							name="phone"
							icon={<Phone size={18} />}
							value={form.phone}
							onChange={handleChange}
							placeholder="+628123456789"
						/>

						<Input
							label="Passport"
							name="passport"
							icon={<CreditCard size={18} />}
							value={form.passport}
							onChange={handleChange}
							placeholder="A12345678"
						/>

						<Input
							label="Date of Birth"
							name="dateOfBirth"
							type="date"
							icon={<Calendar size={18} />}
							value={form.dateOfBirth}
							onChange={handleChange}
						/>

						{/* RIGHT COLUMN */}
						<div>
							<label className="block text-sm font-semibold text-slate-700 mb-1">
								Password
							</label>
							<div
								className="flex items-center gap-2
					border border-slate-200 rounded-2xl px-4 py-2
					focus-within:ring-2 focus-within:ring-amber-400 transition"
							>
								<Lock size={18} className="text-amber-600" />
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									value={form.password}
									onChange={handleChange}
									placeholder="********"
									className="w-full outline-none bg-transparent"
								/>
								<button
									type="button"
									onClick={() => setShowPassword((p) => !p)}
									className="text-amber-600"
								>
									{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
						</div>

						<div>
							<label className="block text-sm font-semibold text-slate-700 mb-1">
								Confirm Password
							</label>
							<div
								className="flex items-center gap-2
					border border-slate-200 rounded-2xl px-4 py-2
					focus-within:ring-2 focus-within:ring-amber-400 transition"
							>
								<Lock size={18} className="text-amber-600" />
								<input
									type={showConfirmPassword ? "text" : "password"}
									name="confirmPassword"
									value={form.confirmPassword}
									onChange={handleChange}
									placeholder="********"
									className="w-full outline-none bg-transparent"
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword((p) => !p)}
									className="text-amber-600"
								>
									{showConfirmPassword ? (
										<EyeOff size={18} />
									) : (
										<Eye size={18} />
									)}
								</button>
							</div>
						</div>

						<div>
							<label className="block text-sm font-semibold text-slate-700 mb-1">
								Gender
							</label>
							<select
								name="gender"
								value={form.gender}
								onChange={handleChange}
								className="w-full border border-slate-200 rounded-2xl px-4 py-2 bg-white
					focus:ring-2 focus:ring-amber-400 transition"
							>
								<option value="">Select gender</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>
						</div>

						<Input
							label="Country"
							name="country"
							icon={<Globe size={18} />}
							value={form.country}
							onChange={handleChange}
							placeholder="Indonesia"
						/>

						{/* SUBMIT FULL WIDTH */}
						<div className="md:col-span-2 pt-4">
							<button
								type="submit"
								disabled={loading}
								className={`w-full py-3 rounded-2xl
					${BRAND_GRADIENT}
					text-white font-bold
					hover:shadow-xl transition
					disabled:opacity-50`}
							>
								{loading ? "Registering..." : "Create Account"}
							</button>
						</div>
					</form>

					{/* Footer */}
					<p className="text-center text-sm text-slate-500 mt-6">
						Already have an account?{" "}
						<Link
							href="/login"
							className="text-amber-600 font-semibold hover:underline"
						>
							Log in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

/* ================= UI PART ================= */
function Input({
	label,
	name,
	type = "text",
	value,
	onChange,
	placeholder,
	icon,
}: {
	label: string;
	name: string;
	type?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	icon: React.ReactNode;
}) {
	return (
		<div>
			<label className="block text-sm font-semibold text-slate-700 mb-1">
				{label}
			</label>
			<div
				className="flex items-center gap-2
				border border-slate-200 rounded-2xl px-4 py-2
				focus-within:ring-2 focus-within:ring-amber-400 transition"
			>
				<span className="text-amber-600">{icon}</span>
				<input
					type={type}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className="w-full outline-none bg-transparent text-slate-700"
				/>
			</div>
		</div>
	);
}
