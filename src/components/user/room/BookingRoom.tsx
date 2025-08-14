"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Guest, Room } from "@/fetching";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

type Gender = "Male" | "Female" | "Other" | "";

interface BookingFormProps {
	room: Room | null;
	id: string | undefined | string[];
}

export default function BookingForm({ room, id }: BookingFormProps) {
	const [user, setUser] = useState<Guest | null>(null);
	const [dewasa, setDewasa] = useState(1);
	const [hasChildren, setHasChildren] = useState(false);
	const [anakDetails, setAnakDetails] = useState<
		Array<{
			name: string;
			passport?: string;
			dateOfBirth: string;
			gender: Gender;
		}>
	>([
		{ name: "", passport: "", dateOfBirth: "", gender: "" },
		{ name: "", passport: "", dateOfBirth: "", gender: "" },
	]); // max 2 anak

	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const handleAnakChange = (
		index: number,
		field: keyof (typeof anakDetails)[0],
		value: string
	) => {
		const updated = [...anakDetails];
		updated[index] = {
			...updated[index],
			[field]: value,
		};
		setAnakDetails(updated);
	};

	// Reset anakDetails jika hasChildren di-uncheck
	useEffect(() => {
		if (!hasChildren) {
			setAnakDetails([
				{ name: "", passport: "", dateOfBirth: "", gender: "" },
				{ name: "", passport: "", dateOfBirth: "", gender: "" },
			]);
		}
	}, [hasChildren]);

	useEffect(() => {
		const storedUser = Cookies.get("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Cek login dulu
		if (!user || !user.id) {
			toast.error("You must be logged in to make a reservation.");
			router.push("/login");
			return;
		}

		setLoading(true);

		const validAdditionalGuests = hasChildren
			? anakDetails.filter(
					(a) => a.name.trim() !== "" && a.dateOfBirth.trim() !== ""
			  )
			: [];

		// Validasi jumlah dewasa
		if (dewasa < 1 || dewasa > 3) {
			toast.error("Adults must be between 1 and 3.");
			setLoading(false);
			return;
		}

		// Validasi jumlah anak
		if (validAdditionalGuests.length > 2) {
			toast.error("Max 2 children allowed.");
			setLoading(false);
			return;
		}

		// Validasi tanggal
		if (!checkIn || !checkOut) {
			toast.error("Please fill check-in and check-out dates.");
			setLoading(false);
			return;
		}

		const bookingData = {
			roomId: id,
			checkIn: new Date(checkIn).toISOString(),
			checkOut: new Date(checkOut).toISOString(),
			adultCount: dewasa,
			childCount: validAdditionalGuests.length,
			additionalGuests: validAdditionalGuests.map((a) => ({
				name: a.name,
				passport: a.passport || null,
				dateOfBirth: new Date(a.dateOfBirth).toISOString(),
				gender: a.gender || null,
			})),
		};

		try {
			const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
			const res = await fetch(`${baseUrl}/reservations`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
				body: JSON.stringify(bookingData),
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message || "Failed to create reservation");
				setLoading(false);
				return;
			}

			toast.success(data.message || "Reservation created successfully!");

			// reset form setelah sukses
			setDewasa(1);
			setHasChildren(false);
			setCheckIn("");
			setCheckOut("");

			// Redirect ke my reservation
			if (data.data) {
				setTimeout(() => {
					router.push(`/my-reservations/reservations?id=${data.data.id}`);
				}, 1500);
			}
		} catch (error) {
			console.error(error);
			toast.error("An error occurred while creating the reservation");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{/* Toast container */}
			<Toaster position="top-center" reverseOrder={false} />

			<form
				onSubmit={handleSubmit}
				className="p-6 bg-white shadow-lg rounded-lg space-y-6 max-w-lg mx-auto"
			>
				<h2 className="text-2xl font-bold mb-4">Reservation Form</h2>
				<h3 className="text-lg font-semibold">{room?.name}</h3>

				{/* Adults */}
				<div>
					<label className="block font-medium mb-1">Adults (Max 3)</label>
					<input
						type="number"
						min={1}
						max={3}
						value={dewasa}
						onChange={(e) => setDewasa(Number(e.target.value))}
						className="border rounded px-3 py-2 w-full"
					/>
				</div>

				{/* Checkbox Anak */}
				<div className="flex items-center space-x-2">
					<input
						type="checkbox"
						id="hasChildren"
						checked={hasChildren}
						onChange={(e) => setHasChildren(e.target.checked)}
						className="w-4 h-4"
					/>
					<label htmlFor="hasChildren" className="select-none font-medium">
						Is there a child in the group?
					</label>
				</div>

				{/* Children Details */}
				{hasChildren && (
					<div className="border rounded p-4 bg-gray-50 space-y-4">
						<label className="block font-semibold text-gray-700 mb-2">
							Children Details (Max 2)
						</label>
						{anakDetails.map((anak, i) => (
							<div
								key={i}
								className="space-y-2 border p-3 rounded bg-white shadow-sm"
							>
								<input
									type="text"
									placeholder="Name"
									value={anak.name}
									onChange={(e) => handleAnakChange(i, "name", e.target.value)}
									className="border rounded px-3 py-2 w-full"
								/>
								<input
									type="date"
									placeholder="Date of Birth"
									value={anak.dateOfBirth}
									onChange={(e) =>
										handleAnakChange(i, "dateOfBirth", e.target.value)
									}
									className="border rounded px-3 py-2 w-full"
								/>
								<input
									type="text"
									placeholder="Passport"
									value={anak.passport}
									onChange={(e) =>
										handleAnakChange(i, "passport", e.target.value)
									}
									className="border rounded px-3 py-2 w-full"
								/>
								<select
									value={anak.gender}
									onChange={(e) =>
										handleAnakChange(i, "gender", e.target.value as Gender)
									}
									className="border rounded px-3 py-2 w-full"
								>
									<option value="">Select Gender</option>
									<option value="Female">Female</option>
									<option value="Male">Male</option>
								
								</select>
							</div>
						))}
						<p className="text-xs text-gray-500 mt-2">
							Children aged ≤ 5: Free • Children aged 6–10: Half price
						</p>
					</div>
				)}

				{/* Check-in Date */}
				<div>
					<label className="block font-medium mb-1">Check-in Date</label>
					<input
						type="date"
						value={checkIn}
						onChange={(e) => setCheckIn(e.target.value)}
						className="border rounded px-3 py-2 w-full"
					/>
				</div>

				{/* Check-out Date */}
				<div>
					<label className="block font-medium mb-1">Check-out Date</label>
					<input
						type="date"
						value={checkOut}
						onChange={(e) => setCheckOut(e.target.value)}
						className="border rounded px-3 py-2 w-full"
					/>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					disabled={loading}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
				>
					{loading ? "Processing..." : "Book Now"}
				</button>
			</form>
		</>
	);
}
