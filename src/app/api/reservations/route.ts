import { Account, Payments, Reservation, Room } from "@/fetching";
import { deleteData, retrieveData, retrieveDataById, saveData, updateData } from "@/lib/service";
import { NextRequest, NextResponse } from "next/server";

// Mengambil data
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		// Jika ada ID, ambil data spesifik
		if (id) {
			const reservation = await retrieveDataById<Reservation>(
				"Reservations",
				String(id)
			);

			if (!reservation) {
				return NextResponse.json({
					status: 404,
					message: "Reservation Not Found",
					data: {},
				});
			}

			// Ambil data tambahan (join query manual)
			const payment = await retrieveDataById<Payments>(
				"Payments",
				reservation.idPayment
			);
			const room = await retrieveDataById<Room>("Rooms", reservation.idRoom);
			const guest = await retrieveDataById<Account>(
				"Account",
				reservation.idAccount
			);

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
				const payment = await retrieveDataById<Payments>(
					"Payments",
					res.idPayment
				);
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

// Membuat data
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		// Validasi sederhana
		if (!body.idPayment || !body.idRoom || !body.idAccount) {
			return NextResponse.json({
				status: 400,
				message: "Missing required fields",
				data: {},
			});
		}

		const newReservation: Reservation = {
			id: crypto.randomUUID(),
			idPayment: body.idPayment,
			idRoom: body.idRoom,
			idAccount: body.idAccount,
			checkInDate: body.checkintDate || null,
			checkOutDate: body.checkoutDate || null,
			checkStatus: body.checkStatus || null,
			numGuests: body.numGuests || 0,

			confirmedCheckin: body.confirmedCheckin || null,
			confirmedCheckout: body.confirmedCheckin || null,
			dateReservation: {
				seconds: 0,
				nanoseconds: 0,
			},

			guest: {
				id: "",
				name: "",
				username: "",
				gender: "",
				dataOfBirth: "",
				phoneNumber: "",
				photoProfile: "",
				email: "",
				password: "",
				passport: "",
				country: "",
				role: "",
			},

			room: {
				id: "",
				pricePerNight: 0,
				image: "",
				rating: 0,
				roomNumber: "",
				roomStatus: "",
			},

			payment: {
				id: "",
				idReservation: "",
				totalAmountPaid: 0,
				paymentMethod: "",
				paymentStatus: "",
				proofOfPayment: "",
				sender: "",
			},

			idGuest: "",
			paymentId: "",
			paymentStatus: "",
		};

		await saveData("Reservations", newReservation); // kamu bisa sesuaikan dengan fungsimu

		return NextResponse.json({
			status: 201,
			message: "Reservation Created",
			data: newReservation,
		});
	} catch (error) {
		console.error("Error creating reservation:", error);
		return NextResponse.json({
			status: 500,
			message: "Internal Server Error",
			data: {},
		});
	}
}

// Memperbarui data
export async function PUT(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");
		if (!id) {
			return NextResponse.json({ status: 400, message: "Missing ID", data: {} });
		}

		const updates = await request.json();
		const existing = await retrieveDataById<Reservation>("Reservations", id);
		if (!existing) {
			return NextResponse.json({ status: 404, message: "Reservation Not Found", data: {} });
		}

		const updatedReservation = { ...existing, ...updates };

		await updateData("Reservations", id, updatedReservation); // kamu sesuaikan nama fungsi

		return NextResponse.json({
			status: 200,
			message: "Reservation Updated",
			data: updatedReservation,
		});
	} catch (error) {
		console.error("Error updating reservation:", error);
		return NextResponse.json({
			status: 500,
			message: "Internal Server Error",
			data: {},
		});
	}
}

// Menghapus data
export async function DELETE(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json({ status: 400, message: "Missing ID", data: {} });
		}

		const existing = await retrieveDataById<Reservation>("Reservations", id);
		if (!existing) {
			return NextResponse.json({ status: 404, message: "Reservation Not Found", data: {} });
		}

		await deleteData("Reservations", id); // sesuaikan fungsi delete-mu

		return NextResponse.json({
			status: 200,
			message: "Reservation Deleted",
			data: {},
		});
	} catch (error) {
		console.error("Error deleting reservation:", error);
		return NextResponse.json({
			status: 500,
			message: "Internal Server Error",
			data: {},
		});
	}
}
