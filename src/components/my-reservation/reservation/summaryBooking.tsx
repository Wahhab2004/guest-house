import Image from "next/image";

export default function SummaryBooking() {
	return (
		<section className="h-full my-10 mb-40" id="summary-booking">
			<main className="w-11/12 mx-auto ">
				<h1 className="text-xl lg:text-3xl font-bold text-center mt-10 text-blue-900">
					Payment Verification in Progress
				</h1>
				<Image
					src="/svg/timer.svg"
					height={64}
					width={64}
					alt="timer"
					className="mx-auto mt-10"
				/>

				<p className="mt-10 text-center text-gray-400 w-11/12 lg:w-1/2 mx-auto">
					Thank you for your payment. Your payment is being verified by our
					admin team and may take up to 1x24 hours.
				</p>

				<p className="mt-10 text-center text-gray-400 w-11/12 lg:w-1/2 mx-auto">
					You can check your reservation details on the My Reservation page once
					the verification is complete.
				</p>
			</main>
		</section>
	);
}
