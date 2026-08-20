import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Compass, Search, Heart, Menu, X } from "lucide-react";
import FloatingSearch from "./Floatingsearch";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/tours", label: "Tours" },
  { path: "/destinations", label: "Destinations" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

export default function Navbar({ wishlistCount = 2 }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const go = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-borderDefault shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-darkplum via-tealcyan to-electriccyan flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <div className="text-left">
            <span className="block text-2xl font-black text-darkplum tracking-tight leading-none">
              Travel<span className="text-electriccyan">Ease</span>
            </span>
            <span className="block text-[9px] uppercase tracking-widest text-textMuted font-bold -mt-0.5">
              Curated Adventures
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`pb-1 transition border-b-2 ${
                isActive(link.path)
                  ? "text-electriccyan border-electriccyan"
                  : "text-textBody border-transparent hover:text-electriccyan"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => {
              setSearchOpen((o) => !o);
              setMobileOpen(false);
            }}
            title="Search Tours"
            className={`p-2 rounded-full transition ${
              searchOpen
                ? "text-electriccyan bg-bgcard"
                : "text-textSec hover:text-darkplum hover:bg-bgcard"
            }`}
          >
            <Search className="w-5 h-5" />
          </button>

          <Link
            to="/wishlist"
            title="Saved Wishlist"
            className="relative p-2 text-textSec hover:text-pink-600 rounded-full hover:bg-bgcard transition"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <div className="hidden sm:flex items-center space-x-3">
            <Link
              to="/login"
              className="text-sm font-semibold text-darkplum hover:text-electriccyan px-3 py-2 transition"
            >
              Sign In
            </Link>
            <button
              onClick={() => go("/tours")}
              className="bg-electriccyan hover:bg-darkteal text-white font-bold px-5 py-2.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              setMobileOpen((o) => !o);
              setSearchOpen(false);
            }}
            className="md:hidden p-2 text-darkplum"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <FloatingSearch open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-borderDefault px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => go(link.path)}
              className={`block w-full text-left font-semibold py-2 ${
                isActive(link.path) ? "text-electriccyan" : "text-textBody"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => go("/wishlist")}
            className="block w-full text-left font-semibold text-textBody py-2"
          >
            Wishlist
          </button>
          <button
            onClick={() => go("/my-bookings")}
            className="block w-full text-left font-semibold text-textBody py-2"
          >
            My Bookings
          </button>
          <div className="pt-3 border-t border-borderDefault flex space-x-2">
            <button
              onClick={() => go("/login")}
              className="w-1/2 py-2 text-center font-bold text-darkplum bg-bgcard rounded-lg"
            >
              Sign In
            </button>
            <button
              onClick={() => go("/tours")}
              className="w-1/2 py-2 text-center font-bold text-white bg-electriccyan rounded-lg"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
