"use client";
import React, { useState, useEffect } from "react";

const Calendar = () => {
	const today = new Date();
	const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth()); // Index bulan saat ini
	const [currentYear] = useState(today.getFullYear()); // Tahun saat ini
	const [selectedDate, setSelectedDate] = useState(null); // Menyimpan tanggal yang dipilih

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const handlePrevMonth = () => {
		setCurrentMonthIndex((prevIndex) => (prevIndex === 0 ? 11 : prevIndex - 1));
	};

	const handleNextMonth = () => {
		setCurrentMonthIndex((prevIndex) => (prevIndex === 11 ? 0 : prevIndex + 1));
	};

	const handleSelectDate = (day: any) => {
		setSelectedDate(day);
	};

	useEffect(() => {
		// Setel bulan yang sesuai dengan tahun yang dipilih
		const month = new Date(currentYear, currentMonthIndex, 1);
		const firstDay = month.getDay(); // Hari pertama bulan tersebut
		const daysInMonth = new Date(
			currentYear,
			currentMonthIndex + 1,
			0
		).getDate(); // Jumlah hari di bulan tersebut

		const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
		setCalendarData({ monthName: months[currentMonthIndex], days, firstDay });
	}, [currentMonthIndex, currentYear]);

	const [calendarData, setCalendarData] = useState({
		monthName: "",
		days: [],
		firstDay: 0,
	});

	const renderDays = () => {
		const { days, firstDay } = calendarData;
		const daysCells = [];

		// Tambahkan cell kosong untuk menyesuaikan hari pertama
		for (let i = 0; i < firstDay; i++) {
			daysCells.push(<td key={`empty-${i}`} className="pt-6"></td>);
		}

		// Tambahkan hari-hari bulan tersebut
		days.forEach((day, index) => {
			const isSelected = selectedDate === day;
			daysCells.push(
				<td key={index} className="pt-6">
					<div
						onClick={() => handleSelectDate(day)}
						className={`px-2 py-2 cursor-pointer flex w-full justify-center rounded-full 
              ${
								isSelected
									? "bg-blue-500 text-white"
									: "text-gray-500 hover:bg-gray-200"
							}`}
					>
						<p className="text-base font-medium">{day}</p>
					</div>
				</td>
			);
		});

		// Split ke dalam baris dengan 7 kolom
		const rows = [];
		for (let i = 0; i < daysCells.length; i += 7) {
			rows.push(<tr key={`row-${i}`}>{daysCells.slice(i, i + 7)}</tr>);
		}

		return rows;
	};

	return (
		<div className="flex items-center justify-center lg:justify-start py-8 px-4">
			<div className="max-w-full w-full lg:w-[40%] shadow-lg">
				<div className="p-6 border bg-white rounded-t lg:w-full lg:mx-auto">
					<div className="px-4 flex items-center justify-center">
						<button
							aria-label="Previous month"
							className="focus:text-gray-400 hover:text-gray-400 text-gray-800 "
							onClick={handlePrevMonth}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-chevron-left"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<polyline points="15 6 9 12 15 18" />
							</svg>
						</button>
						<span
							aria-live="polite"
							className="focus:outline-none text-xl font-bold"
						>
							{calendarData.monthName} {currentYear}
						</span>
						<button
							aria-label="Next month"
							className="focus:text-gray-400 hover:text-gray-400 text-gray-800 "
							onClick={handleNextMonth}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-chevron-right"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<polyline points="9 6 15 12 9 18" />
							</svg>
						</button>
					</div>

					
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 lg:ml-12">
						<div className="border rounded-md p-4 bg-white mx-auto lg:m">
						
							<table className="w-full table-auto mt-4 mx-auto">
								<thead>
									<tr>
										{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
											(day, index) => (
												<th key={index}>
													<div className="w-full flex justify-center">
														<p className="text-base font-medium text-center ">
															{day}
														</p>
													</div>
												</th>
											)
										)}
									</tr>
								</thead>
								<tbody>{renderDays()}</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>


	);
};

export default Calendar;
