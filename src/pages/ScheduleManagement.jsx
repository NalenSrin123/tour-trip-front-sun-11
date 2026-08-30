import React, { useState, useMemo, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ScheduleFilterBar from "../components/schedule/ScheduleFilterBar";
import ScheduleTableRow from "../components/schedule/ScheduleTableRow";
import SchedulePagination from "../components/schedule/SchedulePagination";
import { STATIC_SCHEDULES, TOUR_OPTIONS } from "../data/scheduleData";
import ScheduleFormModal from "../components/schedule/Scheduleformmadal";

const STORAGE_KEY = "traveleast_schedules";
const PAGE_SIZE = 5;

function loadSchedules() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : STATIC_SCHEDULES;
  } catch {
    return STATIC_SCHEDULES;
  }
}

export default function ScheduleManagement() {
  const [schedules, setSchedules] = useState(loadSchedules);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Persist changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
    } catch {
      // ignore write failures
    }
  }, [schedules]);

  // Filter
  const filtered = useMemo(() => {
    return schedules.filter((row) => {
      const tour = TOUR_OPTIONS.find((t) => t.id === row.tourId);
      const matchesSearch =
        !search ||
        tour?.name.toLowerCase().includes(search.toLowerCase()) ||
        tour?.destination.toLowerCase().includes(search.toLowerCase()) ||
        row.guide.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || row.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [schedules, search, statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // CRUD
  const openAddModal = () => {
    setEditingId(null);
    setModalOpen(true);
  };

  const openEditModal = (id) => {
    setEditingId(id);
    setModalOpen(true);
  };

  const handleSave = (data) => {
    if (editingId) {
      setSchedules((prev) =>
        prev.map((row) => (row.id === editingId ? { ...row, ...data } : row)),
      );
    } else {
      const newRow = {
        id: crypto.randomUUID ? crypto.randomUUID() : `sch_${Date.now()}`,
        ...data,
      };
      setSchedules((prev) => [...prev, newRow]);
    }
    setModalOpen(false);
  };

  const handleConfirmDelete = (id) => {
    setSchedules((prev) => prev.filter((row) => row.id !== id));
    setDeleteTargetId(null);
  };

  const editingEntry = schedules.find((row) => row.id === editingId) || null;

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-8 max-w-7xl w-full mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Tour Schedule Management
              </h1>
              <p className="text-sm text-gray-500">
                Manage upcoming tour dates, guide assignments, and availability.
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg shadow-sm transition cursor-pointer"
            >
              <i className="bx bx-plus text-lg mr-1.5"></i> Add Schedule
            </button>
          </div>

          <ScheduleFilterBar
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {paginated.length === 0 ? (
              <div className="py-16 text-center">
                <i className="bx bx-calendar-x text-3xl text-gray-300"></i>
                <p className="text-gray-900 font-semibold text-sm mt-2">
                  No schedules found
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Try adjusting your search or filters, or add a new schedule.
                </p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <th className="py-3.5 px-4">Date & Time</th>
                    <th className="py-3.5 px-4">Tour</th>
                    <th className="py-3.5 px-4">Destination</th>
                    <th className="py-3.5 px-4">Guide</th>
                    <th className="py-3.5 px-4">Seats</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((row) => (
                    <ScheduleTableRow
                      key={row.id}
                      row={row}
                      onEdit={openEditModal}
                      onRequestDelete={setDeleteTargetId}
                      onConfirmDelete={handleConfirmDelete}
                      onCancelDelete={() => setDeleteTargetId(null)}
                      confirmingDelete={deleteTargetId === row.id}
                    />
                  ))}
                </tbody>
              </table>
            )}

            <SchedulePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filtered.length}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </div>

      {modalOpen && (
        <ScheduleFormModal
          entry={editingEntry}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
