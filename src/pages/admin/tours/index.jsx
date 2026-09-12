import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initialTours } from "../../../data/tourMockdata";
import { fetchTours } from "../../../services/tourService";

const ITEMS_PER_PAGE = 10;

export default function ToursPage() {
  const navigate = useNavigate();
  const [tours, setTours] = useState(initialTours);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [destinationFilter, setDestinationFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Search & Filter Logic
  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || tour.category === categoryFilter;
    const matchesDestination =
      destinationFilter === "All" || tour.destination === destinationFilter;
    const matchesStatus =
      statusFilter === "All" || tour.status === statusFilter;

    return matchesSearch && matchesCategory && matchesDestination && matchesStatus;
  });

  // Load fresh data from the service & keep list in sync with additions
  useEffect(() => {
    fetchTours().then(setTours);
    const handleToursUpdated = () => fetchTours().then(setTours);
    window.addEventListener("toursUpdated", handleToursUpdated);
    return () => window.removeEventListener("toursUpdated", handleToursUpdated);
  }, []);

  // Reset to page 1 whenever the filtered result set changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, destinationFilter, statusFilter]);

  // Pagination math
  const totalPages = Math.max(1, Math.ceil(filteredTours.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedTours = filteredTours.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Builds the page-number list with ellipses for larger sets
  const getPageNumbers = () => {
    const pages = [];
    const windowSize = 1;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);
    const start = Math.max(2, safePage - windowSize);
    const end = Math.min(totalPages - 1, safePage + windowSize);

    if (start > 2) pages.push("ellipsis-start");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("ellipsis-end");

    pages.push(totalPages);
    return pages;
  };

  // Distinct category & destination options for the filter dropdowns
  const categories = ["All", ...new Set(tours.map((t) => t.category))];
  const destinations = ["All", ...new Set(tours.map((t) => t.destination))];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="dashboard-header">
          <h1>Manage Tours</h1>
          <p>
            View, edit, and manage your tour catalog.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/tours/create")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            <i className="bx bx-plus text-lg"></i>
            Add New Tour
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <i className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
          <input
            type="text"
            placeholder="Search tours..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Categories</option>
            {categories.filter((c) => c !== "All").map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={destinationFilter}
            onChange={(e) => setDestinationFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Destinations</option>
            {destinations.filter((d) => d !== "All").map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
          </select>

          <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
            <i className="bx bx-filter-alt"></i>
            More Filters
          </button>
        </div>
      </div>

      {/* Tour Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-6">Tour</th>
                <th className="py-3 px-6">Destination</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Duration</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {paginatedTours.length > 0 ? (
                paginatedTours.map((tour) => (
                  <tr key={tour.id} className="hover:bg-gray-50/50 transition">
                    {/* Tour Thumbnail & Title */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {tour.image ? (
                          <img
                            src={tour.image}
                            alt={tour.title}
                            className="w-14 h-14 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-lg bg-purple-100 text-purple-600 font-semibold flex items-center justify-center">
                            <i className="bx bx-trip text-2xl"></i>
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">
                            {tour.title}
                          </div>
                          <div className="text-xs text-gray-400">ID: {tour.id}</div>
                        </div>
                      </div>
                    </td>

                    {/* Destination */}
                    <td className="py-4 px-6 text-gray-700">
                      {tour.destination}
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6 text-gray-700">{tour.category}</td>

                    {/* Duration */}
                    <td className="py-4 px-6 text-gray-700">{tour.duration}</td>

                    {/* Price */}
                    <td className="py-4 px-6 font-bold text-gray-900">
                      ${tour.price.toFixed(2)}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full ${
                          tour.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {tour.status}
                      </span>
                    </td>

                    {/* Action Icons */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          title="View"
                          className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                        >
                          <i className="bx bx-show text-lg"></i>
                        </button>
                        <button
                          title="Edit"
                          className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                        >
                          <i className="bx bx-pencil text-lg"></i>
                        </button>
                        <button
                          title="Schedule"
                          className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                        >
                          <i className="bx bx-calendar text-lg"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">
                    No tours found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <div>
            Showing {filteredTours.length === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredTours.length)} of{" "}
            {filteredTours.length} tours
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="bx bx-chevron-left"></i>
            </button>

            {getPageNumbers().map((page, idx) =>
              typeof page === "number" ? (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 rounded-lg font-medium ${
                    page === safePage
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span key={`${page}-${idx}`} className="px-1">
                  ...
                </span>
              )
            )}

            <button
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="bx bx-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}