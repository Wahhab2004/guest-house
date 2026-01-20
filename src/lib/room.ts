import Cookies from "js-cookie";
import toast from "react-hot-toast";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

/* CREATE */
export async function createRoom(data: FormData) {
	const token = Cookies.get("token");
	const res = await fetch(`${baseUrl}/rooms`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: data,
	});
	if (!res.ok) throw new Error("Gagal menambah kamar");
	return res.json();
}

/* UPDATE */
export async function updateRoom(id: string, data: FormData) {
	const token = Cookies.get("token");
	const res = await fetch(`${baseUrl}/rooms/${id}`, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: data,
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

	const result = await res.json();
	if (!res.ok) {
		toast.error(result.message || "Gagal hapus kamar");
		throw new Error("Gagal hapus kamar");
	}
	return true;
}
