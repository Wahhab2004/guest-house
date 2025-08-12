"use client";
import { Reservation } from "@/fetching";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface BookingDetailsProps {
    handleNavigate: (section: string) => void;
    reservation: Reservation | null;
}

const initialFormData = {
    sender: "",
    paymentMethod: "",
    proofOfPayment: "",
    createdAt: new Date(),
};

const PaymentForm = ({  reservation }: BookingDetailsProps) => {
    const [formData, setFormData] = useState(initialFormData);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
    const router = useRouter();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { id, value, type, files } = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [id]: type === "file" ? files?.[0]?.name || "" : value,
        }));
    };

    const handlePaymentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPaymentMethod(event.target.value);
        setFormData((prev) => ({
            ...prev,
            paymentMethod: event.target.value,
        }));
    };

    const handleUpdatePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `/api/payments?id=${reservation?.Payment.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const result = await response.json();

            if (response.ok) {
                alert("Payment berhasil diperbarui");
                console.log("Hasil update:", result.data);
            } else {
                alert(`Gagal update: ${result.message}`);
            }

            router.push("/my-reservations/reservations#summary-booking");
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan saat mengupdate");
        }
    };

    const renderBankInfo = (bank: "bca" | "jpb") => (
        <>
            {bank === "bca" ? (
                <>
                    <Image src="/svg/bca.svg" alt="BCA Logo" width={70} height={70} className="w-16" />
                    <p><strong>Bank Central Asia</strong></p>
                </>
            ) : (
                <>
                    <Image src="/svg/jpb.svg" alt="JPB logo" width={150} height={150} />
                    <p><strong>Japan Post Bank</strong></p>
                </>
            )}
            <p>2208 1996</p>
            <p>Guest house Ryosuke</p>
        </>
    );

    const renderProofAndSender = (proofId = "proofOfPayment", senderId = "sender") => (
        <>
            <div className="mt-4">
                <label htmlFor={proofId} className="block mb-2 text-sm font-medium text-gray-900">
                    Upload Proof Payment
                </label>
                <input
                    type="file"
                    id={proofId}
                    onChange={handleChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                />
            </div>
            <div className="mt-4">
                <label htmlFor={senderId} className="block mb-2 text-sm font-medium text-gray-900">
                    Sender Name
                </label>
                <input
                    type="text"
                    id={senderId}
                    value={formData.sender}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="John Doe"
                />
            </div>
        </>
    );

    const renderWhatsAppButton = () => (
        <div className="mt-4">
            <button
                type="button"
                className="flex items-center bg-green-600 text-white px-4 py-2 w-full rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48" className="mr-2">
                    <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path>
                    <path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path>
                    <path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path>
                    <path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path>
                    <path fill="#fff" fillRule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clipRule="evenodd"></path>
                </svg>
                <Link href="https://wa.me/+818032423077" target="_blank">
                    Send Payment Proof to WhatsApp
                </Link>
            </button>
            <p className="text-sm text-gray-600 mt-2">
                Faster verification with WhatsApp. Make sure to include your booking ID.
            </p>
        </div>
    );

    return (
        <div className="w-[85%] mx-auto" id="payment">
            <h1 className="text-xl lg:text-3xl font-bold text-center mt-10 text-blue-900">
                Payment & Confirmation
            </h1>
            <p className="text-center text-gray-400">
                Please fill up the blank fields below
            </p>
            <p>there is nothing: {reservation?.Payment?.id}</p>
            <form className="space-y-5 my-10" onSubmit={handleUpdatePayment}>
                <div>
                    <label
                        htmlFor="payment-method"
                        className="block mb-2 text-sm font-medium"
                    >
                        Select Payment Method
                    </label>
                    <select
                        name="payment-method"
                        id="payment-method"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={handlePaymentChange}
                        value={selectedPaymentMethod}
                    >
                        <option value="">Select Payment Method</option>
                        <option value="bank-bca">Bank BCA</option>
                        <option value="japan-post-bank">Japan Post Bank</option>
                        <option value="coa">Cash on Arrival</option>
                    </select>
                </div>

                {(selectedPaymentMethod === "bank-bca" || selectedPaymentMethod === "japan-post-bank") && (
                    <div>
                        <div className="bg-white p-4 border border-gray-300 rounded-lg">
                            <div className="mb-3">
                                {renderBankInfo(selectedPaymentMethod === "bank-bca" ? "bca" : "jpb")}
                            </div>
                            <div className="text-sm text-gray-800"></div>
                            {renderProofAndSender()}
                            <div className="mt-4 bg-red-100 text-red-700 p-3 rounded-lg text-sm">
                                <p>
                                    Your booking will be held for 6 hours. If payment is not
                                    completed within this time, your reservation will be
                                    automatically canceled.
                                </p>
                            </div>
                            {renderWhatsAppButton()}
                        </div>
                        <div className="pt-10">
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[50%] sm:w-auto px-5 py-2.5 text-center mx-auto block lg:w-1/3"
                            >
                                Booking
                            </button>
                            <button className="mt-4 text-gray-400 text-center w-1/3 lg:w-1/4 text-sm mx-auto block font-semibold border border-gray-200 hover:text-gray-500 hover:bg-gray-300 py-2 rounded-lg">
                                <Link href="/my-reservations">Back</Link>
                            </button>
                        </div>
                    </div>
                )}

                {selectedPaymentMethod === "coa" && (
                    <>
                        <div className="bg-white p-4 border border-gray-300 rounded-lg">
                            <div>
                                <div className="flex">
                                    <Image src="/svg/bca.svg" width={70} height={70} alt="coa" />
                                    <div className="ml-3 text-sm ml-[5.6rem]">
                                        <p><strong>Bank Central Asia</strong></p>
                                        <p>2208 1996</p>
                                        <p>Guest house Ryosuke</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Image src="/svg/jpb.svg" width={150} height={150} alt="coa" />
                                    <div className="ml-3 text-sm">
                                        <p><strong>Japan Post Bank</strong></p>
                                        <p>2208 1996</p>
                                        <p>Guest house Ryosuke</p>
                                    </div>
                                </div>
                        </div>
                            {renderProofAndSender("proof-payment", "sender-name")}
                            <div className="bg-white rounded-lg mt-4">
                                <div className="text-sm text-blue-800 bg-blue-100 rounded-lg p-4">
                                    <p>
                                        Please transfer 50% of the total amount in advance, with the
                                        remaining balance to be paid upon arrival at the location.
                                    </p>
                                </div>
                                {renderWhatsAppButton()}
                            </div>
                        </div>


                        <div className="pt-10">
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[50%] sm:w-auto px-5 py-2.5 text-center mx-auto block lg:w-1/3"
                            >
                                Booking
                            </button>
                            <button className="mt-4 text-gray-400 text-center w-1/3 lg:w-1/4 text-sm mx-auto block font-semibold border border-gray-200 hover:text-gray-500 hover:bg-gray-300 py-2 rounded-lg">
                                <Link href="/my-reservations">Back</Link>
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default PaymentForm;
