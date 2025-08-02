import { fetchAccount, fetchPayments, fetchReservations } from "@/fetching";

const generateReservationId = async (): Promise<string> => {
	const reservations = await fetchReservations();

	const reservationIds = reservations
		.map((res) => res.id)
		.filter((id: string) => /^RE\d+$/.test(id));

	const numericIds = reservationIds.map((id) =>
		parseInt(id.replace("RE", ""), 10)
	);

	const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;

	const newIdNumber = maxId + 1;
	const newId = `RE${newIdNumber.toString().padStart(4, "0")}`;

	return newId;
};

export default generateReservationId;

const generatePaymentIds = async (): Promise<string> => {
	const payments = await fetchPayments();

	const paymentIds = payments
		.map((res) => res.id)
		.filter((id) => /^PAY\d+$/.test(id));

	const numericIds = paymentIds.map((id) =>
		parseInt(id.replace("PAY", ""), 10)
	);

	const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;

	const newIdNumber = maxId + 1;
	const newId = `PAY${newIdNumber.toString().padStart(4, "0")}`;

	return newId;
};

export { generatePaymentIds };

const generateGuestId = async (): Promise<string> => {
	const guests = await fetchAccount();

	const guestsIds = guests
		.map((res) => res.id)
		.filter((id) => /^AC\d+$/.test(id));

	const numericIds = guestsIds.map((id) => parseInt(id.replace("AC", ""), 10));

	const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;

	const newIdNumber = maxId + 1;
	const newId = `AC${newIdNumber.toString().padStart(4, "0")}`;

	return newId;
};

export { generateGuestId };
