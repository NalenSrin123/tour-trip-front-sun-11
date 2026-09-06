import React from "react";
import { TOUR_OPTIONS } from "../../data/scheduleData";

const STATUS_STYLES = {
  Confirmed: "bg-green-50 text-green-700",
  Pending: "bg-amber-50 text-amber-700",
  Full: "bg-blue-50 text-blue-700",
  Cancelled: "bg-red-50 text-red-700",
};

export default function ScheduleTableRow({
  row,
  onEdit,
  onRequestDelete,
  onConfirmDelete,
  onCancelDelete,
  confirmingDelete,
}) {
  const tour = TOUR_OPTIONS.find((t) => t.id === row.tourId);
  const isFull = row.seatsBooked >= row.seatsTotal;

  return (
    <tr className="border-b border-gray-200 last:border-0 hover:bg-gray-50/50 transition">
      <td className="py-3.5 px-4 text-sm text-gray-700 whitespace-nowrap">
        <div className="font-medium text-gray-900">{formatDate(row.date)}</div>
        <div className="text-xs text-gray-500">{formatTime(row.time)}</div>
      </td>

      <td className="py-3.5 px-4 text-sm text-gray-900 font-medium">
        {tour ? tour.name : "Unknown Tour"}
      </td>

      <td className="py-3.5 px-4 text-sm text-gray-600">
        {tour ? tour.destination : "—"}
      </td>

      <td className="py-3.5 px-4 text-sm text-gray-600">{row.guide}</td>

      <td className="py-3.5 px-4 text-sm">
        <span
          className={isFull ? "text-red-600 font-semibold" : "text-gray-700"}
        >
          {row.seatsBooked} / {row.seatsTotal}
        </span>
        <div className="w-20 h-1.5 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
          <div
            className={`h-full rounded-full ${isFull ? "bg-red-400" : "bg-blue-500"}`}
            style={{
              width: `${Math.min(100, (row.seatsBooked / row.seatsTotal) * 100)}%`,
            }}
          />
        </div>
      </td>

      <td className="py-3.5 px-4">
        <span
          className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
            STATUS_STYLES[row.status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {row.status}
        </span>
      </td>

      <td className="py-3.5 px-4 text-right">
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => onEdit(row.id)}
            title="Edit schedule"
            className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition cursor-pointer"
          >
            <i className="bx bx-edit text-lg"></i>
          </button>

          {confirmingDelete ? (
            <div className="flex items-center gap-1 bg-red-50 rounded-lg px-1.5 py-1">
              <button
                onClick={() => onConfirmDelete(row.id)}
                className="text-red-600 text-xs font-semibold px-2 py-1 hover:bg-red-100 rounded-md transition cursor-pointer"
              >
                Confirm
              </button>
              <button
                onClick={onCancelDelete}
                className="text-gray-500 text-xs px-2 py-1 hover:bg-white rounded-md transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => onRequestDelete(row.id)}
              title="Delete schedule"
              className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
            >
              <i className="bx bx-trash text-lg"></i>
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(timeStr) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":");
  const hour = Number(h);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${m} ${period}`;
}
