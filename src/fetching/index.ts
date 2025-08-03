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
	idReservation: string;
	totalAmountPaid: number;
	paymentMethod: string;
	paymentStatus: string;
	proofOfPayment: string;
	sender: string;
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
	confirmedCheckout: any;
	confirmedCheckin: any;
	checkStatus: string;
	numOfGuests: number;
	dateReservation: string;
	id: string;
	idAccount: string;
	idPayment: string;
	guest: Account;
	idRoom: string;
	room: Room;
	payment: Payments;
	checkInDate: string;
	checkOutDate: string;
	paymentStatus: string;
	totalPayment: number;
}

// Account
export interface Account {
	id: string;
	name: string;
	username: string;
	gender: string;
	dataOfBirth: string;
	phoneNumber: string;
	photoProfile: string;
	email: string;
	password: string;
	passport: string;
	country: string;
	role: string;
}

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
		const response = await fetch(`${baseUrl}/reservations?id=${id}`, {
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

export const fetchAccount = async (): Promise<Account[]> => {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
		const response = await fetch(`${baseUrl}/guests`, {
			cache: "no-store",
		});
		const jsonData = await response.json();

		return jsonData.data as Account[];
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
