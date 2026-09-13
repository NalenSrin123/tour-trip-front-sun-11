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
import ToursPage from "./pages/admin/tours";
import CreateTour from "./pages/admin/tours";

import Listbooking from "./pages/admin/bookings/Listbooking";
import Greatebooking from "./pages/admin/bookings/Greatebooking";
import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/categories/Categories";
import Pagedestination from "./pages/admin/destinations/Pagedestination";
import Createdestination from "./pages/admin/destinations/Createdestination";
import GuidesPage from "./pages/admin/guides/GuidesPage";
import AddGuidePage from "./pages/admin/guides/AddGuidePage";
import EditGuidePage from "./pages/admin/guides/EditGuidePage";
import EditCategoryPage from "./pages/admin/categories/EditCategoryPage";
import AddCategoryPage from "./pages/admin/categories/AddCategoryPage";


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
            element={<ToursPage />}
          />
          <Route
            path="tours/create"
            element={<CreateTour />}
          />
          <Route
            path="categories"
            element={
              <Categories/>
            }
          />
          <Route path="categories/add" element={<AddCategoryPage />} />
          <Route path="categories/edit/:id" element={<EditCategoryPage />} />



          <Route
            path="destinations"
            element=
              {<Pagedestination/>}
            
          />
          <Route
            path="destinations/create"
            element={<Createdestination />}
          />
          <Route
            path="guides"
            element={
              <GuidesPage/>
            }
          />

          <Route path="guides/add" element={ <AddGuidePage/>}/>
          <Route path="guides/edit/:id" element={ <EditGuidePage/>}/>

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
