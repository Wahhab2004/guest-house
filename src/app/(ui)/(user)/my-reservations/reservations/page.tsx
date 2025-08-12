// app/my-reservations/reservations/page.tsx
import ReservationsClient from "@/components/my-reservation/reservation/reservationClient";
import { Suspense } from "react";

export default function Page() {
	return (
		<Suspense fallback={<div>Loading reservation...</div>}>
			<ReservationsClient />
		</Suspense>
	);
}
