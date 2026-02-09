"use client";
import { Reservation } from "@/fetching";
import Link from "next/link";
import React, { useState } from "react";
import PaymentInvoice from "./paymentInvoice";
import ProofAndSender from "./proofAndSender";
import toast from "react-hot-toast";

interface BookingDetailsProps {
	reservation: Reservation | null;
	handleNavigate?: (section: string) => void;
}

export interface FormData {
	paymentSender: string;
	method: string;
	proofUrl: string;
	bankOrWallet: string;
}

const initialFormData: FormData = {
	paymentSender: "",
	method: "",
	proofUrl: "",
	bankOrWallet: "",
};

const PaymentForm = ({ reservation, handleNavigate }: BookingDetailsProps) => {
	const [formData, setFormData] = useState<FormData>(initialFormData);

	const handleTextChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { id, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFormData((prev) => ({
				...prev,
				proofUrl: e.target.files![0].name,
			}));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const toastId = toast.loading("Updating payment...");

		try {
			const payload = {
				paymentSender: formData.paymentSender,
				method: formData.method,
				bankOrWallet: formData.bankOrWallet,
				proofUrl: formData.proofUrl, // string URL
			};

			const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
			const response = await fetch(
				`${baseUrl}/payments/${reservation?.payment?.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				},
			);

			const result = await response.json();

			if (response.ok) {
				toast.success("Payment successfully updated", { id: toastId });
				handleNavigate?.("summary-booking");
			} else {
				toast.error(`Update failed: ${result.message}`, { id: toastId });
			}
		} catch (error) {
			console.error(error);
			toast.error("An error occurred while updating the payment", {
				id: toastId,
			});
		}
	};

	return (
		<div className="w-[85%] mx-auto">
			<h1 className="text-2xl font-bold text-center mt-10 text-blue-900">
				Payment & Confirmation
			</h1>

			{formData.method && formData.bankOrWallet && (
				<div className="mt-10 bg-gray-50 p-4 rounded-lg">
					<PaymentInvoice
						bookingId={reservation?.id || ""}
						name={reservation?.guest?.name || "Not provided"}
						email={reservation?.guest?.email || "Not provided"}
						checkIn={reservation?.checkIn || ""}
						checkOut={reservation?.checkOut || ""}
						room={reservation?.room?.name || "Not provided"}
						totalGuest={reservation?.guestTotal || 0}
						price={reservation?.room?.price || 0}
						finalPrice={reservation?.finalPrice || 0}
						paymentMethod={formData.method || "Not provided"}
						bankOrWallet={formData.bankOrWallet || "Not provided"}
						paymentStatus={reservation?.payment?.status || "Not provided"}
					/>
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-5 my-10">
				<div>
					<label className="block mb-2 font-medium">
						Select Payment Method
					</label>
					<select
						id="method"
						value={formData.method}
						onChange={handleTextChange}
						className="border rounded-lg p-2 w-full"
					>
						<option value="" className="text-stone-600">Select Method</option>
						<option value="TRANSFER">Bank Transfer</option>
						<option value="E_WALLET">E-Wallet</option>
						<option value="CASH">Cash</option>
					</select>
				</div>
				<PaymentOptions
					formData={formData}
					setFormData={setFormData}
					handleTextChange={handleTextChange}
					handleFileChange={handleFileChange}
				/>

				<button
					type="submit"
					className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800"
				>
					Confirm Booking
				</button>
			</form>
		</div>
	);
};

export default PaymentForm;

// Moved outside to avoid re-creation on every render
const PaymentOptions = ({
	formData,
	setFormData,
	handleTextChange,
	handleFileChange,
}: {
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
	handleTextChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => void;
	handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
	const WhatsAppButton = () => (
		<Link
			href="https://wa.me/+818032423077"
			target="_blank"
			className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
		>
			Send Proof via WhatsApp
		</Link>
	);

	if (formData.method === "TRANSFER") {
		return (
			<div className="bg-gray-50 p-4 rounded-lg">
				<label className="block mb-2 font-medium">Select Bank</label>
				<select
					id="bankOrWallet"
					value={formData.bankOrWallet}
					onChange={handleTextChange}
					className="border rounded-lg p-2 w-full"
				>
					<option value="">Select Bank</option>
					<option value="BNI">BNI</option>
					<option value="YuchoBank">Yucho Bank</option>
				</select>
				<ProofAndSender
					formData={formData}
					setFormData={setFormData}
					handleFileChange={handleFileChange}
				/>
				<WhatsAppButton />
			</div>
		);
	}

	if (formData.method === "E_WALLET") {
		return (
			<div className="bg-gray-50 p-4 rounded-lg">
				<label className="block mb-2 font-medium">Select E-Wallet</label>
				<select
					id="bankOrWallet"
					value={formData.bankOrWallet}
					onChange={handleTextChange}
					className="border rounded-lg p-2 w-full"
				>
					<option value="">Select E-Wallet</option>
					<option value="PayPay">PayPay</option>
					<option value="PayPal">PayPal</option>
				</select>
				<ProofAndSender
					formData={formData}
					setFormData={setFormData}
					handleFileChange={handleFileChange}
				/>
				<WhatsAppButton />
			</div>
		);
	}

	if (formData.method === "CASH") {
		return (
			<div className="bg-gray-50 p-4 rounded-lg">
				<div className="bg-blue-100 p-3 rounded-lg text-blue-800 text-sm">
					50% of the payment must be made in advance. The payment method is
					flexible — please discuss with the admin.
				</div>
			</div>
		);
	}

	return null;
};
