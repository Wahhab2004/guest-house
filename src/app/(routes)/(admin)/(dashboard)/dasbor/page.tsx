

import RoomInformation from "@/components/admin/dasbor/RoomInformation";
import CurrentDate from "@/components/CurrentDate";
import GuestReservation from "@/components/admin/dasbor/GuestReservation";


export default function DashboardPage() {
	return (
		<main>
			{/* Date */}
			<CurrentDate />

			{/* Title */}
			<h1 className="text-[#5D6679] text-xl font-bold mt-6 ml-[230px] ">
				Dashboard
			</h1>

			{/* Rooms Available, Used Room, Guest Overnight */}
			<RoomInformation />

			{/* Guest Reservation */}
			<GuestReservation />
		</main>
	);
}
