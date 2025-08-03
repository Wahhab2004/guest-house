import { useState, useEffect } from "react";
import { Room } from "@/fetching";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { generateGuestId, generatePaymentIds } from "../generateId";

interface BookingFormProps {
	room: Room | null;
	id: string | string[] | undefined;
}

export default function BookingForm({ room, id }: BookingFormProps) {
	const [guests, setGuests] = useState({ Male: 0, Female: 0 });
	const [formData, setFormData] = useState({
		idAccount: "",
		idPayment: "",
		checkInDate: "",
		checkOutDate: "",
		idRoom: id,
		numOfGuests: 0,
	});

	// useEffect(() => {
	// 	const generateIds = async () => {
	// 		const newIdAccount = await generateGuestId();
	// 		const newIdPayment = await generatePaymentIds();

	// 		setFormData((prev) => ({
	// 			...prev,
	// 			idAccount: newIdAccount,
	// 			idPayment: newIdPayment,
	// 		}));
	// 	};

	// 	generateIds();
	// }, []);

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

	const handleSubmitAPI = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!id) {
			alert("Room data not available");
			return;
		}

		try {
			// 1. Buat akun tamu (guest) terlebih dahulu
			const resAcc = await fetch("/api/guests", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: formData.idAccount,
					name: "random", // ganti dengan formData.name kalau tersedia
				}),
			});

			if (!resAcc.ok) throw new Error("Failed to create guest account");
			const resultAcc = await resAcc.json();
			console.log("Guest created:", resultAcc);

			// 2. Buat data pembayaran
			const resPay = await fetch("/api/payments", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: formData.idPayment,
					paymentStatus: "unpaid",
					totalAmountPaid: totalPayment,
				}),
			});

			if (!resPay.ok) throw new Error("Failed to create payment");
			const resultPay = await resPay.json();
			console.log("Payment created:", resultPay);

			// 3. Buat reservasi, gunakan ID akun dan ID payment sebagai foreign key
			const res = await fetch("/api/reservations", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...formData,
					idRoom: id,
					numOfGuests: totalGuests,
					checkStatus: "pending",
					dateReservation: new Date().toISOString(),
					idAccount: formData.idAccount,
					idPayment: formData.idPayment,
				}),
			});

			if (!res.ok) throw new Error("Failed to create reservation");
			const result = await res.json();
			const idReservation = result.data?.id;

			alert("Reservasi berhasil dibuat!");
			router.push(`/my-reservations/reservations?id=${idReservation}`);
		} catch (error) {
			console.error("Booking error:", error);
			alert("Gagal membuat reservasi");
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

			<form onSubmit={handleSubmitAPI} className="space-y-4 mt-10">
				{/* Check-In / Check-Out */}
				<div>
					<label className="block mb-1 text-gray-600 text-lg">
						Check-in Date
					</label>
					<input
						type="date"
						name="checkInDate"
						value={formData.checkInDate}
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
						required
					/>
				</div>

				<div>
					<label className="block mb-1 text-gray-600 text-lg">
						Check-out Date
					</label>
					<input
						type="date"
						name="checkOutDate"
						value={formData.checkOutDate}
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
