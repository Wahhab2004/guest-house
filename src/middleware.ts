import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
  id: string;
  type: "admin" | "guest";
  iat: number;
  exp: number;
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Ambil token dari cookie

  // Kalau tidak ada token
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    // Proteksi: Guest tidak bisa ke /dasbor dan /guest-reservation
    if (
      decoded.type === "guest" &&
      (req.nextUrl.pathname.startsWith("/dasbor") ||
        req.nextUrl.pathname.startsWith("/guest-reservation"))
    ) {
      return NextResponse.redirect(new URL("/", req.url)); // redirect ke home
    }
  } catch (error) {
    console.error("Token invalid:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Aktifkan middleware di route tertentu
export const config = {
  matcher: ["/dasbor/:path*", "/guest-reservation/:path*"], // path yang dicek
};
