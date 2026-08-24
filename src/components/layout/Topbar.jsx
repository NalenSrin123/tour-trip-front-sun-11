import React from "react";
import { Search, Bell, Mail } from "lucide-react";

const Topbar = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-10">
      {/* Search Bar */}
      <div className="relative w-96">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder="Search tours, bookings..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
        />
      </div>

      {/* Right Icons & Profile */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full relative transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Message Icon */}
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <Mail className="w-5 h-5" />
        </button>

        <div className="h-6 w-px bg-gray-200"></div>

        {/* Admin Profile */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden border border-blue-200">
            {/* អ្នកអាចដាក់រូបភាព Profile ជំនួសអក្សរ A បាន */}
            <span className="text-sm">AP</span>
          </div>
          <div className="hidden md:block text-left">
            <h4 className="text-sm font-semibold text-gray-800 leading-tight">
              Admin Profile
            </h4>
            <span className="text-xs text-gray-400">admin@tourbook.com</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
