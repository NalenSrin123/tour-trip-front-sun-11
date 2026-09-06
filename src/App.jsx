import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import ScheduleManagement from "./pages/ScheduleManagement";
import CustomersPage from "./pages/admin/customers";
import AddCustomer from "./pages/admin/customers/AddCustomer";

import Listbooking from "./pages/admin/bookings/Listbooking";
import Greatebooking from "./pages/admin/bookings/Greatebooking";
import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/categories/Categories";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route
            path="dashboard"
            element={
              <Dashboard/>
            }
          />
          <Route
            path="tours"
            element={
              <div className="text-xl font-bold">Tours Page Content</div>
            }
          />
          <Route
            path="categories"
            element={
              <Categories/>
            }
          />
          <Route
            path="destinations"
            element={
              <div className="text-xl font-bold">Destinations Page Content</div>
            }
          />
          <Route
            path="guides"
            element={
              <div className="text-xl font-bold">Guides Page Content</div>
            }
          />
          <Route
            path="schedules"
            element={
              <div className="text-xl font-bold">Schedules Page Content</div>
            }
          />
          <Route
            path="bookings"
            element={
              <Listbooking/>
            }
            
          />
          <Route
             path="bookings/Greatebooking"
            element={<Greatebooking />}
            
            
            
          />
          <Route
            path="customers"
              element={<CustomersPage/>}
          />
          <Route
            path="customers/add"
              element={<AddCustomer/>}
          />
          
          <Route
            path="reviews"
            element={
              <div className="text-xl font-bold">Reviews Page Content</div>
            }
          />
          <Route
            path="reports"
            element={
              <div className="text-xl font-bold">Reports Page Content</div>
            }
          />
          <Route
            path="payments"
            element={
              <div className="text-xl font-bold">Payments Page Content</div>
            }
          />
          <Route
            path="settings"
            element={
              <div className="text-xl font-bold">Settings Page Content</div>
            }
          />
          <Route
            path="help"
            element={<div className="text-xl font-bold">Help Page Content</div>}
          />
          <Route
            path="profile"
            element={
              <div className="text-xl font-bold">Profile Page Content</div>
            }
            
          />
          <Route path="schedules" element={<ScheduleManagement />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
