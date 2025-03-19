import React from "react";

const CurrentDate = () => {
  // Fungsi untuk mendapatkan tanggal hari ini
  const getCurrentDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options); 
  };

  return (
    <p className="text-[#5D6679] float-right mr-6 text-sm font-semibold">
      {getCurrentDate()}
    </p>
  );
};

export default CurrentDate;
