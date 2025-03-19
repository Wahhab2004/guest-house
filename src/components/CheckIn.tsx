import React, { useState } from "react";

// Data Slider
const sliderData = [
  {
    reservationId: "RES001",
    guestName: "John Doe",
    dateTimeCheckOut: "2025-01-01 12:00 PM",
    roomType: "Deluxe",
    totalAmountPaid: "$150",
    paymentMethod: "Credit Card",
    numberOfGuests: 2,
    detail: "Ocean View Room",
  },
  {
    reservationId: "RES002",
    guestName: "Jane Smith",
    dateTimeCheckOut: "2025-01-02 1:00 PM",
    roomType: "Suite",
    totalAmountPaid: "$200",
    paymentMethod: "PayPal",
    numberOfGuests: 4,
    detail: "Luxury Suite",
  },
  {
    reservationId: "RES003",
    guestName: "Alice Brown",
    dateTimeCheckOut: "2025-01-03 10:00 AM",
    roomType: "Standard",
    totalAmountPaid: "$100",
    paymentMethod: "Debit Card",
    numberOfGuests: 1,
    detail: "City View Room",
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fungsi untuk pindah ke slide berikutnya
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
  };

  // Fungsi untuk pindah ke slide sebelumnya
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1
    );
  };

  return (
    <main>
      <div>
        <div>
          {/* Render data slider */}
          {sliderData.map((item, index) => (
            <div
              key={item.reservationId}
              style={{
                display: index === currentIndex ? "block" : "none",
              }}
            >
              <h2>Reservation ID: {item.reservationId}</h2>
              <p>Guest Name: {item.guestName}</p>
              <p>Check Out: {item.dateTimeCheckOut}</p>
              <p>Room Type: {item.roomType}</p>
              <p>Total Paid: {item.totalAmountPaid}</p>
              <p>Payment: {item.paymentMethod}</p>
              <p>Guests: {item.numberOfGuests}</p>
              <p>Details: {item.detail}</p>
            </div>
          ))}
        </div>
        <div>
          <button onClick={prevSlide}>Previous</button>
          <button onClick={nextSlide}>Next</button>
        </div>
      </div>
    </main>
  );
};

export default Slider;
