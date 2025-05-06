"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setConfirmShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const toggleConfirmPasswordVisibility = () => {
		setConfirmShowPassword((prev) => !prev);
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10">
			<div className="w-full max-w-4xl flex flex-col md:flex-row border shadow-xl rounded-lg">
				{/* Left Section - Form */}
				<div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white animate-fade-in">
					<div className="w-full max-w-md">
						<h1 className="text-3xl font-bold mb-2">Sign up</h1>
						<p className="text-gray-500 mb-6">Welcome to Ryosuke Guesthouse</p>

						<form>
							<label className="block text-sm font-medium mb-1">Email </label>
							<div className="mb-4 flex items-center border border-gray-300 rounded-full px-3 transition duration-150 focus-within:ring-2 focus-within:ring-indigo-400">
								<input
									type="email"
									placeholder="harsh@pagedone.com"
									className="w-full py-2 outline-none bg-transparent"
								/>
								<Image
									width={25}
									height={25}
									src="/svg/person.svg"
									alt="Google"
									className="h-5 w-5 "
								/>
							</div>

							<label className="block text-sm font-medium mb-1">Password</label>
							<div className="mb-4 flex items-center border border-gray-300 rounded-full px-3 transition duration-150 focus-within:ring-2 focus-within:ring-indigo-400">
								<input
									type={showPassword ? "text" : "password"}
									placeholder="password"
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

							<label className="block text-sm font-medium mb-1">
								Confirm Password
							</label>
							<div className="mb-4 flex items-center border border-gray-300 rounded-full px-3 transition duration-150 focus-within:ring-2 focus-within:ring-indigo-400">
								<input
									type={showConfirmPassword ? "text" : "password"}
									placeholder="confirm password"
									className="w-full py-2 outline-none bg-transparent"
								/>
								<button
									type="button"
									onClick={toggleConfirmPasswordVisibility}
									className="ml-2 focus:outline-none"
								>
									<Image
										width={25}
										height={25}
										src={
											showConfirmPassword
												? "/images/show.png"
												: "/images/hide.png"
										}
										alt="toggle visibility"
										className="w-5 h-5"
									/>
								</button>
							</div>

							<button className="w-full py-2 bg-indigo-600 text-white rounded-md font-semibold mb-4 transition-colors duration-200 hover:bg-indigo-700 active:scale-95">
								Sign up
							</button>
						</form>

						<div className="flex items-center justify-center mb-4 mt-4">
							<span className="border-b w-1/5 lg:w-1/4"></span>
							<span className="text-xs text-center text-gray-500 mx-2">OR</span>
							<span className="border-b w-1/5 lg:w-1/4"></span>
						</div>

						<div className="flex space-x-4 mb-4">
							<button className="w-1/2 flex items-center justify-center py-2  bg-gray-100 rounded-full transition-all duration-200 hover:bg-gray-100 active:scale-95">
								<Image
									width={25}
									height={25}
									src="https://www.svgrepo.com/show/475656/google-color.svg"
									alt="Google"
									className="h-5 w-5 mr-2"
								/>
								Google
							</button>

							<button className="w-1/2 flex items-center justify-center py-2  bg-gray-100 rounded-full transition-all duration-200 hover:bg-gray-100 active:scale-95">
								<Image
									width={25}
									height={25}
									src="https://www.svgrepo.com/show/452196/facebook-1.svg"
									alt="Facebook"
									className="h-5 w-5 mr-2"
								/>
								Facebook
							</button>
						</div>

						<div className="text-center text-sm">
							Already have an account?{" "}
							<Link href="/login">
								<span className="text-blue-600 cursor-pointer hover:underline">
									Log in
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
						src="/images/japanese-home.jpg"
						alt="Login Visual"
						className="w-full h-full object-cover animate-slide-in-left rounded-r-lg"
					/>
				</div>
			</div>
		</div>
	);
}
