import Image from "next/image";
import { Reservation } from "@/fetching";
import { FormatTanggalIndoUser } from "@/components/formatTanggalIndo";

interface BookingDetailsProps {
	reservation: Reservation | null;
	handleNavigate: (section: string) => void;
}

export default function BookingDetails({
	reservation,
	handleNavigate,
}: BookingDetailsProps) {
	

	return (
		<section className="my-10" id="booking-details">
			<main>
				{/* Heading */}
				<h1 className="text-xl lg:text-3xl font-bold text-center mt-10 text-blue-900">
					Booking Details
				</h1>
				<p className="text-center text-gray-400 mb-4">
					Please check your booking details below
				</p>

				<Image
					src={
						reservation?.room.image
							? reservation.room.image
							: "/images/rooms/room-2.png"
					}
					width={1000}
					height={1000}
					alt="booking details"
					className="w-[90%] h-[300px] mx-auto rounded-lg shadow-lg object-cover lg:w-[90%] lg:h-[250px] lg:mt-10"
				/>

				<div className="lg:flex lg:justify-center mt-6 gap-2">
					{/* Booking Details */}
					<div className="w-[45%]">
						<div>
							<h3 className="font-medium text-gray-600">Check-in date</h3>
							<p className="text-medium mb-2">
								{reservation?.checkInDate
									? FormatTanggalIndoUser(reservation.checkInDate)
									: "-"}
							</p>
						</div>
						<div>
							<h3 className="font-medium text-gray-600">Check-out date</h3>
							<p className="text-medium mb-2">
								{reservation?.checkOutDate
									? FormatTanggalIndoUser(reservation.checkOutDate)
									: "-"}
							</p>
						</div>

						<div>
							<h3 className="font-medium text-gray-600">Type of Room</h3>
							<p className="text-medium mb-2">
								{reservation?.idRoom ? reservation.idRoom : "-"}
							</p>
						</div>
						<div>
							<h3 className="font-medium text-gray-600">Number of Guest</h3>
							<p className="text-medium mb-2">
								{reservation?.numOfGuests}
								{reservation?.numOfGuests
									? reservation?.numOfGuests > 0
										? " Guests"
										: " Guest"
									: "-"}
							</p>
						</div>

						<div className="h-[1px] w-full bg-black"></div>
						<div className="flex justify-between mt-4">
							<h3 className="font-medium text-gray-600">Total Payment</h3>
							<p className="font-bold">¥{reservation?.totalPayment}</p>
						</div>
					</div>

					{/* Cancelletion & Refund Policy */}
					<div className=" text-orange-700 lg:w-[40%] mt-10 lg:mt-0">
						<h2 className="text-xs font-semibold mb-2">
							Cancellation & Refund Policy
						</h2>
						<ul className="list-disc list-outside text-xs ml-6 leading-4">
							<li>
								2 Days Before Check-In: You can cancel your booking and receive
								a full refund.
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
				</div>
			</main>
		</section>
	);
}
