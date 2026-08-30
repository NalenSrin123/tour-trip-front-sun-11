import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SIDEBAR_LINKS } from "../../data/navigationData";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        <div className="p-6">
          <div className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <i className="bx bxs-flag-alt"></i> TourBook
          </div>
          <span className="text-[10px] font-bold text-gray-400 tracking-wider">
            ADMIN CONSOLE
          </span>
        </div>

        <nav className="px-3 space-y-1">
          {SIDEBAR_LINKS.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.label}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <i className={`bx ${link.icon} text-lg`}></i>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 border-t border-gray-100 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-50 rounded-lg">
          <i className="bx bx-help-circle text-lg"></i> Help
        </div>
        <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-50 rounded-lg">
          <i className="bx bx-user text-lg"></i> Profile
        </div>
        <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-50 rounded-lg">
          <i className="bx bx-log-out text-lg"></i> Logout
        </div>
      </div>
    </aside>
  );
}
