import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      {/* 1. Sidebar ឈរជើងនៅខាងឆ្វេងបង្អស់ កម្ពស់ពេញអេក្រង់ */}
      <Sidebar />

      {/* 2. ផ្នែកខាងស្តាំ៖ Topbar នៅខាងលើ និង Main Content อยู่ខាងក្រោម */}
      <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden">
        <Topbar />

        {/* Main Content សម្រាប់បង្ហាញទំព័រនីមួយៗ */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
