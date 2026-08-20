import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, X } from "lucide-react";

const DESTINATIONS = [
  "Siem Reap, Cambodia",
  "Ha Long Bay, Vietnam",
  "Kyoto, Japan",
  "Phuket, Thailand",
  "Bali, Indonesia",
  "Hanoi, Vietnam",
];

export default function FloatingSearch({ open, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  // Autofocus when opened
  useEffect(() => {
    if (open) {
      // slight delay lets the mount/animation settle before focusing
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Close on outside click (clicking the backdrop)
  useEffect(() => {
    function handleClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  if (!open) return null;

  const suggestions = query
    ? DESTINATIONS.filter((d) => d.toLowerCase().includes(query.toLowerCase()))
    : DESTINATIONS.slice(0, 4);

  const runSearch = (value) => {
    const q = value ?? query;
    if (!q) return;
    navigate(`/tours?destination=${encodeURIComponent(q)}`);
    setQuery("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32 px-4 bg-darkplum/40 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]">
      <div
        ref={panelRef}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-[slideDown_0.2s_ease-out]"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-borderDefault">
          <Search className="w-5 h-5 text-textMuted flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
            placeholder="Search tours, destinations, or experiences..."
            className="flex-1 bg-transparent text-base text-darkplum placeholder:text-textMuted focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-textMuted hover:text-darkplum transition flex-shrink-0 p-1 rounded-full hover:bg-bgcard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 max-h-80 overflow-y-auto">
          {!query && (
            <p className="px-2 pt-1 pb-2 text-[11px] font-bold uppercase text-textMuted tracking-wide">
              Popular Destinations
            </p>
          )}
          {suggestions.length > 0 ? (
            suggestions.map((d) => (
              <button
                key={d}
                onClick={() => runSearch(d)}
                className="w-full flex items-center gap-2.5 text-left px-3 py-2.5 rounded-xl text-sm text-darkplum hover:bg-bgcard transition"
              >
                <MapPin className="w-4 h-4 text-electriccyan flex-shrink-0" />
                {d}
              </button>
            ))
          ) : (
            <div className="px-3 py-4 text-sm text-textMuted">
              No matches found
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-12px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  );
}
