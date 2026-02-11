import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { fetchReservationById, Reservation } from "@/fetching";

interface AdditionalGuests {
	id: string;
	reservationId: string;
	name: string;
	passport: string | null;
	dateOfBirth: string;
	gender: string;
	priceCategory: string;
}

interface GuestFormData {
	name: string;
	email: string;
	gender: string;
	dateOfBirth: string;
	phoneNumber: string;
	idPassport: string;
	country: string;
	emergencyName: string;
	emergencyPhone: string;
}

interface Props {
	reservation: Reservation | null;
	handleNavigate: (section: string) => void;
	onReservationUpdate: (updateReservation: Reservation | null) => void;
}

const initialGuestFormData: GuestFormData = {
	name: "",
	email: "",
	gender: "",
	dateOfBirth: "",
	phoneNumber: "",
	idPassport: "",
	country: "id",
	emergencyName: "",
	emergencyPhone: "",
};

const initialAdditionalGuest: Omit<
	AdditionalGuests,
	"id" | "reservationId" | "priceCategory"
> = {
	name: "",
	passport: null,
	dateOfBirth: "",
	gender: "",
};

export default function NavbarReservation({
	reservation,
	handleNavigate,
	onReservationUpdate,
}: Props) {
	// State untuk guest utama (orderer)
	const [mainGuestData, setMainGuestData] =
		useState<GuestFormData>(initialGuestFormData);
	const [useProfileData, setUseProfileData] = useState(false);

	// State untuk additional guests (adultCount - 1)
	const [additionalGuests, setAdditionalGuests] = useState<
		Omit<AdditionalGuests, "id" | "reservationId" | "priceCategory">[]
	>([]);

	// Saat reservation?.adultCount berubah, sesuaikan jumlah additionalGuests
	useEffect(() => {
		if (typeof reservation?.adultCount !== "number") return;

		const count = reservation.adultCount - 1; // guest utama sudah dihitung, sisanya additional

		if (count > 0) {
			setAdditionalGuests((prev) => {
				if (count > prev.length) {
					return [
						...prev,
						...Array(count - prev.length)
							.fill(null)
							.map(() => ({ ...initialAdditionalGuest })),
					];
				} else if (count < prev.length) {
					return prev.slice(0, count);
				}
				return prev;
			});
		} else {
			setAdditionalGuests([]);
		}
	}, [reservation?.adultCount]);

	// Fetch profile data untuk guest utama jika checkbox dicentang
	useEffect(() => {
		if (useProfileData && reservation?.bookerId) {
			fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/guests/${reservation.bookerId}`,
			)
				.then((res) => {
					if (!res.ok) throw new Error("Failed fetch profile data");
					return res.json();
				})
				.then((data) => {
					if (data?.data) {
						setMainGuestData({
							name: data.data.name || "",
							email: data.data.email || "",
							gender: data.data.gender || "",
							dateOfBirth: data.data.dateOfBirth?.split("T")[0] || "",
							phoneNumber: data.data.phoneNumber || "",
							idPassport: data.data.idPassport || "",
							country: data.data.country || "id",
							emergencyName: data.data.emergencyName || "",
							emergencyPhone: data.data.emergencyPhone || "",
						});
					}
				})
				.catch(() => {
					alert("Failed to load profile data");
					setUseProfileData(false);
				});
		} else {
			setMainGuestData(initialGuestFormData);
		}
	}, [useProfileData, reservation?.guestId, reservation?.bookerId]);

	// Handler perubahan main guest input
	const handleMainGuestChange = (field: keyof GuestFormData, value: string) => {
		setMainGuestData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	// Handler perubahan additional guest input
	const handleAdditionalGuestChange = (
		index: number,
		field: keyof Omit<
			AdditionalGuests,
			"id" | "reservationId" | "priceCategory"
		>,
		value: string,
	) => {
		setAdditionalGuests((prev) => {
			const newList = [...prev];
			newList[index] = { ...newList[index], [field]: value };
			return newList;
		});
	};

	// TODO: FIX NAME NOT PROVIDE ON PAYMENTFORM
	const handleSubmit = async () => {
		if (!reservation) {
			toast.error("Reservation data not found");
			return;
		}

		const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
		const token = Cookies.get("token");

		try {
			let guestCurrentId = reservation.bookerId;
			const isSingleGuest = reservation.adultCount === 1;

			if (!useProfileData) {
				const guestPayload = {
					name: mainGuestData.name,
					username: mainGuestData.name.toLowerCase().replace(/\s+/g, ""),
					email: mainGuestData.email,
					phone: mainGuestData.phoneNumber,
					passport: mainGuestData.idPassport,
					dateOfBirth: mainGuestData.dateOfBirth,
					country: mainGuestData.country,
					gender: mainGuestData.gender,
				};

				const guestRes = await fetch(`${baseUrl}/guests`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(guestPayload),
				});

				if (!guestRes.ok) {
					const err = await guestRes.json().catch(() => ({}));
					throw new Error(err.message || "Failed to create guest");
				}

				const guestData = await guestRes.json();
				const newGuestId = guestData.data.id;

				if (isSingleGuest) {
					guestCurrentId = newGuestId;
				} else {
					guestCurrentId = reservation.bookerId;
				}
			}

			const updateReservation = await fetch(
				`${baseUrl}/reservations/${reservation.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ guestId: guestCurrentId }),
				},
			);

			const updateReservationData = await updateReservation.json();

			if (!updateReservation.ok) {
				throw new Error(
					updateReservationData.message || "Failed to update reservation",
				);
			}

			const freshReservation = await fetchReservationById(reservation.id);

			onReservationUpdate(freshReservation);

			if (additionalGuests.length > 0) {
				await Promise.all(
					additionalGuests.map((guest) =>
						fetch(`${baseUrl}/additional-guests`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${token}`,
							},
							body: JSON.stringify({
								reservationId: reservation.id,
								name: guest.name,
								passport: guest.passport,
								dateOfBirth: guest.dateOfBirth,
								gender: guest.gender,
							}),
						}),
					),
				);
			}

			toast.success("Reservation details completed successfully!");

			handleNavigate("payment");
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("Unexpected error occurred");
			}
		}
	};

	return (
		<section>
			<h1 className="text-xl lg:text-3xl font-bold text-center mt-10 text-blue-900">
				Orderer Details
			</h1>
			<p className="text-center text-gray-400">
				Please fill up the blank fields below
			</p>

			<section className="w-11/12 lg:w-[80%] mx-auto mt-6	">
				{/* Form Guest Utama */}
				<div className="border rounded p-4 mb-6">
					<div className="flex items-center mb-4">
						<h2 className="font-semibold lg:text-xl lg:font-bold">
							Guest 1 (Orderer)
						</h2>
						<label className="relative inline-flex items-center cursor-pointer ml-4">
							<input
								type="checkbox"
								className="sr-only peer"
								checked={useProfileData}
								onChange={(e) => setUseProfileData(e.target.checked)}
							/>
							<div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
						</label>
						<p className="ml-2 text-sm mb-1 lg:mb-0">Use My Profile Data</p>
					</div>

					<InputField
						label="Name"
						id="name"
						value={mainGuestData.name}
						onChange={(e) => handleMainGuestChange("name", e.target.value)}
						placeholder="John Doe"
						required
						disabled={useProfileData}
					/>
					<InputField
						label="Email Address"
						id="email"
						value={mainGuestData.email}
						onChange={(e) => handleMainGuestChange("email", e.target.value)}
						placeholder="name@flowbite.com"
						required
						disabled={useProfileData}
					/>
					<SelectField
						label="Gender"
						id="gender"
						value={mainGuestData.gender}
						onChange={(e) => handleMainGuestChange("gender", e.target.value)}
						options={[
							{ value: "", label: "Select Gender" },
							{ value: "Male", label: "Male" },
							{ value: "Female", label: "Female" },
						]}
						disabled={useProfileData}
					/>
					<InputField
						label="Date of Birth"
						id="dateOfBirth"
						type="date"
						value={mainGuestData.dateOfBirth}
						onChange={(e) =>
							handleMainGuestChange("dateOfBirth", e.target.value)
						}
						required
						disabled={useProfileData}
					/>
					<InputField
						label="Phone Number"
						id="phoneNumber"
						value={mainGuestData.phoneNumber}
						onChange={(e) =>
							handleMainGuestChange("phoneNumber", e.target.value)
						}
						placeholder="+628 1234 5678"
						required
						disabled={useProfileData}
					/>
					<InputField
						label="ID/Passport Number"
						id="idPassport"
						value={mainGuestData.idPassport}
						onChange={(e) =>
							handleMainGuestChange("idPassport", e.target.value)
						}
						placeholder="A1234567"
						required
						disabled={useProfileData}
					/>
					<InputField
						label="Country of Residence"
						id="country"
						value={mainGuestData.country}
						onChange={(e) => handleMainGuestChange("country", e.target.value)}
						placeholder="Your country"
						disabled={useProfileData}
					/>
				</div>

				{/* Form Additional Guests */}
				{additionalGuests.length > 0 && (
					<section>
						<h2 className="text-lg font-bold mb-4">Additional Guests</h2>
						{additionalGuests.map((guest, idx) => (
							<div key={idx} className="border rounded p-4 mb-6">
								<h3 className="font-semibold mb-3">Guest {idx + 2}</h3>
								<InputField
									label="Name"
									id={`additional-name-${idx}`}
									value={guest.name}
									onChange={(e) =>
										handleAdditionalGuestChange(idx, "name", e.target.value)
									}
									placeholder="John Doe"
									required
								/>
								<InputField
									label="Passport"
									id={`additional-passport-${idx}`}
									value={guest.passport || ""}
									onChange={(e) =>
										handleAdditionalGuestChange(idx, "passport", e.target.value)
									}
									placeholder="A1234567"
									required
								/>
								<InputField
									label="Date of Birth"
									id={`additional-dob-${idx}`}
									type="date"
									value={guest.dateOfBirth}
									onChange={(e) =>
										handleAdditionalGuestChange(
											idx,
											"dateOfBirth",
											e.target.value,
										)
									}
									required
								/>
								<SelectField
									label="Gender"
									id={`additional-gender-${idx}`}
									value={guest.gender}
									onChange={(e) =>
										handleAdditionalGuestChange(idx, "gender", e.target.value)
									}
									options={[
										{ value: "", label: "Select Gender" },
										{ value: "Male", label: "Male" },
										{ value: "Female", label: "Female" },
									]}
								/>
							</div>
						))}
					</section>
				)}

				<div className="text-center my-6">
					<button
						onClick={handleSubmit}
						className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
					>
						Submit Guests
					</button>
				</div>
			</section>
		</section>
	);
}

interface InputFieldProps {
	label: string;
	id: string;
	value: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	placeholder?: string;
	type?: string;
	required?: boolean;
	containerClass?: string;
	disabled?: boolean;
}

function InputField({
	label,
	id,
	value,
	onChange,
	placeholder,
	type = "text",
	required,
	containerClass = "",
	disabled = false,
}: InputFieldProps) {
	return (
		<div className={`mb-5 ${containerClass}`}>
			<label
				htmlFor={id}
				className="block mb-2 text-sm font-medium text-gray-900"
			>
				{label}
			</label>
			<input
				type={type}
				id={id}
				value={value}
				onChange={onChange}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200 disabled:text-gray-500"
				placeholder={placeholder}
				required={required}
				disabled={disabled}
			/>
		</div>
	);
}

interface SelectFieldProps {
	label: string;
	id: string;
	value: string;
	onChange: React.ChangeEventHandler<HTMLSelectElement>;
	options: { value: string; label: string }[];
	disabled?: boolean;
}

function SelectField({
	label,
	id,
	value,
	onChange,
	options,
	disabled = false,
}: SelectFieldProps) {
	return (
		<div className="mb-5">
			<label
				htmlFor={id}
				className="block mb-2 text-sm font-medium text-gray-900"
			>
				{label}
			</label>
			<select
				id={id}
				value={value}
				onChange={onChange}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200 disabled:text-gray-500"
				disabled={disabled}
			>
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
		</div>
	);
}
