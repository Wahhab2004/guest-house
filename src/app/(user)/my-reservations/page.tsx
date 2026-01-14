"use client";

import ReservationDetailModal from "@/components/my-reservation/myReservationDetailModal";
import ReservationCard from "@/components/my-reservation/myReservtionCard";
import { Guest, Reservation } from "@/fetching";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const tabs: ("ACTIVE" | "PAST" | "CANCELLED")[] = [
  "ACTIVE",
  "PAST",
  "CANCELLED",
];

const ReservationTabs = () => {
  const [user, setUser] = useState<Guest | null>(null);
  const [activeTab, setActiveTab] = useState<"ACTIVE" | "PAST" | "CANCELLED">(
    "ACTIVE"
  );
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await axios.get(`${baseUrl}/reservations`, {
          params: { bookerId: user.id },
        });
        setReservations(res.data.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch reservations");
        } else {
          setError("Failed to fetch reservations");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [user]);

  // Filter sesuai tab
  const filteredReservations = reservations.filter((r) => {
    if (activeTab === "ACTIVE")
      return r.status === "ACTIVE" || r.status === "CONFIRMED";
    if (activeTab === "PAST") return r.status === "CHECKED_OUT";
    if (activeTab === "CANCELLED") return r.status === "CANCELED";
    return false;
  });

  return (
    <div className="w-11/12 mx-auto my-[100px]">
      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "ACTIVE"
              ? "Active Bookings"
              : tab === "PAST"
              ? "Past Bookings"
              : "Cancelled Bookings"}
          </button>
        ))}
      </div>

      {/* Loading/Error */}
      {loading && (
        <p className="text-center text-gray-500">Loading reservations...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Reservations List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading &&
          !error &&
          (filteredReservations.length ? (
            filteredReservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onViewDetail={() => setSelectedReservation(reservation)}
              />
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full">
              No reservations found.
            </p>
          ))}
      </div>

      {/* Detail Modal */}
      {selectedReservation && (
        <ReservationDetailModal
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
        />
      )}
    </div>
  );
};

export default ReservationTabs;
