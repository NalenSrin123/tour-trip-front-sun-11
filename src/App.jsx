import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import ScheduleManagement from "./pages/ScheduleManagement";
import CustomersPage from "./pages/admin/customers";
import AddCustomer from "./pages/admin/customers/AddCustomer";
import EditCustomer from "./pages/admin/customers/EditCustomer";
import ToursPage from "./pages/admin/tours";
import CreateTour from "./pages/admin/tours";
import Login from "./pages/admin/auth/login";
import Register from "./pages/admin/auth/Register";
import ForgetPassword from "./pages/admin/auth/Forgot";
import VerifyCode from "./pages/admin/auth/VerifyCode";


import Listbooking from "./pages/admin/bookings/Listbooking";
import Greatebooking from "./pages/admin/bookings/Greatebooking";
import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/categories/Categories";
import Createdestination from "./pages/admin/destinations/Createdestination";
import GuidesPage from "./pages/admin/guides/GuidesPage";
import AddGuidePage from "./pages/admin/guides/AddGuidePage";
import EditGuidePage from "./pages/admin/guides/EditGuidePage";
import EditCategoryPage from "./pages/admin/categories/EditCategoryPage";
import AddCategoryPage from "./pages/admin/categories/AddCategoryPage";

import DestinationsPage from "./pages/admin/destinations/DestinationsPage";
import ProtectedRoute from "./components/guards/ProtectedRoute";
import PublicRoute from "./components/guards/PublicRoute";
import RoleRedirect from "./components/guards/RoleRedirect";
import Home from "./pages/public/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/redirect" element={<RoleRedirect />} />

        <Route element={<ProtectedRoute requireAdmin={true} />}>
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
              {<DestinationsPage/>}
            
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
            path="customers/edit/:id"
              element={<EditCustomer/>}
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
        </Route>

        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
        <Route path="/forget" element={<PublicRoute><ForgetPassword/></PublicRoute>}/>
        <Route path="/verify" element={<PublicRoute><VerifyCode/></PublicRoute>}/>

        
      </Routes>
    </Router>
  );
}

export default App;
