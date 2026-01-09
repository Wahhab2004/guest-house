import RoomInformation from "@/components/admin/dasbor/RoomInformation";
import CurrentDate from "@/components/CurrentDate";
import GuestReservation from "@/components/admin/dasbor/GuestReservation";

export default function DashboardPage() {
	return (
		<main >
			<div className="flex flex-col px-6 mt-20">
				{/* Title */}
				<h1 className=" text-xl font-bold mt-6 ">
					Dashboard
				</h1>

				{/* c */}
				<CurrentDate />
			</div>
	

			<RoomInformation />
			<GuestReservation />
		</main>
	);
}
