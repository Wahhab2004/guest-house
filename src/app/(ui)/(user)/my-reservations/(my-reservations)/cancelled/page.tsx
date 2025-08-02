import Image from "next/image";
import Link from "next/link";

export default function Cancel() {
	return (
		<div className="h-screen mt-36 w-11/12 mx-auto ">

			<Link href="/my-reservations/cancelled/detail">

				<div className="flex justify-between items-center shadow border border-gray-200 rounded-lg p-4 text-xs">
					{/* Check in */}
					<div className="">
						<h3 className="font-semibold text-gray-600 ">Check in</h3>
						<p className="">2024-12-26</p>
					</div>

					{/* Checkout */}
					<div className="">
						<h3 className="font-semibold text-gray-600 ">Check out</h3>
						<p className="">2024-12-26</p>
					</div>

					{/* Type of room */}
					<div className="">
						<h3 className="font-semibold text-gray-600 ">Type of room</h3>
						<p className="">2</p>
					</div>

					{/* Total Payment */}
					<div className="">
						<h3 className="font-semibold text-gray-600 ">Total Payment</h3>
						<p className="">4000</p>
					</div>

					<Link href="/my-reservations/cancelled/detail">
						<Image
							src="/svg/next-2.svg"
							width={40}
							height={40}
							alt="icon next"
							className="w-5 h-5 cursor-pointer"
						/>
					</Link>
				</div>

			</Link>
		</div>
	);
}
