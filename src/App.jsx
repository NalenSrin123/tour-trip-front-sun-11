import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Home from "./page/home.jsx";

// Placeholder pages until they're built out — replace these with real
// page components as you go (e.g. import Tours from "./Tours.jsx").
function Placeholder({ title }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-bgwarm">
      <h1 className="text-2xl font-bold text-darkplum">
        {title} — coming soon
      </h1>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Placeholder title="Tours" />} />
        <Route
          path="/destinations"
          element={<Placeholder title="Destinations" />}
        />
        <Route path="/about" element={<Placeholder title="About" />} />
        <Route path="/contact" element={<Placeholder title="Contact" />} />
        <Route path="/wishlist" element={<Placeholder title="Wishlist" />} />
        <Route path="/login" element={<Placeholder title="Sign In" />} />
        <Route
          path="/my-bookings"
          element={<Placeholder title="My Bookings" />}
        />
        <Route
          path="*"
          element={<Placeholder title="404 — Page Not Found" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
