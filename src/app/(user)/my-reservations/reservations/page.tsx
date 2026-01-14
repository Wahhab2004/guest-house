
import ReservationPage from "@/components/my-reservation/reservation/reservation";
import { Suspense } from "react";

export default function Page() {
	return (
		<Suspense fallback={<div>Loading reservation...</div>}>
			<ReservationPage />
		</Suspense>
	);
}
