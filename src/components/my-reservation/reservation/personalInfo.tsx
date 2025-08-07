"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Reservation } from "@/fetching";
import { useRouter } from "next/navigation";

interface NavbarReservationProps {
	reservation: Reservation | null;
	handleNavigate: (section: string) => void;
}

const initialFormData = {
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

export default function NavbarReservation({
	reservation,
}: NavbarReservationProps) {
	const [formData, setFormData] = useState(initialFormData);
	const [showConfirm, setShowConfirm] = useState(false);
	const router = useRouter();


	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));
	};


	const handleUpdateGuest = async () => {
		try {
			const response = await fetch(`/api/guests?id=${reservation?.guestId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formData,
				}),
			});

			const result = await response.json();

			if (response.ok) {
				alert("Akun berhasil diperbarui");
				console.log("Hasil update:", result.data);
			} else {
				alert(`Gagal update: ${result.message}`);
			}
			

			router.push("/my-reservations/reservations#payment");
		} catch (error) {
			console.error("Error:", error);
			alert("Terjadi kesalahan saat mengupdate");
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

			<div>
				<section className="w-11/12 lg:w-[80%] mx-auto">
					<div className="mt-10 flex items-center">
						<h2 className="font-semibold lg:text-xl lg:font-bold">Guest 1</h2>
						<label className="relative inline-flex items-center cursor-pointer ml-2">
							<input type="checkbox" value="" className="sr-only peer" />
							<div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
						</label>
						<p className="ml-2 text-sm mb-1 lg:mb-0">Use My Profile Data</p>
					</div>
					<form >
						<div className="lg:flex lg:justify-between mt-4 ">
							{/* Left Side */}
							<div className="lg:w-[45%]">
								<InputField
									label="First Name"
									id="name"
									value={formData.name}
									onChange={handleChange}
									placeholder="John doe"
									required
								/>
								<InputField
									label="Email Address"
									id="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="name@flowbite.com"
									required
								/>
								<SelectField
									label="Gender"
									id="gender"
									value={formData.gender}
									onChange={handleChange}
									options={[
										{ value: "male", label: "Male" },
										{ value: "female", label: "Female" },
									]}
								/>
								<InputField
									label="Date of Birth"
									id="dateOfBirth"
									type="date"
									value={formData.dateOfBirth}
									onChange={handleChange}
									required
								/>
							</div>
							{/* Right Side */}
							<div className="lg:w-[45%]">
								<InputField
									label="Phone Number"
									id="phoneNumber"
									value={formData.phoneNumber}
									onChange={handleChange}
									placeholder="+628 1234 5678"
									required
								/>
								<InputField
									label="ID/Passport Number"
									id="idPassport"
									value={formData.idPassport}
									onChange={handleChange}
									placeholder="A1234567"
									required
								/>
								<SelectField
									label="Country of Residence"
									id="country"
									value={formData.country}
									onChange={handleChange}
									options={[
										{ value: "id", label: "Indonesia" },
										{ value: "jp", label: "Japan" },
									]}
								/>
								<div>
									<p className="block mb-2 text-sm font-semibold text-gray-900 text-red-500 italic">
										Emergency Contact
									</p>
									<div className="flex flex-col lg:flex-row gap-4 ">
										<InputField
											label="Name"
											id="emergencyName"
											value={formData.emergencyName}
											onChange={handleChange}
											placeholder="John doe"
											required
											containerClass="w-[70%]"
										/>
										<InputField
											label="Phone Number"
											id="emergencyPhone"
											type="text"
											value={formData.emergencyPhone}
											onChange={handleChange}
											placeholder="08123456789"
											required
										/>
									</div>
								</div>
							</div>
						</div>

						<button
							type="button"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[50%] sm:w-auto px-5 py-2.5 text-center mx-auto block lg:w-1/3 mt-10"
							onClick={() => setShowConfirm(true)}
						>
							Continue to Book
						</button>
						<button
							type="button"
							className="mt-4 text-gray-400 text-center w-1/3 lg:w-1/4 text-sm mx-auto block font-semibold border border-gray-200 hover:text-gray-500 hover:bg-gray-300 py-2 rounded-lg"
						>
							<Link href="/my-reservations">Back</Link>
						</button>
						{showConfirm && (
							<ConfirmModal
								onCancel={() => setShowConfirm(false)}
								onConfirm={() => {
									handleUpdateGuest();
									setShowConfirm(false);
								}}
							/>
						)}
					</form>
				</section>
			</div>
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
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				placeholder={placeholder}
				required={required}
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
}

function SelectField({
	label,
	id,
	value,
	onChange,
	options,
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
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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

interface ConfirmModalProps {
	onCancel: () => void;
	onConfirm: () => void;
}

function ConfirmModal({ onCancel, onConfirm }: ConfirmModalProps) {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
				<h2 className="text-lg font-semibold mb-4 text-gray-800">
					Confirm Your Booking
				</h2>
				<p className="text-sm text-gray-600 mb-6">
					Are you sure all the information is correct?
				</p>
				<div className="flex justify-end gap-4">
					<button
						className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-sm font-semibold"
						onClick={onCancel}
					>
						Cancel
					</button>
					<button
						type="submit"
						className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-semibold"
						onClick={onConfirm}
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
}
