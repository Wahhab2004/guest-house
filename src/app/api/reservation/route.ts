// app/api/reservations/route.ts
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const reservationsResponse = await fetch(
			"http://localhost:3000/api/reservations"
		);
		const roomsResponse = await fetch("http://localhost:3000/api/room");
		const guestsResponse = await fetch("http://localhost:3000/api/guests");
		const paymentsResponse = await fetch("http://localhost:3000/api/payments");

		const reservationsData = await reservationsResponse.json();
		const roomsData = await roomsResponse.json();
		const guestsData = await guestsResponse.json();
		const paymentsData = await paymentsResponse.json();

		// Combine data
		const combinedData = reservationsData.data.map(
			(reservation: { paymentId: string; roomId: string; guestId: string }) => {
				const room = roomsData.data.find(
					(room: { id: string }) => room.id === reservation.roomId
				);
				const guest = guestsData.data.find(
					(guest: { id: string }) => guest.id === reservation.guestId
				);
				const payment = paymentsData.data.find(
					(payment: { id: string }) => payment.id === reservation.paymentId
				);
				return {
					...reservation,
					roomDetails: room,
					guestDetails: guest,
					paymentDetails: payment,
				};
			}
		);

		return NextResponse.json(combinedData);
	} catch (error) {
		return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
	}
}
