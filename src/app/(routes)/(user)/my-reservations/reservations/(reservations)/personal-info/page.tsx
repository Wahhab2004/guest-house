import Link from "next/link";

export default function PersonalInfo() {
	return (
		<section className="my-10 mb-20">
			<main className="w-11/12 mx-auto">
				{/* <button className="font-semibold">Back</button> */}

				{/* Heading */}
				<h1 className="text-xl lg:text-3xl font-bold text-center mt-10 text-blue-900">
					Personal Info
				</h1>
				<p className="text-center text-gray-400">
					Please fill up the blank fields below
				</p>

				<section className="w-11/12 lg:w-[75%] mx-auto">
					{/* Form Otomatis */}
					<div className="mt-10 flex items-center lg:ml-[106px] block">
						<h2 className="font-semibold lg:text-xl lg:font-bold">Guest 1</h2>

						{/* On Off */}
						<label className="relative inline-flex items-center cursor-pointer ml-2">
							<input type="checkbox" value="" className="sr-only peer" />
							<div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
						</label>

						<p className="ml-2 text-sm mb-1 lg:mb-0">Use My Profile Data</p>
					</div>

					{/* Form Manual */}
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

							{/* ID/Passport Number */}
							<div className="mb-5">
								<label
									htmlFor="id-passport"
									className="block mb-2 text-sm font-medium text-gray-900 "
								>
									ID/Passport Number
								</label>
								<input
									type="id-passport"
									id="id-passport"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder="A1234567"
									required
								/>
							</div>

							{/* Country */}
							{/* Tanyakan ke Bilqis nanti, ini apa */}
							<div className="mb-5">
								<label
									htmlFor="country"
									className="block mb-2 text-sm font-medium text-gray-900 "
								>
									Country of Residence
								</label>

								<select
									name="country"
									id="country"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
								>
									<option value="id">Indonesia</option>
									<option value="kr">Korea</option>
								</select>
							</div>

							{/* Emergency Contact */}
							<div>
								<p className="block mb-2 text-sm font-semibold text-gray-900 text-red-500 italic">
									Emergency Contact
								</p>

								<div className="mb-5 flex justify-between">
									<div>
										<label
											htmlFor="name-emergency"
											className="block mb-2 text-sm font-medium text-gray-900 "
										>
											Name
										</label>

										<input
											type="text"
											id="name-emergency"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] p-2.5"
											placeholder="John doe"
											required
										/>
									</div>
									<div>
										<label
											htmlFor="phone-emergency"
											className="block mb-2 text-sm font-medium text-gray-900 "
										>
											Phone Number
										</label>
										<input
											type="number"
											id="phone-emergency"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
											placeholder="John doe"
											required
										/>
									</div>
								</div>
							</div>
						</div>

					</form>

					{/* Submit */}
					<div className="pt-10">
						<button
							type="submit"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[50%] sm:w-auto px-5 py-2.5 text-center 
							mx-auto block lg:w-1/3"
						>
							Continue to Book
						</button>

						<button className="mt-4 text-gray-400 text-center w-1/3 lg:w-1/4  text-sm mx-auto block font-semibold border border-gray-200 hover:text-gray-500 hover:bg-gray-300 py-2 rounded-lg">
							<Link href="/my-reservations">Back</Link>
						</button>
					</div>
				</section>
			</main>
		</section>
	);
}
