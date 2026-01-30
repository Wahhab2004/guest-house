// Reservation Form //

import {
	AdditionalGuest,
	PaymentMethod,
	PaymentStatus,
	ReservationStatus,
} from "./prisma";

import { AdditionalGuests } from "@/fetching";

// Create Reservation Form
export interface ReservationForm {
	guestId: string;
	roomId: string;
	checkIn: string;
	checkOut: string;
	adultCount: number;
	childCount: number;
	additionalGuests: AdditionalGuest[];
}

// Edit Reservation Form
export interface EditReservationForm {
	id: string;
	guestId: string;
	roomId: string;
	checkIn: string;
	checkOut: string;
	additionalGuests: AdditionalGuests[];
	status?: ReservationStatus;
	paymentStatus?: PaymentStatus;
	paymentMethod?: PaymentMethod;
	paymentSender?: string;
	finalPrice?: number;
	discountAmount?: number;
	subTotalPrice?: number;
}
