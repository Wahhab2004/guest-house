import RoomInformation from "@/components/admin/dasbor/RoomInformation";
import CurrentDate from "@/components/CurrentDate";
import GuestReservation from "@/components/admin/dasbor/GuestReservation";

export default function DashboardPage() {
	return (
		<main>
			<div className="max-w-7xl mx-auto px-6  flex flex-col px-6 mt-20 mb-6">
				{/* Title */}
				<h1 className=" text-3xl font-bold mt-6 text-[#FFB22C]">Dashboard</h1>

				{/* c */}
				<CurrentDate />
			</div>

			<RoomInformation />
			<GuestReservation />
		</main>
	);
}
