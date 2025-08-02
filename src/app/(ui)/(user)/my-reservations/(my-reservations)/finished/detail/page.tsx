import Image from "next/image";
import Link from "next/link";

export default function FinishedDetail() {
	return (
		<>
			<button className="absolute top-20 left-2 hover:bg-gray-200 hover:rounded-sm">
				<Link href="/my-reservations/finished" className="flex">
					<Image
						src={"/svg/back.svg"}
						alt="previous"
						className="w-6 h-6 "
						width={100}
						height={100}

                        
					/>
					
                    <p className="font-semibold">Back</p>
				</Link>
			</button>

			<section className="w-11/12 mx-auto my-20">
				<Image
					src="/images/rooms/room-2.png"
					width={400}
					height={200}
					alt="room"
					className="rounded-xl w-[85%] mx-auto"
				/>

				{/* See Room Detail */}
				<button className="bg-blue-600 text-white py-2 px-8 rounded-lg mt-12 mx-auto block hover:bg-blue-700 hover:font-semibold text-sm">
					<Link href="/rooms">See Room Detail</Link>
				</button>


				{/* Booking Details */}
				<div className="w-11/12 mx-auto mt-12 mx-auto leading-[45px]">
					{/* Check in */}
					<div className="flex justify-between items-center w-11/12 mx-auto">
						<h3 className="font-semibold text-gray-600">Date Check in</h3>
						<p className="text-start w-1/3">2024-12-27</p>
					</div>

					{/* Check out */}
					<div className="flex justify-between items-center w-11/12 mx-auto">
						<h3 className="font-semibold text-gray-600">Date Check out</h3>
						<p className="text-start w-1/3">2024-12-27</p>
					</div>

					{/* Estimated Arrival Time */}
					<div className="flex justify-between items-center w-11/12 mx-auto">
						<h3 className="font-semibold text-gray-600">
							Estimated Arrival Time
						</h3>
						<p className="text-start w-1/3">3PM - 4PM</p>
					</div>

					{/* Room type */}
					<div className="flex justify-between items-center w-11/12 mx-auto">
						<h3 className="font-semibold text-gray-600">Room Type</h3>
						<p className="text-start w-1/3">1</p>
					</div>

					{/* Number of guest */}
					<div className="flex justify-between items-center w-11/12 mx-auto">
						<h3 className="font-semibold text-gray-600">Number of guest</h3>
						<p className="text-start w-1/3">1</p>
					</div>

					{/* Payment */}
					<div className="flex justify-between items-center w-11/12 mx-auto">
						<h3 className="font-semibold text-gray-600">
							Total Payment Amount
						</h3>
						<p className="text-start w-1/3">4000</p>
					</div>

					{/* Payment Method */}
					<div className="flex justify-between items-center w-11/12 mx-auto">
						<h3 className="font-semibold text-gray-600">Payment Method</h3>
						<p className="text-start w-1/3">Transfer BCA</p>
					</div>

					{/* Payment Status */}
					<div className="flex justify-between items-center w-11/12 mx-auto">
						<h3 className="font-semibold text-gray-600">Payment Status</h3>
						<p className="text-start w-1/3">Paid</p>
					</div>

					{/* Status */}
					<div className="flex justify-between items-center w-11/12 mx-auto">
						<h3 className="font-semibold text-gray-600">Status</h3>
						<p className="text-start w-1/3">Not Active</p>
					</div>
				</div>

			

			</section>
		</>
	);
}
