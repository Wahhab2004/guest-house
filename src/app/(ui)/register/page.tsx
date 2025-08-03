"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
	const [showConfirmPassword, setConfirmShowPassword] = useState(false);

	const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
	const toggleConfirmPasswordVisibility = () =>
		setConfirmShowPassword((prev) => !prev);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const router = useRouter();

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
			!dateOfBirth ||
			!country ||
			!passport ||
			!gender
		) {
			setError("Semua field wajib diisi.");
			setLoading(false);
			return;
		}

		if (password !== confirmPassword) {
			setError("Password dan konfirmasi password tidak cocok.");
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
				setError(result.message || "Gagal mendaftar.");
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

				setSuccess("🎉 Registrasi berhasil! Mengarahkan ke halaman login...");

				// Redirect setelah 2 detik
				setTimeout(() => {
					router.push("/login");
				}, 2000);
			}
		} catch (err) {
			setError("Terjadi kesalahan saat mengirim data.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10">
			<div className="w-full max-w-4xl flex flex-col md:flex-row border shadow-xl rounded-lg">
				{/* Left Section - Form */}
				<div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white animate-fade-in">
					<div className="w-full max-w-md">
						<h1 className="text-3xl font-bold mb-2">Sign up</h1>
						<p className="text-gray-500 mb-4">Welcome to Ryosuke Guesthouse</p>

						{error && <p className="text-red-500 text-sm mb-2">{error}</p>}
						{success && (
							<div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-md flex items-start gap-2">
								<span>✅</span>
								<p className="text-sm">{success}</p>
							</div>
						)}

						<form onSubmit={handleSubmit}>
							{/* Email */}
							<label className="block text-sm font-medium mb-1">Email</label>
							<div className="mb-3 flex items-center border border-gray-300 rounded-full px-3">
								<input
									type="email"
									name="email"
									value={form.email}
									onChange={handleChange}
									required
									className="w-full py-2 outline-none bg-transparent"
								/>
								<Image
									src="/svg/person.svg"
									width={25}
									height={25}
									alt="icon"
								/>
							</div>

							{/* Name */}
							<label className="block text-sm font-medium mb-1">Name</label>
							<input
								type="text"
								name="name"
								value={form.name}
								onChange={handleChange}
								required
								className="mb-3 w-full border border-gray-300 rounded-full py-2 px-4"
							/>

							{/* Username */}
							<label className="block text-sm font-medium mb-1">Username</label>
							<input
								type="text"
								name="username"
								value={form.username}
								onChange={handleChange}
								className="mb-3 w-full border border-gray-300 rounded-full py-2 px-4"
							/>

							{/* Password */}
							<label className="block text-sm font-medium mb-1">Password</label>
							<div className="mb-3 flex items-center border border-gray-300 rounded-full px-3">
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									value={form.password}
									onChange={handleChange}
									required
									className="w-full py-2 outline-none bg-transparent"
								/>
								<button type="button" onClick={togglePasswordVisibility}>
									<Image
										src={showPassword ? "/images/show.png" : "/images/hide.png"}
										width={25}
										height={25}
										alt="toggle password"
									/>
								</button>
							</div>

							{/* Confirm Password */}
							<label className="block text-sm font-medium mb-1">
								Confirm Password
							</label>
							<div className="mb-3 flex items-center border border-gray-300 rounded-full px-3">
								<input
									type={showConfirmPassword ? "text" : "password"}
									name="confirmPassword"
									value={form.confirmPassword}
									onChange={handleChange}
									required
									className="w-full py-2 outline-none bg-transparent"
								/>
								<button type="button" onClick={toggleConfirmPasswordVisibility}>
									<Image
										src={
											showConfirmPassword
												? "/images/show.png"
												: "/images/hide.png"
										}
										width={25}
										height={25}
										alt="toggle confirm"
									/>
								</button>
							</div>

							{/* Phone */}
							<label className="block text-sm font-medium mb-1">Phone</label>
							<input
								type="text"
								name="phone"
								value={form.phone}
								onChange={handleChange}
								className="mb-3 w-full border border-gray-300 rounded-full py-2 px-4"
							/>

							{/* Passport */}
							<label className="block text-sm font-medium mb-1">Passport</label>
							<input
								type="text"
								name="passport"
								value={form.passport}
								onChange={handleChange}
								className="mb-3 w-full border border-gray-300 rounded-full py-2 px-4"
							/>

							{/* Date of Birth */}
							<label className="block text-sm font-medium mb-1">
								Date of Birth
							</label>
							<input
								type="date"
								name="dateOfBirth"
								value={form.dateOfBirth}
								onChange={handleChange}
								className="mb-3 w-full border border-gray-300 rounded-full py-2 px-4"
							/>

							{/* Gender */}
							<label className="block text-sm font-medium mb-1">Gender</label>
							<select
								name="gender"
								value={form.gender}
								onChange={(e) => setForm({ ...form, gender: e.target.value })}
								required
								className="mb-3 w-full border border-gray-300 rounded-full py-2 px-4 bg-white"
							>
								<option value="" disabled>
									Pilih jenis kelamin
								</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>

							{/* Country */}
							<label className="block text-sm font-medium mb-1">Country</label>
							<input
								type="text"
								name="country"
								value={form.country}
								onChange={handleChange}
								className="mb-4 w-full border border-gray-300 rounded-full py-2 px-4"
							/>

							{/* Submit */}
							<button
								type="submit"
								disabled={loading}
								className="w-full py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition-colors"
							>
								{loading ? "Registering..." : "Sign up"}
							</button>
						</form>

						<div className="text-center text-sm mt-4">
							Already have an account?{" "}
							<Link href="/login" className="text-blue-600 hover:underline">
								Log in
							</Link>
						</div>
					</div>
				</div>

				{/* Right Section */}
				<div className="w-full md:w-[45%] hidden md:block">
					<Image
						width={1000}
						height={1000}
						src="/images/japanese-home.jpg"
						alt="Login Visual"
						className="w-full h-full object-cover rounded-r-lg"
					/>
				</div>
			</div>
		</div>
	);
}
