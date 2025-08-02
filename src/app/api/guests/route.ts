import { NextRequest, NextResponse } from "next/server";
import {
	retrieveData,
	retrieveDataById,
	saveData,
	updateData,
	deleteData,
} from "@/lib/service"; // ganti sesuai path-mu
import { Account } from "@/fetching";
import { generateGuestId } from "@/components/generateId";

// ✅ GET: Ambil semua data Account / satu data Account (jika ada id)
export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	if (id) {
		const account = await retrieveDataById("Account", id);
		if (account) {
			return NextResponse.json({
				status: 200,
				message: "Success",
				data: account,
			});
		}
		return NextResponse.json({
			status: 404,
			message: "Account Not Found",
			data: {},
		});
	}

	const allAccounts = await retrieveData("Account");
	return NextResponse.json({
		status: 200,
		message: "Success",
		data: allAccounts,
	});
}

// ✅ POST: Tambah data Account baru
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

        // Validasi input
        // Pastikan semua field yang diperlukan ada
		if (!body.name) {
			return NextResponse.json({
				status: 400,
				message: "Missing required fields",
				data: {},
			});
		}

		const newAccount: Account = {
			id: await generateGuestId(),
			...body,
		};

		await saveData("Account", newAccount);

		return NextResponse.json({
			status: 201,
			message: "Account created",
			data: body,
		});
	} catch (error) {
		console.error("Error creating account:", error);
		return NextResponse.json({
			status: 500,
			message: "Internal Server Error",
			data: {},
		});
	}
}

// ✅ PUT: Update data Account
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
		const existingAccount = await retrieveDataById("Account", id);

		if (!existingAccount) {
			return NextResponse.json({
				status: 404,
				message: "Account Not Found",
				data: {},
			});
		}

		const updatedAccount = { ...existingAccount, ...updates };
		await updateData("Account", id, updatedAccount);

		return NextResponse.json({
			status: 200,
			message: "Account Updated",
			data: updatedAccount,
		});
	} catch (error) {
		console.error("Error updating account:", error);
		return NextResponse.json({
			status: 500,
			message: "Internal Server Error",
			data: {},
		});
	}
}

// ✅ DELETE: Hapus Account berdasarkan ID
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

		const existing = await retrieveDataById("Account", id);
		if (!existing) {
			return NextResponse.json({
				status: 404,
				message: "Account Not Found",
				data: {},
			});
		}

		await deleteData("Account", id);
		return NextResponse.json({
			status: 200,
			message: "Account Deleted",
			data: {},
		});
	} catch (error) {
		console.error("Error deleting account:", error);
		return NextResponse.json({
			status: 500,
			message: "Internal Server Error",
			data: {},
		});
	}
}
