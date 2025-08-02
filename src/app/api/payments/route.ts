import { NextRequest, NextResponse } from "next/server";
import {
	retrieveData,
	retrieveDataById,
	saveData,
	updateData,
	deleteData,
} from "@/lib/service"; 
import { generatePaymentIds } from "@/components/generateId";
import { Payments } from "@/fetching";

// ✅ [GET] Ambil semua data atau detail pembayaran berdasarkan id
export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	if (id) {
		const detailPayment = await retrieveDataById("Payments", id);
		if (detailPayment) {
			return NextResponse.json({
				status: 200,
				message: "Success",
				data: detailPayment,
			});
		}

		return NextResponse.json({
			status: 404,
			message: "Payment Not Found",
			data: {},
		});
	}

	const payments = await retrieveData("Payments");
	return NextResponse.json({
		status: 200,
		message: "Success",
		data: payments,
	});
}

// ✅ [POST] Tambah pembayaran baru
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		if (!body.paymentStatus) {
			return NextResponse.json({
				status: 400,
				message: "Missing required fields",
				data: {},
			});
		}

		const newPayment: Payments = {
			id: await generatePaymentIds(),
			...body,
		};

		await saveData("Payments", newPayment);

		return NextResponse.json({
			status: 201,
			message: "Payment created",
			data: body,
		});
	} catch (error) {
		console.error("Error creating payment:", error);
		return NextResponse.json({
			status: 500,
			message: "Internal Server Error",
			data: {},
		});
	}
}

// ✅ [PUT] Perbarui data pembayaran berdasarkan ID
export async function PUT(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json({
				status: 400,
				message: "Missing ID",
				data: {},
			});
		}

		const updates = await request.json();
		const existingPayment = await retrieveDataById("Payments", id);

		if (!existingPayment) {
			return NextResponse.json({
				status: 404,
				message: "Payment Not Found",
				data: {},
			});
		}

		const updatedPayment = { ...existingPayment, ...updates };
		await updateData("Payments", id, updatedPayment);

		return NextResponse.json({
			status: 200,
			message: "Payment Updated",
			data: updatedPayment,
		});
	} catch (error) {
		console.error("Error updating payment:", error);
		return NextResponse.json({
			status: 500,
			message: "Internal Server Error",
			data: {},
		});
	}
}

// ✅ [DELETE] Hapus data pembayaran berdasarkan ID
export async function DELETE(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json({
				status: 400,
				message: "Missing ID",
				data: {},
			});
		}

		const existing = await retrieveDataById("Payments", id);
		if (!existing) {
			return NextResponse.json({
				status: 404,
				message: "Payment Not Found",
				data: {},
			});
		}

		await deleteData("Payments", id);

		return NextResponse.json({
			status: 200,
			message: "Payment Deleted",
			data: {},
		});
	} catch (error) {
		console.error("Error deleting payment:", error);
		return NextResponse.json({
			status: 500,
			message: "Internal Server Error",
			data: {},
		});
	}
}
