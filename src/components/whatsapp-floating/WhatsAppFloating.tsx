"use client";

import { useState } from "react";
import toast from "react-hot-toast";

type AdminGroup = "japan" | "indonesia";

const ADMIN_NUMBERS: Record<AdminGroup, { label: string; numbers: string[] }> =
	{
		japan: {
			label: "Admin Jepang",
			numbers: ["+81 90-8269-8767", "+81 80-3242-3077"],
		},
		indonesia: {
			label: "Admin Indonesia",
			numbers: ["+62 813-2297-7332", "+62 821-1928-0050"],
		},
	};

function sanitizeNumber(input: string) {
	return input.replace(/[^0-9]/g, "");
}

export default function WhatsAppFloating() {
	const multiGuestTemplate = `Reservation Details for Ummu Ryosuke Guesthouse

Check-in date :
Check-out date :
Total guests :

Guest 1
Name :
Date of birth :
Address :
Phone number :
Country :
Passport number :

Guest 2
Name :
Date of birth :
Address :
Phone number :
Country :
Passport number :

(Continue with details for each guest)`;

	const singleGuestTemplate = `Reservation Details for Ummu Ryosuke Guesthouse

Check-in date :
Check-out date :
Guest name :
Number of guests :
Date of birth :
Address :
Phone number :
Country :
Passport number :
Room preference :`;

	function getMessageTemplate(isMoreThanOne: boolean) {
		return isMoreThanOne ? multiGuestTemplate : singleGuestTemplate;
	}

	const [open, setOpen] = useState(false);
	const [admin, setAdmin] = useState<AdminGroup>("indonesia");
	const [selectedNumber, setSelectedNumber] = useState(
		ADMIN_NUMBERS.indonesia.numbers[1],
	);
	const [moreThanOne, setMoreThanOne] = useState(false);
	const [message, setMessage] = useState(() => getMessageTemplate(false));

	function handleAdminChange(group: AdminGroup) {
		setAdmin(group);
		setSelectedNumber(ADMIN_NUMBERS[group].numbers[0]);
	}

	function openWhatsApp() {
		if (!message.trim()) {
			alert("Please fill the reservation details first.");
			return;
		}

		const cleaned = sanitizeNumber(selectedNumber);
		const text = encodeURIComponent(message);

		window.open(`https://wa.me/${cleaned}?text=${text}`, "_blank");
	}

	function onToggleMore(e: React.ChangeEvent<HTMLInputElement>) {
		const checked = e.target.checked;
		setMoreThanOne(checked);
		setMessage(getMessageTemplate(checked));
	}

	async function copyText() {
		if (!message.trim()) {
			toast.error("Message template is empty.");
			return;
		}

		try {
			await navigator.clipboard.writeText(message);
			toast.success("Text copied successfully!");
		} catch {
			toast.error("Failed to copy text.");
		}
	}

	return (
		<div>
			<div className="fixed right-4 bottom-6 z-50">
				<div className="flex flex-col-reverse items-end md:flex-row">
					{open && (
						<div className="mb-3 w-80 overflow-hidden rounded-[32px] bg-white text-slate-900 shadow-2xl ring-1 ring-slate-200">
							<div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 text-white">
								<div className="flex items-start justify-between gap-4">
									<div>
										<p className="text-base font-semibold">Add Reservation</p>
										<p className="text-sm text-white/90">
											Complete the booking request and send it via WhatsApp.
										</p>
									</div>

									<button
										type="button"
										aria-label="Close"
										onClick={() => setOpen(false)}
										className="rounded-full bg-white/20 p-2 transition hover:bg-white/30"
									>
										✕
									</button>
								</div>
							</div>

							<div className="px-4 py-4 text-sm">
								<div className="mb-3">
									<label className="mb-2 block text-xs font-semibold text-slate-500">
										Choose Admin
									</label>

									<div className="mt-1 flex gap-2">
										<button
											type="button"
											onClick={() => handleAdminChange("indonesia")}
											className={`rounded-md border px-2 py-1 text-xs ${
												admin === "indonesia"
													? "border-amber-300 bg-amber-50"
													: "bg-white"
											}`}
										>
											Indonesia
										</button>

										<button
											type="button"
											onClick={() => handleAdminChange("japan")}
											className={`rounded-md border px-2 py-1 text-xs ${
												admin === "japan"
													? "border-amber-300 bg-amber-50"
													: "bg-white"
											}`}
										>
											Japan
										</button>
									</div>
								</div>

								<div className="mb-3">
									<label className="mb-2 block text-xs font-semibold text-slate-500">
										Numbers
									</label>

									<div className="flex flex-col gap-1">
										{ADMIN_NUMBERS[admin].numbers.map((number) => (
											<button
												key={number}
												type="button"
												onClick={() => setSelectedNumber(number)}
												className={`rounded-lg p-2 text-left text-xs transition ${
													selectedNumber === number
														? "border border-amber-200 bg-amber-50"
														: "hover:bg-slate-50"
												}`}
											>
												{number}
											</button>
										))}
									</div>
								</div>

								<div className="mb-3">
									<label className="flex items-center gap-2 text-xs text-gray-600">
										<input
											type="checkbox"
											checked={moreThanOne}
											onChange={onToggleMore}
										/>
										Guests more than 1?
									</label>
								</div>

								<div className="mb-4">
									<label className="mb-2 block text-xs font-semibold text-slate-500">
										Message Template
									</label>

									<textarea
										value={message}
										placeholder={"Fill in the reservation details here..."}
										onChange={(e) => setMessage(e.target.value)}
										className="h-32 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
									/>
								</div>

								<div className="flex flex-col gap-3 md:flex-row md:justify-end">
									<button
										type="button"
										onClick={copyText}
										className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 md:w-auto"
									>
										Copy text
									</button>

									<button
										type="button"
										onClick={openWhatsApp}
										className="w-full rounded-2xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-amber-200/60 transition hover:bg-amber-700 md:w-auto"
									>
										Send via WhatsApp
									</button>
								</div>
							</div>
						</div>
					)}

					{!open && (
						<button
							type="button"
							onClick={() => setOpen(true)}
							aria-label="WhatsApp"
							className="flex h-24 w-24 items-center justify-center rounded-full bg-amber-500 text-white shadow-2xl shadow-amber-300/50 transition hover:scale-105"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								className="h-10 w-10"
							>
							<path
								fill="currentColor"
								d="M20.52 3.48A11.95 11.95 0 0012 0C5.373 0 0 5.373 0 12a11.95 11.95 0 003.48 8.52L0 24l3.6-1.08A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12 0-3.21-1.256-6.21-3.48-8.52zM12 21.6c-1.86 0-3.654-.48-5.22-1.38l-.37-.22-2.16.648.648-2.16-.226-.374A8.4 8.4 0 013.6 12c0-4.68 3.82-8.4 8.4-8.4 2.24 0 4.34.87 5.92 2.45a8.358 8.358 0 012.45 5.95c0 4.68-3.72 8.4-8.4 8.4z"
							/>
							<path
								fill="currentColor"
								d="M17.59 14.37c-.29-.15-1.71-.84-1.98-.94-.27-.1-.47-.15-.67.15-.2.29-.78.94-.96 1.13-.18.2-.36.22-.66.07-.29-.15-1.22-.45-2.33-1.45-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.12-.6.12-.12.29-.32.43-.48.14-.17.18-.29.29-.48.1-.19.04-.36-.02-.5-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.19 0-.5.07-.76.36-.27.29-1.03 1.01-1.03 2.47 0 1.45 1.05 2.85 1.2 3.05.15.2 2.08 3.36 5.04 4.72 2.96 1.36 2.96.91 3.5.85.54-.06 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.27-.19-.56-.34z"
							/>
							</svg>
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
