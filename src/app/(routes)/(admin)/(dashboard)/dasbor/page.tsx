

import CheckInOut from "@/components/CheckInOut";
import CurrentDate from "@/components/CurrentDate";
import GuestReservation from "@/components/GuestReservation";
import Image from "next/image";
import Link from "next/link";


export default async function DashboardPage() {
	
	// const rooms = await getData("http://localhost:3000/api/room");

	// const totalRoomsAvailable = rooms.data.filter((room: any) => room.roomStatus === "available").length;
	// const totalRoomsUsed = rooms.data.filter((room: any) => room.roomStatus === "used").length;
	// const totalGuestOvernight = rooms.data.filter((room: any) => room.roomStatus === "guest overnight").length;

	return (
		<main>
			<CurrentDate />

			<h1 className="text-[#5D6679] text-xl font-bold mt-6 ml-[230px] ">
				Dashboard
			</h1>

			{/* Rooms Available, Used Room, Guest Overnight */}
			<div className="flex justify-between items-center w-2/3 ml-[250px] mt-8">
				{/* Rooms Available */}
				<div className="leading-10 flex justify-between items-center p-4 w-1/3 shadow border border-gray-200 rounded-lg mr-4 hover:bg-gray-100 ">
					<div>
						<h3 className="text-[#5D6679] text-sm font-semibold">
							Rooms Available
						</h3>

						<p className="text-[#5D6679] text-3xl font-bold">s</p>

						<Link href="/room">
							<p className="text-[#00B69B] font-semibold text-sm">
								See More Detail
							</p>
						</Link>
					</div>

					<Image
						src="/svg/room-available.svg"
						height={48}
						width={54}
						alt="room-available"
						className=""
					/>
				</div>

				{/* Used Room */}
				<div className="leading-10 flex justify-between items-center p-4 w-1/3 shadow border border-gray-200 rounded-lg mr-4 hover:bg-gray-100 ">
					<div>
						<h3 className="text-[#5D6679] text-sm font-semibold">Used Room</h3>

						<p className="text-[#5D6679] text-3xl font-bold">s</p>

						<Link href="/room">
							<p className="text-[#00B69B] font-semibold text-sm">
								See More Detail
							</p>
						</Link>
					</div>

					<Image
						src="/svg/used-room.svg"
						height={48}
						width={54}
						alt="used-room"
						className=""
					/>
				</div>

				{/* Guest Overnight */}
				<div className="leading-10 flex justify-between items-center p-4 w-1/3 shadow border border-gray-200 rounded-lg hover:bg-gray-100 ">
					<div>
						<h3 className="text-[#5D6679] text-sm font-semibold">
							Guest Overnight
						</h3>

						<p className="text-[#5D6679] text-3xl font-bold">s</p>

						<Link href="/room">
							<p className="text-[#00B69B] font-semibold text-sm">
								See More Detail
							</p>
						</Link>
					</div>

					<Image
						src="/svg/guest-overnight.svg"
						height={48}
						width={54}
						alt="guest-overnight"
						className=""
					/>
				</div>
			</div>

			{/* Guest Today Checkin / Checkout */}
			{/* Login menampilkan guest checkin / checkout masih belum dibuat logic nya */}
			<CheckInOut />

			{/* Guest Reservation */}
			<GuestReservation />
		</main>
	);
}
