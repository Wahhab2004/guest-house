import Image from "next/image";
import Link from "next/link";

export default function myAccount() {
	return (
		<section className="w-11/12 mx-auto my-20">
			<h1 className="font-bold text-blue-900 text-xl text-center">
				User Profile
			</h1>

			<Image
				src="/images/avatar.png"
				alt="avatar"
				width={100}
				height={100}
				className="rounded-full mx-auto mt-6"
			/>

			<h3 className="text-blue-900 font-semibold text-center mt-4">John Doe</h3>

			<form className="w-md lg:w-[75%] mx-auto mt-10 lg:flex lg:justify-between lg:mx-auto">
				{/* Left Side */}
				<div className="lg:w-[45%]">
					{/* Name */}
					<div className="mb-5">
						<label
							htmlFor="name"
							className="block mb-2 text-sm font-medium text-gray-900 "
						>
							First Name
						</label>
						<input
							type="name"
							id="name"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							placeholder="John doe"
							required
						/>
					</div>

					{/* User Name */}
					<div className="mb-5">
						<label
							htmlFor="userName"
							className="block mb-2 text-sm font-medium text-gray-900 "
						>
							User Name
						</label>
						<input
							type="userName"
							id="userName"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							placeholder="John doe"
							required
						/>
					</div>

					{/* Email */}
					<div className="mb-5">
						<label
							htmlFor="email"
							className="block mb-2 text-sm font-medium text-gray-900 "
						>
							Email Address
						</label>
						<input
							type="email"
							id="email"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							placeholder="name@flowbite.com"
							required
						/>
					</div>

					{/* Gender */}
					<div className="mb-5">
						<label
							htmlFor="gender"
							className="block mb-2 text-sm font-medium text-gray-900 "
						>
							Gender
						</label>

						<select
							name="gender"
							id="gender"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</div>

					{/* Date */}
					<div className="mb-5">
						<label
							htmlFor="date"
							className="block mb-2 text-sm font-medium text-gray-900 "
						>
							Date of Birth
						</label>
						<input
							type="date"
							id="date"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							placeholder="name@flowbite.com"
							required
						/>
					</div>
				</div>

				{/* Right Side */}
				<div className="lg:w-[45%]">
					{/* Phone Number */}
					<div className="mb-5">
						<label
							htmlFor="phone-number"
							className="block mb-2 text-sm font-medium text-gray-900 "
						>
							Phone Number
						</label>
						<input
							type="phone-number"
							id="phone-number"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							placeholder="+628 1234 5678"
							required
						/>
					</div>

					{/* Password */}
					<div className="mb-5">
						<label
							htmlFor="password"
							className="block mb-2 text-sm font-medium text-gray-900 "
						>
							Password
						</label>
						<input
							type="text"
							id="password"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							placeholder="your password"
							required
						/>
					</div>
				</div>
			</form>



			<button className="text-sm bg-blue-600 text-white p-3 font-semibold rounded-lg mt-12 mx-auto block hover:bg-blue-700 hover:font-semibold">
				<Link href="/my-reservations/my-account">
				Edit my profile</Link>

			</button>

		</section>
	);
}
