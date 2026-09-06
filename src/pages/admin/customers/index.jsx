
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initialCustomers } from "../../../data/customerMockData";

const ITEMS_PER_PAGE = 10;

export default function CustomersPage() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Search & Filter Logic
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);

    const matchesStatus =
      statusFilter === "All" || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Reset to page 1 whenever the filtered result set changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Pagination math
  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Builds the page-number list with ellipses for larger sets, e.g:
  // 1 2 3 4 5   |   1 ... 4 5 6 ... 12
  const getPageNumbers = () => {
    const pages = [];
    const windowSize = 1; // pages shown on each side of current

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

  // Export CSV handler
  const handleExport = () => {
    const headers = ["Name,Email,Phone,Bookings,Total Spent,Status,Joined\n"];
    const rows = filteredCustomers.map(
      (c) =>
        `"${c.name}","${c.email}","${c.phone}",${c.bookings},${c.totalSpent},"${c.status}","${c.joined}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customers.csv";
    a.click();
  };

  // Helper for rendering initials when no avatar picture is present
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Customers</h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage user accounts, booking history, and status.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <i className="bx bx-download text-lg"></i>
            Export
          </button>
          <button onClick={() => navigate("/admin/customers/add")}  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            <i className="bx bx-plus text-lg"></i>
            Add Customer
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <i className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
          <input
            type="text"
            placeholder="Search customers by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
            <i className="bx bx-filter-alt"></i>
            More Filters
          </button>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Contact</th>
                <th className="py-3 px-6">Bookings</th>
                <th className="py-3 px-6">Total Spent</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Joined</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {paginatedCustomers.length > 0 ? (
                paginatedCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50/50 transition">
                    {/* Customer Name & Avatar */}
                    <td className="py-4 px-6 flex items-center gap-3">
                      {customer.avatar ? (
                        <img
                          src={customer.avatar}
                          alt={customer.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 font-semibold flex items-center justify-center text-xs">
                          {getInitials(customer.name)}
                        </div>
                      )}
                      <span className="font-medium text-gray-900">
                        {customer.name}
                      </span>
                    </td>

                    {/* Contact Info */}
                    <td className="py-4 px-6">
                      <div className="text-gray-900">{customer.email}</div>
                      <div className="text-xs text-gray-400">{customer.phone}</div>
                    </td>

                    {/* Bookings */}
                    <td className="py-4 px-6 text-gray-700">{customer.bookings}</td>

                    {/* Total Spent */}
                    <td className="py-4 px-6 font-medium text-gray-900">
                      ${customer.totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full ${
                          customer.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>

                    {/* Joined Date */}
                    <td className="py-4 px-6 text-gray-500">{customer.joined}</td>

                    {/* Action Menu */}
                    <td className="py-4 px-6 text-right">
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        <i className="bx bx-dots-horizontal-rounded text-xl"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <div>
            Showing {filteredCustomers.length === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredCustomers.length)} of{" "}
            {filteredCustomers.length} customers
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