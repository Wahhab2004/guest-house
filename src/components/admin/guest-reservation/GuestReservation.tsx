import formatDateIndo from "@/components/format-tanggal/formatTanggal";
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
							"RESERVATION ID",
							"GUEST NAME",
							"DATE/TIME RESERVATION",
							"TOTAL PAYMENT",
							"PAYMENT METHOD",
							"GUESTS",
							"PAYMENT STATUS",
							"CHANGE PAYMENT STATUS",
							"CHECK STATUS",
							"CONFIRM CHECK IN/OUT",
							"RESERVATION DETAIL",
						].map((header, idx) => (
							<th key={idx} className="text-[#5D6679] text-[10px] pr-2">
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
								className="text-gray-700 text-sm border-b"
							>
								<td className="py-4">{reservation.id}</td>
								<td className="py-4">{reservation.guest.name}</td>
								<td className="py-4">
									{formatDateIndo(reservation.checkOutDate)}
								</td>
								<td className="py-4">¥{reservation.payment.totalAmountPaid}</td>
								<td className="py-4">{reservation.payment.paymentMethod}</td>
								<td className="py-4">{reservation.numOfGuests}</td>
								<td className="py-4 text-xs">
									{reservation.paymentStatus === "paid" ? (
										<span className="text-green-900 bg-green-100 p-1 border-green-200 border rounded-lg px-2">
											{reservation.paymentStatus}
										</span>
									) : reservation.paymentStatus === "unpaid" ? (
										<span className="text-orange-900 bg-orange-100 p-1 border-orange-200 border rounded-lg px-2">
											{reservation.paymentStatus}
										</span>
									) : reservation.paymentStatus === "pending" ? (
										<span className="text-red-900 bg-yellow-100 border border-yellow-200 rounded-lg p-1  px-2">
											{reservation.paymentStatus}
										</span>
									) : (
										<span>{reservation.paymentStatus}</span>
									)}
								</td>
								<td>
									<select
										name="payment-status"
										id={`payment-status-${reservation.id}`}
										value={reservation.paymentStatus}
										onChange={(e) =>
											handleStatusChange(reservation.id, e.target.value)
										}
										className="p-2 border rounded text-[#5D6679] text-xs w-[80%]"
									>
										{["paid", "unpaid", "pending"].map(
											(status) => (
												<option key={status} value={status}>
													{status.charAt(0).toUpperCase() +
														status.slice(1).replace("-", " ")}
												</option>
											)
										)}
									</select>
								</td>

								<td className="py-4 w-[100px] text-xs">
									{reservation.checkStatus === "checked-in" ? (
										<span className="text-green-500 bg-green-100 p-1 rounded px-2">
											{reservation.checkStatus}
										</span>
									) : reservation.checkStatus === "checked-out" ? (
										<span className="text-red-500 bg-red-100 p-1 rounded px-2">
											{reservation.checkStatus}
										</span>
									) : (
										""
									)}
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
												onChange={() =>
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
												onChange={() =>
													handleCheckStatusChange(reservation.id, "checkout")
												}
											/>
											<span>Check Out</span>
										</div>
									</div>
								</td>

								{/* Jangan lupa buat modal */}
								<td className="p-2 text-blue-600 text-xs">
									<Link href={`/checkout/${reservation.id}`}> See detail</Link>
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
