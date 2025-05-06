"use client";

import Image from "next/image";
import Link from "next/link";

export default function ResetPassword() {
	return (
		<div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10">
			<div className="w-full max-w-4xl flex flex-col md:flex-row border shadow-xl rounded-lg">
				{/* Left Section - Form */}
				<div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white animate-fade-in">
					<div className="w-full max-w-md">
						<h1 className="text-3xl font-bold mb-2">Forgot Your Password?</h1>
						<p className="text-gray-500 mb-6">
							Please enter the email address you’d like your password reset
							information sent to
						</p>

						<form>
							<label className="block text-sm font-medium mb-1">
								Enter Email Address{" "}
							</label>
							<div className="mb-8 flex items-center border border-gray-300 rounded-full px-3 transition duration-150 focus-within:ring-2 focus-within:ring-indigo-400">
								<input
									type="email"
									placeholder="harsh@pagedone.com"
									className="w-full py-2 outline-none bg-transparent"
								/>
								<Image
									width={25}
									height={25}
									src="/svg/person.svg"
									alt="Email"
									className="h-5 w-5"
								/>
							</div>

							<button className="w-full py-2 bg-indigo-600 text-white rounded-md font-semibold mb-4 transition-colors duration-200 hover:bg-indigo-700 active:scale-95">
								Send Code
							</button>

							<button className="w-full py-2 text-indigo-600 font-semibold mb-4 transition-colors duration-200 hover:bg-indigo-100 hover:text-indigo-700 active:scale-95">
								<Link href="/login">Back to Login</Link>
							</button>
						</form>
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
