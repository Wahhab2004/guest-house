// Room
export interface Room {
	pricePerNight: number;
	image: string;
	id: string;
	rating: number;
	roomNumber: string;
	roomStatus: string;
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
	checkStatus: string;
	numOfGuests: number;
	// Nanti mungkin bisa diubah
	confirmedCheckout: { seconds: number; nanoseconds: number };
	confirmedCheckin: { seconds: number; nanoseconds: number };
	dateReservation: { seconds: number; nanoseconds: number };
	id: string;
	idAccount: string;
	idPayment: string;
	guest: Account;
	idRoom: string;
	room: Room;
	payment: Payments;
	idGuest: string;
	checkInDate: { seconds: number; nanoseconds: number };
	checkOutDate: { seconds: number; nanoseconds: number };
	paymentId: string;
	paymentStatus: string;
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

export const fetchRooms = async (): Promise<Room[]> => {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
		const response = await fetch(`${baseUrl}/room`, {
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
		const response = await fetch(`${baseUrl}/room?id=${id}`, {
			cache: "no-store",
		});
		const jsonData = await response.json();

		return jsonData.data as Room;
	} catch (error) {
		console.error("Error fetching room by ID:", error);
		return null;
	}
};
