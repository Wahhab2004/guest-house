"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

export default function AdminLoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!username || !password) {
			alert("Username dan password wajib diisi.");
			return;
		}

		try {
			const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
			const res = await fetch(`${baseUrl}/login-admin`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			const result = await res.json();

			if (!res.ok) {
				throw new Error(result.message || "Login gagal.");
			}

			// Simpan token dan user ke cookie
			Cookies.set("token", result.token, { expires: 1 }); // 1 hari
			Cookies.set("user", JSON.stringify(result.user), { expires: 1 });

			alert("Login admin berhasil!");
			window.location.href = "/dasbor";
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error("Login error:", error);
				alert(error.message);
			} else {
				console.error("Login error:", error);
				alert("Terjadi kesalahan saat login.");
			}
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10">
			<div className="w-full max-w-4xl flex flex-col md:flex-row border shadow-xl rounded-lg">
				{/* Left Section - Form */}
				<div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white animate-fade-in">
					<div className="w-full max-w-md">
						<h1 className="text-3xl font-bold mb-2">Admin Login</h1>
						<p className="text-gray-500 mb-6">Login sebagai administrator</p>

						<form onSubmit={handleLogin} className="space-y-4">
							<label className="block text-sm font-medium mb-1">Username</label>
							<div className="mb-4 flex items-center border border-gray-300 rounded-full px-3 transition duration-150 focus-within:ring-2 focus-within:ring-indigo-400">
								<input
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									placeholder="admin123"
									className="w-full py-2 outline-none bg-transparent"
								/>

								<Image
									width={25}
									height={25}
									src="/svg/person.svg"
									alt="User Icon"
									className="h-5 w-5"
								/>
							</div>

							<label className="block text-sm font-medium mb-1">Password</label>
							<div className="mb-4 flex items-center border border-gray-300 rounded-full px-3 transition duration-150 focus-within:ring-2 focus-within:ring-indigo-400">
								<input
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="••••••••"
									className="w-full py-2 outline-none bg-transparent"
								/>

								<button
									type="button"
									onClick={togglePasswordVisibility}
									className="ml-2 focus:outline-none"
								>
									<Image
										width={25}
										height={25}
										src={showPassword ? "/images/show.png" : "/images/hide.png"}
										alt="toggle visibility"
										className="w-5 h-5"
									/>
								</button>
							</div>

							<button className="w-full py-2 bg-indigo-600 text-white rounded-md font-semibold mb-4 transition-colors duration-200 hover:bg-indigo-700 active:scale-95">
								Login as Admin
							</button>
						</form>

						<div className="text-center text-sm mt-2">
							<Link href="/">
								<span className="text-blue-600 cursor-pointer hover:underline">
									Kembali ke beranda
								</span>
							</Link>
						</div>
					</div>
				</div>

				{/* Right Section - Image */}
				<div className="w-full md:w-[45%] hidden md:block">
					<Image
						width={1000}
						height={1000}
						src="/images/house.jpg"
						alt="Login Visual"
						className="w-full h-full object-cover animate-slide-in-left rounded-r-lg"
					/>
				</div>
			</div>
		</div>
	);
}
