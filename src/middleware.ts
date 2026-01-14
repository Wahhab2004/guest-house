import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
	id: string;
	type: "admin" | "guest";
	iat: number;
	exp: number;
}

export function middleware(req: NextRequest) {
	const token = req.cookies.get("admin_token")?.value;

	// Tidak ada token → redirect ke login
	if (!token) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	try {
		const decoded = jwtDecode<JwtPayload>(token);

		// Token expired (optional tapi disarankan)
		const isExpired = decoded.exp * 1000 < Date.now();
		if (isExpired) {
			return NextResponse.redirect(new URL("/login", req.url));
		}

		// Guest dilarang akses area admin
		if (decoded.type === "guest" && req.nextUrl.pathname.startsWith("/admin")) {
			return NextResponse.redirect(new URL("/", req.url));
		}

		// Admin masuk area guest (opsional)
		if (
			decoded.type === "admin" &&
			req.nextUrl.pathname.startsWith("/guest-reservation")
		) {
			return NextResponse.redirect(new URL("/admin", req.url));
		}
	} catch (error) {
		console.error("Invalid token:", error);
		return NextResponse.redirect(new URL("/login", req.url));
	}

	return NextResponse.next();
}

/* =====================
   ROUTE YANG DIPROTEK
===================== */
export const config = {
	matcher: ["/admin/:path*", "/guest-reservation/:path*", "/dasbor/:path*"],
};
