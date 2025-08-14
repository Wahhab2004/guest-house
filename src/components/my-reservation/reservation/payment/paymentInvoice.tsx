"use client";

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import formatDateIndo from "@/components/format-tanggal/formatTanggal";

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
		});

		const imgData = canvas.toDataURL("image/png");
		const pdf = new jsPDF("p", "mm", "a4");
		const imgProps = pdf.getImageProperties(imgData);
		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

		pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
		pdf.save(`invoice-${bookingId}.pdf`);
	};

	return (
		<div className="flex flex-col items-center gap-4 p-6">
			<div
				ref={invoiceRef}
				className="bg-white w-full max-w-3xl shadow-lg rounded-lg p-8 border border-gray-200"
			>
				{/* Header */}
				<div className="flex justify-between items-center border-b pb-4 mb-4 h-[150px] bg-gray-800 text-white p-4">
					<div>
						<h1 className="text-xl font-bold ">Guesthouse</h1>

						<h2 className="text-lg font-semibold">Ryosuke</h2>
					</div>
					<div className="text-right text-xs">
						<h2 className="text-lg mb-2 font-semibold">Invoice</h2>
						<p>
							Booking ID: <span>{bookingId}</span>
						</p>
						<p>
							Booking Date:{" "}
							<span>
								{formatDateIndo(checkIn)} - {formatDateIndo(checkOut)}
							</span>
						</p>
					</div>
				</div>

				{/* Invoice To */}
				<div className="mb-6">
					<p className="text-sm font-semibold">Invoice To</p>
					<p className="text-sm">{name}</p>
					<p className="text-sm">{email}</p>
				</div>

				{/* Table */}
				<table className="w-full mb-6">
					<thead>
						<tr className="bg-gray-800 text-white">
							<th className="p-2 text-left">Description</th>
							<th className="p-2 text-right">Price</th>
							<th className="p-2 text-right">Guests</th>
							<th className="p-2 text-right">Total</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="p-2">{room}</td>
							<td className="p-2 text-right">
								{price.toLocaleString("jp-JP", {
									style: "currency",
									currency: "JPY",
								})}
							</td>
							<td className="p-2 text-right">{totalGuest}</td>
							<td className="p-2 text-right">
								{totalPrice.toLocaleString("jp-JP", {
									style: "currency",
									currency: "JPY",
								})}
							</td>
						</tr>
					</tbody>
				</table>

				{/* Payment, Status and Total */}
				<div className="mb-6">
					<p className="text-sm">
						<span className="font-semibold">Payment Method:</span>{" "}
						{paymentMethod}
					</p>
					<p className="text-sm text-gray-600">{bankOrWallet}</p>

					<p className="text-sm">
						<span className="font-semibold">Payment Status:</span>{" "}
            {paymentStatus}
					</p>

					<div className="flex justify-between mt-1 font-bold">
						<span>Grand Total</span>
						<span>
							{(totalPrice * 1.1).toLocaleString("jp-JP", {
								style: "currency",
								currency: "JPY",
							})}
						</span>
					</div>
				</div>

				{/* Terms and Signature */}
				<div className="border-t pt-4 text-center text-sm text-gray-600">
					<p>Terms: Thank you for your booking.</p>
					<p className="mt-2">Authorized Signature</p>
				</div>
			</div>

			{/* Download Button */}
			<button
				onClick={downloadPDF}
				className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
			>
				Download Invoice (PDF)
			</button>
		</div>
	);
};

export default PaymentInvoice;
