import React, { useState } from "react";
import {
  TOUR_OPTIONS,
  GUIDE_OPTIONS,
  STATUS_OPTIONS,
} from "../../data/scheduleData";

export default function ScheduleFormModal({ entry, onClose, onSave }) {
  const isEditing = Boolean(entry);

  const [tourId, setTourId] = useState(
    entry?.tourId || TOUR_OPTIONS[0]?.id || "",
  );
  const [date, setDate] = useState(entry?.date || "");
  const [time, setTime] = useState(entry?.time || "");
  const [guide, setGuide] = useState(entry?.guide || GUIDE_OPTIONS[0] || "");
  const [seatsTotal, setSeatsTotal] = useState(entry?.seatsTotal ?? 15);
  const [seatsBooked, setSeatsBooked] = useState(entry?.seatsBooked ?? 0);
  const [status, setStatus] = useState(entry?.status || STATUS_OPTIONS[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tourId || !date || !time) return;
    onSave({
      tourId,
      date,
      time,
      guide,
      seatsTotal: Number(seatsTotal),
      seatsBooked: Number(seatsBooked),
      status,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900/40 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-gray-900 font-bold text-lg">
            {isEditing ? "Edit Schedule" : "Add Schedule"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            <i className="bx bx-x text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tour */}
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1.5">
              Tour
            </label>
            <select
              value={tourId}
              onChange={(e) => setTourId(e.target.value)}
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
            >
              {TOUR_OPTIONS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} — {t.destination}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1.5">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 [color-scheme:light]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1.5">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 [color-scheme:light]"
              />
            </div>
          </div>

          {/* Guide */}
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1.5">
              Guide
            </label>
            <select
              value={guide}
              onChange={(e) => setGuide(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
            >
              {GUIDE_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Seats */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1.5">
                Total Seats
              </label>
              <input
                type="number"
                min={1}
                value={seatsTotal}
                onChange={(e) => setSeatsTotal(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1.5">
                Booked
              </label>
              <input
                type="number"
                min={0}
                value={seatsBooked}
                onChange={(e) => setSeatsBooked(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1.5">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition cursor-pointer"
            >
              {isEditing ? "Save Changes" : "Add Schedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
