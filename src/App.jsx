import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScheduleManagement from "./pages/ScheduleManagement";
<link
  href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
  rel="stylesheet"
></link>;
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/schedules" replace />} />
        <Route path="/schedules" element={<ScheduleManagement />} />
        <Route path="*" element={<Navigate to="/schedules" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
