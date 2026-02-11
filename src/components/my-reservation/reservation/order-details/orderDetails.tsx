import { Reservation } from "@/fetching";
import BookingDetails from "./bookingDetails";
import PersonalInfo from "./personalInfo";

interface OrderDetailsProps {
	reservation: Reservation | null;
	handleNavigate: (section: string) => void;
	onReservationUpdate: (updateReservation: Reservation | null) => void;
}

export default function OrderDetails({
	reservation,
	handleNavigate,
	onReservationUpdate,
}: OrderDetailsProps) {
	return (
		<section className="my-10 mb-20">
			<div className="flex justify-between gap-4">
				{/* Orderer Details */}
				<div className="w-[70%] bg-white rounded-lg shadow-lg border">
					<PersonalInfo
						reservation={reservation}
						handleNavigate={handleNavigate}
						onReservationUpdate={onReservationUpdate}
					/>
				</div>

				{/* Room Details */}
				<div className="bg-white rounded-lg shadow-lg border w-[40%]">
					<BookingDetails
						reservation={reservation}
						handleNavigate={handleNavigate}
					/>
				</div>
			</div>
		</section>
	);
}
