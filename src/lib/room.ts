import Cookies from "js-cookie";
import { Room } from "@/fetching";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

/* CREATE */
export async function createRoom(payload: Omit<Room, "id">) {
	const token = Cookies.get("token");
	const res = await fetch(`${baseUrl}/rooms`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(payload),
	});
	if (!res.ok) throw new Error("Gagal menambah kamar");
	return res.json();
}

/* UPDATE */
export async function updateRoom(id: string, payload: Partial<Room>) {
	const token = Cookies.get("token");
	const res = await fetch(`${baseUrl}/rooms/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(payload),
	});
	if (!res.ok) throw new Error("Gagal update kamar");
	return res.json();
}

/* DELETE */
export async function deleteRoom(id: string) {
	const token = Cookies.get("token");
	const res = await fetch(`${baseUrl}/rooms/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (!res.ok) throw new Error("Gagal hapus kamar");
	return true;
}
