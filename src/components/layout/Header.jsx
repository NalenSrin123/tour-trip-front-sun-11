import React from "react";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
      <div className="relative w-80">
        <i className="bx bx-search absolute left-3 top-2.5 text-gray-400 text-lg"></i>
        <input
          type="text"
          placeholder="Search..."
          readOnly
          className="w-full pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg"
        />
      </div>

      <div className="flex items-center gap-4">
        <i className="bx bx-bell text-xl text-gray-500 cursor-pointer"></i>
        <i className="bx bx-envelope text-xl text-gray-500 cursor-pointer"></i>
        <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
          <img
            src="https://i.pravatar.cc/100?img=33"
            alt="Admin Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-gray-700">
            Admin Profile
          </span>
        </div>
      </div>
    </header>
  );
}
