// Room
export interface Room {
	id: string;
	name: string;
	description: string;
	price: number;
	status: string;
	photoUrl: string;
}

// Payment
export interface Payments {
	id: string;
	reservationId: string;
	method: string;
	status: string;
	amount: number;
	proofUrl: string;
}

// Review
export interface Review {
	id: string;
	idReservation: string;
	idRoom: string;
	idAccount: string;
	rating: number;
	review: string;
	reviewDate: Date;
}

// Reservation
export interface Reservation {
	id: string;
	guestId: string;
	roomId: string;
	checkIn: string;
	checkOut: string;
	guestTotal: number;
	totalPrice: number;
	status: string;
	guest: Guest;
	room: Room;
	Payment: Payments;
	createdAt: string;
}

// Account
export interface Guest {
	id: string;
	name: string;
	username: string;
	email: string;
	phone: string;
	password: string;
	passport: string;
	dateOfBirth: string;
	country: string;
	gender: string;

}

export interface FetchParams {
	search?: string;
	status?: string;
	sort_by?: string;
	order?: string;
}


export const fetchFilteredReservations = async (): Promise<Reservation[]> => {
	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

	const res = await fetch(`${baseUrl}/reservations`, {
		cache: "no-store",
		headers: {
		
		},
	});

	if (!res.ok) throw new Error("Failed to fetch reservations");

	const json = await res.json();
	return json.data;
};

export const fetchReservations = async (): Promise<Reservation[]> => {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
		const response = await fetch(`${baseUrl}/reservations`, {
			cache: "no-store",
		});
		const jsonData = await response.json();

		return jsonData.data as Reservation[];
	} catch (error) {
		console.error("Error fetching reservations:", error);
		return [];
	}
};

export const fetchReservationById = async (
	id: string
): Promise<Reservation | null> => {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
		const response = await fetch(`${baseUrl}/reservations/${id}`, {
			cache: "no-store",
		});
		const jsonData = await response.json();

		return jsonData.data as Reservation;
	} catch (error) {
		console.error("Error fetching reservation by ID:", error);
		return null;
	}
};

export const fetchRooms = async (): Promise<Room[]> => {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
		const response = await fetch(`${baseUrl}/rooms`, {
			cache: "no-store",
		});
		const jsonData = await response.json();

		return jsonData.data as Room[];
	} catch (error) {
		console.error("Error fetching rooms:", error);
		return [];
	}
};

export const fetchRoomById = async (id: string): Promise<Room | null> => {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
		const response = await fetch(`${baseUrl}/rooms/${id}`, {
			cache: "no-store",
		});
		const jsonData = await response.json();

		return jsonData.data as Room;
	} catch (error) {
		console.error("Error fetching room by ID:", error);
		return null;
	}
};

export const fetchAccount = async (): Promise<Guest[]> => {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
		const response = await fetch(`${baseUrl}/guests`, {
			cache: "no-store",
		});
		const jsonData = await response.json();

		return jsonData.data as Guest[];
	} catch (error) {
		console.error("Error fetching reservations:", error);
		return [];
	}
};

export const fetchPayments = async (): Promise<Payments[]> => {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
		const response = await fetch(`${baseUrl}/payments`, {
			cache: "no-store",
		});
		const jsonData = await response.json();

		return jsonData.data as Payments[];
	} catch (error) {
		console.error("Error fetching reservations:", error);
		return [];
	}
};
