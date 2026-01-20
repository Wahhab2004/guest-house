"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { loginAdmin } from "@/store/slices/authSlice";
import { RootState, AppDispatch } from "@/store";
import { Eye, EyeOff, User, Lock } from "lucide-react";

const BRAND_GRADIENT = "bg-gradient-to-r from-amber-500 to-amber-600";

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const { loading } = useSelector((state: RootState) => state.auth);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!username || !password) {
			toast.error("Username dan password wajib diisi.");
			return;
		}

		try {
			await dispatch(loginAdmin({ username, password })).unwrap();
			toast.success("Login berhasil!");
			setTimeout(() => {
				router.push("/");
			}, 1200);
		} catch (error: unknown) {
			if (typeof error === "string") {
				toast.error(error);
			} else {
				toast.error("Terjadi kesalahan saat login.");
			}
		}
	};

	return (
		<div className="relative min-h-screen flex items-center justify-center">
			{/* Background Image */}
			<Image
				src="/images/house.jpg"
				alt="Guest House Background"
				fill
				priority
				className="object-cover"
			/>

			{/* Overlay */}
			<div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

			{/* Login Card */}
			<div className="relative z-10 w-full max-w-md mx-4">
				<div
					className="bg-white/90 backdrop-blur-xl
					rounded-3xl shadow-2xl border border-amber-100
					p-8 md:p-10"
				>
					{/* Logo */}
					<div className="flex justify-center mb-6">
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
						Welcome Back
					</h1>
					<p className="text-center text-slate-500 mb-8">
						Login to manage your reservations
					</p>

					<form onSubmit={handleLogin} className="space-y-5">
						{/* Username */}
						<div>
							<label className="block text-sm font-semibold text-slate-700 mb-1">
								Username
							</label>
							<div
								className="flex items-center gap-2
								border border-slate-200 rounded-2xl px-4 py-2
								focus-within:ring-2 focus-within:ring-amber-400 transition"
							>
								<User size={18} className="text-amber-600" />
								<input
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									placeholder="whb123"
									className="w-full outline-none bg-transparent text-slate-700"
									disabled={loading}
								/>
							</div>
						</div>

						{/* Password */}
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
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="********"
									className="w-full outline-none bg-transparent text-slate-700"
									disabled={loading}
								/>
								<button
									type="button"
									onClick={() => setShowPassword((p) => !p)}
									className="text-amber-600 hover:text-amber-700 transition"
								>
									{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
						</div>

						{/* Forgot */}
						<div className="text-right text-sm">
							<h3>Forgot password?</h3>
							<p className="italic text-[10px] text-amber-600">Please, call Admin.</p>
						</div>

						{/* Button */}
						<button
							type="submit"
							disabled={loading}
							className={`w-full py-3 rounded-2xl
							${BRAND_GRADIENT}
							text-white font-bold
							hover:shadow-xl transition
							disabled:opacity-50`}
						>
							{loading ? "Logging in..." : "Login"}
						</button>
					</form>

					{/* Divider */}
					<div className="flex items-center justify-center my-6">
						<span className="border-b w-1/4"></span>
						<span className="text-xs text-slate-400 mx-3">OR</span>
						<span className="border-b w-1/4"></span>
					</div>

					{/* Social */}
					<div className="flex gap-3">
						<button
							type="button"
							onClick={() => toast.error("Google login is not available yet.")}
							className="w-1/2 flex items-center justify-center gap-2
							py-2 rounded-2xl border border-slate-200
							hover:bg-slate-100 transition"
						>
							<Image
								width={20}
								height={20}
								src="https://www.svgrepo.com/show/475656/google-color.svg"
								alt="Google"
							/>
							Google
						</button>

						<button
							type="button"
							onClick={() =>
								toast.error("Facebook login is not available yet.")
							}
							className="w-1/2 flex items-center justify-center gap-2
							py-2 rounded-2xl border border-slate-200
							hover:bg-slate-100 transition"
						>
							<Image
								width={20}
								height={20}
								src="https://www.svgrepo.com/show/452196/facebook-1.svg"
								alt="Facebook"
							/>
							Facebook
						</button>
					</div>

					{/* Footer */}
					<p className="text-center text-sm text-slate-500 mt-6">
						Don’t have an account?{" "}
						<Link
							href="/register"
							className="text-amber-600 font-semibold hover:underline"
						>
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
