interface NavbarReservationProps {
	handleNavigate: (section: string) => void;
	renderSection: () => React.JSX.Element | null;
	activeSection: string;
	canAccess: {
		orderDetails: boolean;
		payment: boolean;
		summary: boolean;
	};
}

export default function NavbarReservation({
	handleNavigate,
	renderSection,
	activeSection,
	canAccess,
}: NavbarReservationProps) {
	return (
		<nav className="mt-32 w-11/12 mx-auto">
			<ul className="flex justify-evenly items-center text-sm flex-wrap lg:text-base">
				{/* Order Details */}
				<button
					onClick={() =>
						canAccess.orderDetails && handleNavigate("order-details")
					}
					disabled={!canAccess.orderDetails}
					className={
						!canAccess.orderDetails ? "opacity-50 cursor-not-allowed" : ""
					}
				>
					<div className="flex items-center">
						<div className="border border-blue-600 rounded-full p-0.5">
							<div
								className={`w-5 h-5 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-semibold ${
									activeSection === "order-details"
										? "bg-blue-600 text-white"
										: "text-blue-600"
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
				<button
					onClick={() => canAccess.payment && handleNavigate("payment")}
					disabled={!canAccess.payment}
					className={!canAccess.payment ? "opacity-50 cursor-not-allowed" : ""}
				>
					<div className="flex items-center">
						<div className="border border-blue-600 rounded-full p-0.5">
							<div
								className={`w-5 h-5 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-semibold ${
									activeSection === "payment"
										? "bg-blue-600 text-white"
										: "text-blue-600"
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
				<button
					onClick={() => canAccess.summary && handleNavigate("summary-booking")}
					disabled={!canAccess.summary}
					className={!canAccess.summary ? "opacity-50 cursor-not-allowed" : ""}
				>
					<div className="flex items-center">
						<div className="border border-blue-600 rounded-full p-0.5">
							<div
								className={`w-5 h-5 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-semibold ${
									activeSection === "summary-booking"
										? "bg-blue-600 text-white"
										: "text-blue-600"
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
