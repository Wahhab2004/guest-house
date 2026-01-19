export enum Gender {
	Male = "Male",
	Female = "Female",
}

export enum RoomStatus {
	AVAILABLE = "AVAILABLE",
	BOOKED = "BOOKED",
	OVERNIGHT = "OVERNIGHT",
}

export enum ReservationStatus {
	PENDING = "PENDING",
	CONFIRMED = "CONFIRMED",
	ACTIVE = "ACTIVE",
	CANCELED = "CANCELED",
	CHECKED_OUT = "CHECKED_OUT",
}

export enum PaymentMethod {
	TRANSFER = "TRANSFER",
	E_WALLET = "E_WALLET",
	CASH = "CASH",
}

export enum PaymentStatus {
	PAID = "PAID",
	HALF_PAID = "HALF_PAID",
	UNPAID = "UNPAID",
	REFUNDED = "REFUNDED",
}

export enum PriceCategory {
	FREE = "FREE",
	HALF = "HALF",
	FULL = "FULL",
}

// Guest
export interface Guest {
	id: string;
	name: string;
	username?: string | null;
	email?: string | null;
	phone?: string | null;
	passport?: string | null;
	dateOfBirth?: string | null;
	country?: string | null;
	gender?: Gender | null;
	createdAt: string;

	bookedReservations?: Reservation[];
	stayedReservations?: Reservation[];
}

// Room
export interface Room {
	id: string;
	name: string;
	description: string;
	price: number;
	status: RoomStatus;
	photoUrl?: string | null;

	reservations?: Reservation[];
}

// Reservation
export interface Reservation {
	id: string;

	/* Relations */
	bookerId?: string | null;
	bookerAdminId?: string | null;
	guestId?: string | null;
	roomId: string;

	/* Core */
	checkIn: string;
	checkOut: string;
	guestTotal: number;
	adultCount: number;
	childCount: number;
	totalPrice: number;
	status: ReservationStatus;

	createdAt: string;

	/* Nested */
	guest?: Guest;
	room?: Room;
	additionalGuests?: AdditionalGuest[];
	payment?: Payment;
	feedback?: Feedback;
	calendars?: Calendar[];
}

// Additional Guest
export interface AdditionalGuest {
	id: string;
	reservationId: string;
	name: string;
	passport?: string | null;
	dateOfBirth?: string | null;
	gender?: Gender | null;
	priceCategory?: PriceCategory | null;
}

// Payment
export interface Payment {
	id: string;
	reservationId: string;
	method: PaymentMethod;
	status: PaymentStatus;
	amount: number;
	proofUrl?: string | null;
	paidAt?: string | null;
	sender?: string | null;
}

// Calendar
export interface Calendar {
	id: string;
	roomId: string;
	date: string;
	reservationId?: string | null;
}

// Feedback
export interface Feedback {
	id: string;
	reservationId: string;
	rating: number;
	comment?: string | null;
	createdAt: string;
}

// Auth
export interface AuthenticationGuest {
	id: string;
	guestId: string;
	username: string;
	password: string;
}

export interface AuthenticationAdmin {
	id: string;
	adminId: string;
	username: string;
	password: string;
}

// Finance
export interface Finance {
	id: string;
	date: string;
	income: number;
	refund: number;
	netIncome: number;
	note?: string | null;
}
