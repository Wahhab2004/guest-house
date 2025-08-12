"use client";

import { useState } from "react";

export default function ReservationPage() {
  const [activeTab, setActiveTab] = useState<"will-come" | "present" | "end">("will-come");

  const tabs = [
    { key: "will-come", label: "Will Come" },
    { key: "present", label: "Present" },
    { key: "end", label: "End" },
  ] as const;

  return (
    <div className="p-6 mt-20">
      {/* Tab Header */}
      <div className="flex gap-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 px-4 border-b-2 font-medium ${
              activeTab === tab.key
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "will-come" && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Will Come Reservations</h2>
            <p>List tamu yang akan datang...</p>
          </div>
        )}
        {activeTab === "present" && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Present Reservations</h2>
            <p>List tamu yang sedang menginap...</p>
          </div>
        )}
        {activeTab === "end" && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Ended Reservations</h2>
            <p>List tamu yang sudah checkout...</p>
          </div>
        )}
      </div>
    </div>
  );
}
