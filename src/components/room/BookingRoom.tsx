import { useState, useEffect } from "react";
import { Room } from "@/fetching";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BookingFormProps {
	room: Room | null;
	id: string | string[] | undefined;
}

export default function BookingForm({ room, id }: BookingFormProps) {
	const [guests, setGuests] = useState({ male: 0, female: 0 });
	const [formData, setFormData] = useState({
		checkInDate: "",
		checkOutDate: "",
		idAccount: "ACC10",
		idPayment: "PAY10",
		idRoom: id,
		numOfGuests: 0,
		totalPayment: 0,
	});

	const totalGuests = guests.male + guests.female;
	const totalPayment = (room?.pricePerNight || 0) * totalGuests;
	const router = useRouter();

	useEffect(() => {
		// Jika ingin formData.guestCount disimpan, bisa pakai useEffect seperti ini
	}, [totalGuests]);

	const handleGuestChange = (gender: "male" | "female", delta: number) => {
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

		if(!id) {
			alert("Room data not available");
			return;
		}

		try {
			const res = await fetch("/api/reservations", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({
					...formData,
					numOfGuests: totalGuests,
					totalPayment: totalPayment,
					checkStatus: "pending",
					paymentStatus: "unpaid",
					dateReservation: new Date().toISOString(),
				}),
			});

			

			if(!res.ok) throw new Error("Failled to create reservation");
			const result = await res.json();
			const idReservation = result.data?.id;
			console.log(idReservation)

			alert("Reservasi berhasil dibuat!");
			router.push(`/my-reservations/reservations?id=${idReservation}`);

			// Cari tahu apakah ini tidak perlu direturn?
			return result;
		}

		catch(error) {
			console.error("Booking error:", error);
			alert("Gagal membuat reservasi")
		}
	}

	return (
		<div className="float-right p-6 rounded-lg border">
			<h1 className="text-lg text-center font-semibold text-[#1C2B38]">Booking {id}</h1>
			<h2 className="text-center text-4xl font-bold text-[#4C5C6B] mt-6">
				¥{room?.pricePerNight ? room.pricePerNight : "0"} / Night
			</h2>

			<form onSubmit={handleSubmitAPI} className="space-y-4 mt-10">
				{/* Check-In / Check-Out */}
				<div>
					<label className="block mb-1 text-gray-600 text-lg">Check-in Date</label>
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
					<label className="block mb-1 text-gray-600 text-lg">Check-out Date</label>
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
					<Image src="/svg/icon-warn-blue.svg" alt="room-1" width={16} height={16} />
					<p>children under 3 years stay for free</p>
				</div>

				{/* Guests */}
				<div>
					<label className="block mb-2 text-gray-600 text-lg">Guests</label>
					<div className="flex items-center space-x-4">
						{/* Male */}
						<div className="flex items-center space-x-2">
							<span>👨</span>
							<button type="button" onClick={() => handleGuestChange("male", -1)} className="px-2 py-1 border rounded">-</button>
							<span>{guests.male}</span>
							<button type="button" onClick={() => handleGuestChange("male", 1)} className="px-2 py-1 border rounded">+</button>
						</div>

						{/* Female */}
						<div className="flex items-center space-x-2">
							<span>👩</span>
							<button type="button" onClick={() => handleGuestChange("female", -1)} className="px-2 py-1 border rounded">-</button>
							<span>{guests.female}</span>
							<button type="button" onClick={() => handleGuestChange("female", 1)} className="px-2 py-1 border rounded">+</button>
						</div>
					</div>
				</div>

				{/* Total Guest */}
				<div className="flex items-center">
					<label className="text-gray-600 text-lg w-full">Total Guests</label>
					<input type="text" value={totalGuests} disabled className="text-end text-xl" />
				</div>

				<div className="mt-10 bg-gray-400 w-full h-[1px]" />

				{/* Total Payment */}
				<div className="flex items-center">
					<label className="text-gray-600 text-lg">Total Payment</label>
					<input type="text" value={`¥ ${totalPayment.toLocaleString()}`} disabled className="text-end text-xl" />
				</div>

				{/* Submit */}
				<button type="submit" className="w-full bg-blue-700 text-white px-4 py-2 font-semibold rounded hover:bg-blue-800">
					Book Now
				</button>
			</form>
		</div>
	);
}
