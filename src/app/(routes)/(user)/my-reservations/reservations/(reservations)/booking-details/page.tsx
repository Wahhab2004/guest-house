import Link from "next/link";
import Image from "next/image";

export default function PersonalInfo() {
	return (
		<section className="my-10 mb-20">
			<main className="w-11/12 mx-auto">
				{/* <button className="font-semibold">Back</button> */}

				{/* Heading */}
				<h1 className="text-xl font-bold text-center mt-">Booking Details</h1>
				<p className="text-center text-gray-400 mb-4">
					Please fill up the blank fields below
				</p>

				<div className="lg:flex lg:justify-center lg:mt-16 lg:items-center">
					<Image
						src="/images/rooms/room-2.png"
						width={300}
						height={300}
						alt="booking details"
						className="mx-auto lg:mx-0 lg:w-1/3 lg:h-60"
					/>

					{/* Booking Details */}
					<div className="mt-10 text-center grid grid-cols-1 justify-items-center p-4 py-6 gap-4 text-sm lg:text-start lg:w-1/3 lg:p-4 lg:mt-0 lg:ml-4 lg:text-base">
						<div className="w-11/12 flex justify-between">
							<h3 className="font-medium text-gray-600">Check-in date</h3>
							<p>December 26, 2024</p>
						</div>
						<div className="w-11/12 flex justify-between">
							<h3 className="font-medium text-gray-600">Check-out date</h3>
							<p>December 27, 2024</p>
						</div>
						<div className="w-11/12 flex justify-between">
							<h3 className="font-medium text-gray-600">
								Estimated Arrival Time
							</h3>
							<p>3PM - 4PM</p>
						</div>
						<div className="w-11/12 flex justify-between">
							<h3 className="font-medium text-gray-600">Type of Room</h3>
							<p>1</p>
						</div>
						<div className="w-11/12 flex justify-between">
							<h3 className="font-medium text-gray-600">Number of Guest</h3>
							<p>1</p>
						</div>
						<div className="w-11/12 flex justify-between">
							<h3 className="font-medium text-gray-600">Total Payment</h3>
							<p className="font-bold">4000</p>
						</div>
					</div>
				</div>

				{/* Cancelletion & Refund Policy */}
				<div className="mt-12 text-orange-700 lg:w-1/3 lg:ml-44">
					<h2 className="font-semibold text-">Cancellation & Refund Policy</h2>
					<ul className="list-disc list-outside text-sm ml-6 leading-relaxed">
						<li>
							2 Days Before Check-In: You can cancel your booking and receive a
							full refund.
						</li>
						<li>
							1 Day Before Check-In: You can cancel your booking and still
							receive a refund.
						</li>
						<li>
							Less Than 1 Day Before Check-In: Cancellations are not allowed,
							and no refund will be issued.
						</li>
					</ul>
				</div>

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
			</main>
		</section>
	);
}
