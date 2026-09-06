import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { TOURS } from "../data/mockData";
import TourCard from "../components/TourCard";

const ITEMS_PER_PAGE = 3;

export default function ToursPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Read parameters from URL
  const destinationQuery = searchParams.get("destination") || "";
  const dateQuery = searchParams.get("date") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // 2. Filter dataset
  const filteredTours = TOURS.filter((tour) => {
    if (!destinationQuery) return true;
    return (
      tour.loc.toLowerCase().includes(destinationQuery.toLowerCase()) ||
      tour.title.toLowerCase().includes(destinationQuery.toLowerCase())
    );
  });

  // 3. Paginate filtered dataset
  const totalPages = Math.ceil(filteredTours.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTours = filteredTours.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Helper to update specific parameters while keeping others intact
  const updateParams = (newParams) => {
    const updated = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        updated.set(key, value);
      } else {
        updated.delete(key);
      }
    });
    setSearchParams(updated);
  };

  const handlePageChange = (newPage) => {
    updateParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeFilter = (key) => {
    updateParams({ [key]: null, page: "1" });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-darkplum mb-2">
        Explore Tours
      </h1>

      {/* Active Filters Display */}
      {(destinationQuery || dateQuery) && (
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          <span className="text-xs font-bold text-textMuted uppercase tracking-wider">
            Active Filters:
          </span>
          {destinationQuery && (
            <span className="inline-flex items-center gap-1.5 bg-electriccyan/10 text-darkteal text-xs font-semibold px-3 py-1.5 rounded-full">
              Location: "{destinationQuery}"
              <button
                onClick={() => removeFilter("destination")}
                className="hover:opacity-75"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          {dateQuery && (
            <span className="inline-flex items-center gap-1.5 bg-electriccyan/10 text-darkteal text-xs font-semibold px-3 py-1.5 rounded-full">
              Date: {dateQuery}
              <button
                onClick={() => removeFilter("date")}
                className="hover:opacity-75"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          <button
            onClick={() => setSearchParams({})}
            className="text-xs text-rose-600 font-bold hover:underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Tour Grid */}
      {paginatedTours.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paginatedTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-bgwarmSec rounded-3xl">
          <p className="text-lg font-bold text-darkplum">
            No tours found matching your search.
          </p>
          <button
            onClick={() => setSearchParams({})}
            className="mt-4 bg-electriccyan text-white px-6 py-2.5 rounded-xl text-xs font-bold"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="p-2 rounded-xl border border-borderWarm text-darkplum disabled:opacity-40 disabled:cursor-not-allowed hover:bg-bgwarmSec transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-10 h-10 rounded-xl font-bold text-xs transition ${
                  currentPage === pageNum
                    ? "bg-darkplum text-white"
                    : "bg-white border border-borderWarm text-darkplum hover:bg-bgwarmSec"
                }`}
              >
                {pageNum}
              </button>
            ),
          )}

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="p-2 rounded-xl border border-borderWarm text-darkplum disabled:opacity-40 disabled:cursor-not-allowed hover:bg-bgwarmSec transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
