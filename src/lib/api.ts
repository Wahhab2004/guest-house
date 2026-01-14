import { RequestInit } from "next/dist/server/web/spec-extension/request";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiFetch(url: string, options?: RequestInit) {
	const res = await fetch(`${API_URL}${url}`, {
		headers: {
			"Content-Type": "application/json",
			...options?.headers,
		},
		...options,
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Terjadi kesalahan di server");
	}

	return data;
}
