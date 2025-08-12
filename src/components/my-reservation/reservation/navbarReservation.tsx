import { usePathname } from "next/navigation";
import { JSX } from "react";

interface NavbarReservationProps {
	handleNavigate: (section: string) => void;
	renderSection: () => JSX.Element;
	activeSection: string;
}

export default function NavbarReservation({
	handleNavigate,
	renderSection,
	activeSection,
}: NavbarReservationProps) {
	const pathName = usePathname();

	return (
		<nav className="mt-32 w-11/12 mx-auto">
			<ul className="flex justify-evenly items-center text-sm flex-wrap lg:text-base">
				{/* order-details" || activeSection === "personal-info" */}
				<button onClick={() => handleNavigate("order-details")}>
					<div className="flex items-center">
						<div className="border border-blue-600 rounded-full p-0.5 ">
							<div
								className={`w-5 h-5 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-blue-600 font-semibold ${
									activeSection === "order-details" || pathName === "/my-reservations/reservations"
										? "bg-blue-600 text-white"
										: ""
								}`}
							>
								1
							</div>
						</div>
						<li className="ml-2 text-blue-600">Order Detail</li>

						<div className="w-10 h-[0.5px] bg-blue-600 ml-2 lg:w-24"></div>
					</div>
				</button>

				{/* Payment */}
				<button onClick={() => handleNavigate("payment")}>
					<div className="flex items-center">
						<div className="border border-blue-600 rounded-full p-0.5">
							<div
								className={`w-5 h-5 rounded-full lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-blue-600 font-semibold ${
									activeSection === "payment" ? "bg-blue-600 text-white" : ""
								}`}
							>
								2
							</div>
						</div>
						<li className="ml-2 text-blue-600">Payment and Confirmation</li>

						<div className="w-10 h-[0.5px] bg-blue-600 ml-2 lg:w-24"></div>
					</div>
				</button>

				{/* Summary */}
				<button onClick={() => handleNavigate("summary-booking")}>
					<div className="flex items-center">
						<div className="border border-blue-600 rounded-full p-0.5">
							<div
								className={`w-5 h-5 rounded-full lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-blue-600 font-semibold ${
									activeSection === "summary-booking"
										? "bg-blue-600 text-white"
										: ""
								}`}
							>
								3
							</div>
						</div>
						<li className="ml-2 text-blue-600">Summary Booking</li>
					</div>
				</button>
			</ul>

			{renderSection()}
		</nav>
	);
}
