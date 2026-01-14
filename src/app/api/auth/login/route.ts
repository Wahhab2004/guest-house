import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const body = await req.json();

	const res = await fetch("https://be-guesthouse.vercel.app/api/login-admin", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});

	const data = await res.json();

	if (!res.ok) {
		return NextResponse.json({ message: data.message }, { status: res.status });
	}

	const response = NextResponse.json({
		message: data.message,
		user: data.user,
	});

	response.cookies.set("admin_token", data.token, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/",
		maxAge: 60 * 60 * 24 * 7, // 7 hari
	});

	return response;
}
