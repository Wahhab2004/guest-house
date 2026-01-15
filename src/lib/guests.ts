import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getGuests = async (params?: {
	search?: string;
	page?: number;
	limit?: number;
}) => {
	const res = await axios.get(`${API_URL}/guests`, { params });
	return res.data;
};

export const getGuestById = async (id: string) => {
	const res = await axios.get(`${API_URL}/guests/${id}`);
	return res.data;
};

export const createGuest = async (payload: any) => {
	const res = await axios.post(`${API_URL}/guests`, payload);
	return res.data;
};

export const updateGuest = async (id: string, payload: any) => {
	const res = await axios.put(`${API_URL}/guests/${id}`, payload);
	return res.data;
};

export const deleteGuest = async (id: string) => {
	const res = await axios.delete(`${API_URL}/guests/${id}`);
	return res.data;
};
