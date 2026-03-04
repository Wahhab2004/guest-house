import { Reservation } from "@/fetching";

export const validateReservationForm = (formData: Reservation) => {
  const errors: { [key: string]: string } = {};

  if (!formData.checkIn) errors.event_date = "Waktu Check In wajib diisi";
  if (!formData.checkOut) errors.start_time = "Waktu Check Out wajib diisi";
  if (!formData.roomId) errors.end_time = "Room wajib diisi";
  if (!formData.guestTotal) errors.event_name = "Total tamu wajib diisi";
  if (!formData.guestId) errors.customer_name = "Nama tamu wajib diisi";

  return errors;
};
