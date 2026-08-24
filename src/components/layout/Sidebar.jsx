import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  FolderTree,
  Compass,
  UsersRound,
  Calendar,
  BookOpenCheck,
  UserCheck,
  Star,
  FileText,
  CreditCard,
  Settings,
  HelpCircle,
  User,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  //list of page that admin manage
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Tours", path: "/admin/tours", icon: Map },
    { name: "Categories", path: "/admin/categories", icon: FolderTree },
    { name: "Destinations", path: "/admin/destinations", icon: Compass },
    { name: "Guides", path: "/admin/guides", icon: UserCheck },
    { name: "Schedules", path: "/admin/schedules", icon: Calendar },
    { name: "Bookings", path: "/admin/bookings", icon: BookOpenCheck },
    { name: "Customers", path: "/admin/customers", icon: UsersRound },
    { name: "Reviews", path: "/admin/reviews", icon: Star },
    { name: "Reports", path: "/admin/reports", icon: FileText },
    { name: "Payments", path: "/admin/payments", icon: CreditCard },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* Logo & Brand */}
      <div className="p-6 flex items-center space-x-3 border-b border-gray-100">
        <div className="bg-blue-600 text-white p-2 rounded-lg">
          <Map className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-blue-600 leading-tight">
            TourBook
          </h1>
          <span className="text-xs text-gray-400 font-medium">
            Admin Console
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Footer Links (Help, Profile, Logout) */}
      <div className="p-3 border-t border-gray-100 space-y-1">
        <NavLink
          to="/admin/help"
          className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <HelpCircle className="w-5 h-5" />
          <span>Help</span>
        </NavLink>

        <NavLink
          to="/admin/profile"
          className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </NavLink>

        <button
          onClick={() => {
            //logout
            console.log("Logging out...");
          }}
          className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
