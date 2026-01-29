"use client";

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import formatDateIndo, {
	datedFormat,
	formatTanggalIndonesia,
} from "@/components/format-tanggal/formatTanggal";

interface InvoiceProps {
	bookingId: string;
	name: string;
	email: string;
	checkIn: string;
	checkOut: string;
	room: string;
	totalGuest: number;
	price: number;
	totalPrice: number;
	paymentMethod: string;
	paymentStatus: string;
	bankOrWallet?: string;
}

const PaymentInvoice: React.FC<InvoiceProps> = ({
	bookingId,
	name,
	email,
	checkIn,
	checkOut,
	room,
	totalGuest,
	price,
	totalPrice,
	paymentMethod,
	paymentStatus,
	bankOrWallet,
}) => {
	const invoiceRef = useRef<HTMLDivElement>(null);

	const downloadPDF = async () => {
		if (!invoiceRef.current) return;

		const canvas = await html2canvas(invoiceRef.current, {
			scale: 2,
			useCORS: true,
			allowTaint: true,
			backgroundColor: "#ffffff",
			imageTimeout: 15000,
		});

		const imgData = canvas.toDataURL("image/png");
		const pdf = new jsPDF("p", "mm", "a4");
		const imgProps = pdf.getImageProperties(imgData);
		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

		pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
		pdf.save(`invoice-${bookingId}.pdf`);
	};

	const statusColor =
		paymentStatus.toLowerCase() === "paid"
			? "bg-green-100 text-green-700"
			: paymentStatus.toLowerCase() === "pending"
				? "bg-yellow-100 text-yellow-700"
				: "bg-red-100 text-red-700";

	return (
		<div className="flex flex-col items-center gap-6 p-6 bg-gray-50 min-h-screen">
			<div
				ref={invoiceRef}
				className="bg-white w-full max-w-3xl shadow-xl rounded-xl border border-gray-200 overflow-hidden"
			>
				{/* Header */}
				<div className="flex justify-between items-center bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-6">
					<div className="flex items-center justify-center gap-4 ">
						<div
							className="flex items-center justify-center"
							style={{
								width: "120px",
								height: "60px",
								padding: "2px",
							}}
						>
							<img
								src="/images/ummu_logo_3.png"
								alt="Ummu Ryosuke Guesthouse Logo"
								crossOrigin="anonymous"
								style={{
									width: "100%",
									height: "100%",
									objectFit: "contain",
									display: "block",
								}}
							/>
						</div>
						<p className="text-xs text-amber-200">
							Comfortable Stay • Trusted Service
						</p>
					</div>

					<div className="text-right text-sm">
						<h2 className="text-lg font-semibold mb-1 ">INVOICE</h2>
						<p>
							Booking ID: <span className="font-medium">{bookingId}</span>
						</p>
						<p className="text-xs text-amber-200">
							{`Date: ${datedFormat(checkIn)} - ${datedFormat(checkOut)}`}
						</p>
					</div>
				</div>

				{/* Invoice To */}
				<div className="px-8 py-6">
					<p className="text-sm font-semibold text-gray-700 mb-1">Invoice To</p>
					<p className="text-sm text-gray-900">{name}</p>
					<p className="text-sm text-gray-600">{email}</p>
				</div>

				{/* Table */}
				<div className="px-8">
					<table className="w-full mb-6 border border-gray-200 rounded-lg overflow-hidden">
						<thead>
							<tr className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm">
								<th className="p-3 text-left">Room / Description</th>
								<th className="p-3 text-right">Price</th>
								<th className="p-3 text-right">Guests</th>
								<th className="p-3 text-right">Total</th>
							</tr>
						</thead>
						<tbody>
							<tr className="text-sm text-gray-700 border-t">
								<td className="p-3">{room}</td>
								<td className="p-3 text-right">
									{price.toLocaleString("jp-JP", {
										style: "currency",
										currency: "JPY",
									})}
								</td>
								<td className="p-3 text-right">{totalGuest}</td>
								<td className="p-3 text-right font-semibold">
									{totalPrice.toLocaleString("jp-JP", {
										style: "currency",
										currency: "JPY",
									})}
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* Payment Info */}
				<div className="px-8 pb-6">
					<div className="grid grid-cols-2 gap-4 text-sm">
						<div>
							<p>
								<span className="font-semibold text-gray-700">
									Payment Method:
								</span>{" "}
								{paymentMethod}
							</p>

							{bankOrWallet && (
								<p className="text-gray-500 text-xs mt-1">{bankOrWallet}</p>
							)}

							<p className="text-xs text-gray-600 mt-2">
								To get bank account or e-wallet details, please contact our
								admin:
							</p>

							<a
								href={`https://wa.me/+818032423077?text=${encodeURIComponent(
									`Hello Admin Ummu Ryosuke Guesthouse,\n\nI would like to request bank account / e-wallet details for my booking.\n\nBooking ID: ${bookingId}\nName: ${name}`,
								)}`}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block mt-1 text-emerald-700 font-semibold hover:underline"
							>
								WhatsApp
							</a>
						</div>

						<div className="text-right">
							<p className="mb-1">
								<span className="font-semibold text-gray-700">
									Payment Status:
								</span>
							</p>
							<span
								className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
							>
								{paymentStatus}
							</span>
						</div>
					</div>

					{/* Total */}
					<div className="flex justify-between mt-6 pt-4 border-t font-bold text-lg">
						<span className="text-amber-500">Grand Total</span>
						<span className="text-amber-500">
							{(totalPrice * 1.1).toLocaleString("jp-JP", {
								style: "currency",
								currency: "JPY",
							})}
						</span>
					</div>
				</div>

				{/* Footer */}
				<div className="bg-gray-100 px-8 py-4 text-center text-xs text-gray-600">
					<p>
						Thank you for choosing Ummu Ryosuke Guesthouse. We look forward to
						welcoming you.
					</p>
					<p className="mt-2 italic">Authorized Signature</p>
				</div>
			</div>

			{/* Download Button */}
			<button
				onClick={downloadPDF}
				className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:bg-amber-800 transition font-semibold shadow-md"
			>
				Download Invoice (PDF)
			</button>
		</div>
	);
};

export default PaymentInvoice;
