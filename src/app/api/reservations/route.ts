import { Account, Payments, Reservation, Room } from "@/fetching";
import { retrieveData, retrieveDataById } from "@/lib/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		// Jika ada ID, ambil data spesifik
		if (id) {
			const reservation = await retrieveDataById<Reservation>("Reservations", String(id));

			if (!reservation) {
				return NextResponse.json({
					status: 404,
					message: "Reservation Not Found",
					data: {},
				});
			}

			// Ambil data tambahan (join query manual)
			const payment = await retrieveDataById<Payments>("Payments", reservation.idPayment);
			const room = await retrieveDataById<Room>("Rooms", reservation.idRoom);
			const guest = await retrieveDataById<Account>("Account", reservation.idAccount);

			return NextResponse.json({
				status: 200,
				message: "Success",
				data: {
					...reservation,
					payment: payment || null, // Jika undefined, return null agar lebih aman
					room: room || null,
					guest: guest || null,
				},
			});
		}

		// Jika tidak ada ID, ambil semua reservasi
		const reservations = await retrieveData<Reservation>("Reservations");


		// Ambil detail tambahan dari koleksi lain
		const detailedReservations = await Promise.all(
			reservations.map(async (res) => {
				const payment = await retrieveDataById<Payments>("Payments", res.idPayment);
				const room = await retrieveDataById<Room>("Rooms", res.idRoom);
				const guest = await retrieveDataById<Account>("Account", res.idAccount);

				return {
					...res,
					payment: payment || null,
					room: room || null,
					guest: guest || null,
				};
			})
		);

		return NextResponse.json({
			status: 200,
			message: "Success",
			data: detailedReservations,
		});
	} catch (error) {
		console.error("Error fetching reservations:", error);
		return NextResponse.json({
			status: 500,
			message: "Internal Server Error",
			data: {},
		});
	}
}
