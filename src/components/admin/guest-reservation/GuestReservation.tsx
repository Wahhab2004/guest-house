import ConvertDate from "@/components/ConvertDate";
import { Reservation } from "@/fetching";
import Link from "next/link";


type GuestReservationProps = {
    getPaginatedData: () => Reservation[];
    handleStatusChange: (id: string, newStatus: string) => void;
    handleCheckStatusChange: (id: string, newStatus: string) => Promise<void>;
  };

export default function GuestReservationTable({
    handleCheckStatusChange,
    handleStatusChange,
    getPaginatedData,
}: GuestReservationProps) {
	return (
		<div className="ml-[235px] border shadow rounded-lg p-4 w-[83%]">
			<table className="w-full text-left mt-2 tracking-wide">
				<thead>
					<tr>
						{[
							"Reservation ID",
							"Guest Name",
							"Date/Time Reservation",
							"Total Amount Paid",
							"Payment Method",
							"Number of Guests",
							"Reservation Detail",
							"Check Status",
							"Payment Status",
							"Change Status Payment",
							"Confirm Check In/Out",
						].map((header, idx) => (
							<th key={idx} className="text-[#5D6679] font-semibold text-sm">
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{getPaginatedData().length > 0 ? (
						getPaginatedData().map((reservation) => (
							<tr
								key={reservation.id}
								className="text-gray-400 text-sm border-b"
							>
								<td className="py-4">{reservation.id}</td>
								<td className="py-4">{reservation.guest.name}</td>
								<td className="py-4">
									{ConvertDate(reservation.checkOutDate)}
								</td>
								<td className="py-4">{reservation.payment.totalAmountPaid}</td>
								<td className="py-4">{reservation.payment.paymentMethod}</td>
								<td className="py-4">{reservation.numOfGuests}</td>
								<td className="p-2 text-blue-600 text-xs">
									<Link href={`/checkout/${reservation.id}`}> See detail</Link>
								</td>

								<td className="py-4">
									{reservation.checkStatus === "checked in" ? (
										<span className="text-green-500 bg-green-100 p-1 rounded px-2">
											{reservation.checkStatus}
										</span>
									) : reservation.checkStatus === "checked out" ? (
										<span className="text-red-500 bg-red-100 p-1 rounded px-2">
											{reservation.checkStatus}
										</span>
									) : (
										<span className="text-gray-400">
											{reservation.checkStatus}
										</span>
									)}
								</td>

								<td className="py-4">
									{reservation.paymentStatus === "paid" ? (
										<span className="text-green-500 bg-green-100 p-1 rounded px-2">
											{reservation.paymentStatus}
										</span>
									) : reservation.paymentStatus === "pending payment" ? (
										<span className="text-orange-500 bg-orange-100 p-1 rounded px-2">
											{reservation.paymentStatus}
										</span>
									) : reservation.paymentStatus === "pending verification" ? (
										<span className="text-red-500 bg-red-100 p-1 rounded px-2">
											{reservation.paymentStatus}
										</span>
									) : (
										<span className="text-gray-400">
											{reservation.paymentStatus}
										</span>
									)}
								</td>

								<td>
									<select
										name="payment-status"
										id="payment-status"
										value={reservation.paymentStatus}
										onChange={(e) =>
											handleStatusChange(reservation.id, e.target.value)
										}
										className="p-2 border rounded text-[#5D6679] text-xs"
									>
										<option value="paid" className="p-2 text-[#5D6679] text-xs">
											paid
										</option>
										<option
											value="pending payment"
											className="p-2 text-[#5D6679] text-xs"
										>
											pending payment
										</option>
										<option
											value="pending verification"
											className="p-2 text-[#5D6679] text-xs"
										>
											pending verification
										</option>
									</select>
								</td>

								{/* CONFIRM CHECK IN/OUT */}
								<td>
									<div className="flex flex-col items-start">
										<div className="flex items-center gap-2">
											<input
												type="radio"
												name={`${reservation.id}`}
												value="checkin"
												checked={reservation.checkStatus === "checked-in"}
												onChange={(e) =>
													handleCheckStatusChange(reservation.id, "checkin")
												}
											/>
											<span>Check In</span>
										</div>

										<div className="flex items-center gap-2">
											<input
												type="radio"
												name={`${reservation.id}`}
												value="checkout"
												checked={reservation.checkStatus === "checked-out"}
												onChange={(e) =>
													handleCheckStatusChange(reservation.id, "checkout")
												}
											/>
											<span>Check Out</span>
										</div>
									</div>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td className="p-4 text-center text-gray-500" colSpan={13}>
								No reservations found.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
