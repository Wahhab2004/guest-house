import { useState, useEffect } from "react";
import { Room } from "@/fetching";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BookingFormProps {
	room: Room | null;
	id: string | string[] | undefined;
}

export default function BookingForm({ room, id }: BookingFormProps) {
	const [guests, setGuests] = useState({ Male: 0, Female: 0 });
	const [formData, setFormData] = useState({
		checkin: "",
		checkout: "",
		guestTotal: 0,
		totalPrice: 0,
	});

	const totalGuests = guests.Male + guests.Female;
	const totalPayment = (room?.price || 0) * totalGuests;
	const router = useRouter();

	useEffect(() => {
		// Jika ingin formData.guestCount disimpan, bisa pakai useEffect seperti ini
	}, [totalGuests]);

	const handleGuestChange = (gender: "Male" | "Female", delta: number) => {
		setGuests((prev) => ({
			...prev,
			[gender]: Math.max(0, prev[gender] + delta),
		}));
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!id) {
			alert("Room data not available");
			return;
		}

		try {
			const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
			const res = await fetch(`${baseUrl}/reservations`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					roomId: id,
					guestId: "97954af1-b403-4114-9f9d-49d36bb2ffa5",
					numOfGuests: totalGuests,
					checkInDate: formData.checkin,
					checkOutDate: formData.checkout,
					dateReservation: new Date().toISOString(),
				}),
			});

			const result = await res.json();

			if (!res.ok) {
				throw new Error(result.message || "Gagal membuat reservasi");
			}

			const idReservation = result.data?.id;
			alert(result.message || "Reservasi berhasil dibuat!");
			router.push(`/my-reservations/reservations?id=${idReservation}`);
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error("Login error:", error);
				alert(error.message);
			} else {
				console.error("Login error:", error);
				alert("Terjadi kesalahan saat login.");
			}
		}
	};

	return (
		<div className="mx-auto p-10 w-11/12 xl:w-full mt-20 rounded-lg border md:max-w-2xl">
			<h1 className="text-lg text-center font-semibold text-[#1C2B38] bg-gray-200 p-4 rounded-lg w-[80%] mx-auto">
				Booking {room?.name}
			</h1>
			<h2 className="text-center text-4xl font-bold text-[#4C5C6B] mt-6">
				¥{room?.price ? room.price : "0"} / Night
			</h2>

			<form className="space-y-4 mt-10" onSubmit={handleSave}>
				{/* Check-In" */}
				<div>
					<label className="block mb-1 text-gray-600 text-lg">
						Check-in Date
					</label>
					<input
						type="date"
						name="checkin"
						value={formData.checkin}
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
						required
					/>
				</div>

				{/* Check-Out */}
				<div>
					<label className="block mb-1 text-gray-600 text-lg">
						Check-out Date
					</label>
					<input
						type="date"
						name="checkout"
						value={formData.checkout}
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
						required
					/>
				</div>

				{/* Info */}
				<div className="mt-10 bg-gray-400 w-full h-[1px]" />
				<div className="flex p-3 text-sm bg-blue-100 rounded mt-4 justify-evenly items-center text-blue-800">
					<Image
						src="/svg/icon-warn-blue.svg"
						alt="room-1"
						width={16}
						height={16}
					/>
					<p>children under 3 years stay for free</p>
				</div>

				{/* Guests */}
				<div>
					<label className="block mb-2 text-gray-600 text-lg">Guests</label>
					<div className="flex items-center space-x-4">
						{/* Male */}
						<div className="flex items-center space-x-2">
							<span>👨</span>
							<button
								type="button"
								onClick={() => handleGuestChange("Male", -1)}
								className="px-2 py-1 border rounded"
							>
								-
							</button>
							<span>{guests.Male}</span>
							<button
								type="button"
								onClick={() => handleGuestChange("Male", 1)}
								className="px-2 py-1 border rounded"
							>
								+
							</button>
						</div>

						{/* Female */}
						<div className="flex items-center space-x-2">
							<span>👩</span>
							<button
								type="button"
								onClick={() => handleGuestChange("Female", -1)}
								className="px-2 py-1 border rounded"
							>
								-
							</button>
							<span>{guests.Female}</span>
							<button
								type="button"
								onClick={() => handleGuestChange("Female", 1)}
								className="px-2 py-1 border rounded"
							>
								+
							</button>
						</div>
					</div>
				</div>

				{/* Total Guest */}
				<div className="md:flex items-center justify-between">
					<label className="text-gray-600 text-lg">Total Guests</label>
					<input
						type="text"
						value={totalGuests}
						disabled
						className="text-xl md:text-end"
					/>
				</div>

				<div className="mt-10 bg-gray-400 w-full h-[1px]" />

				{/* Total Payment */}
				<div className="md:flex items-center justify-between">
					<label className="text-gray-600 text-lg">Total Payment</label>
					<input
						type="text"
						value={`¥ ${totalPayment.toLocaleString()}`}
						disabled
						className="text-xl md:text-end"
					/>
				</div>

				{/* Submit */}
				<button
					type="submit"
					className="w-full bg-blue-700 text-white px-4 py-2 font-semibold rounded hover:bg-blue-800"
				>
					Book Now
				</button>
			</form>
		</div>
	);
}
