import { Link } from "react-router-dom";
import { Star, MapPin, Clock } from "lucide-react";

export default function TourCard({ tour }) {
  return (
    <div className="bg-white rounded-3xl border border-borderWarm shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between">
      <div>
        <div className="h-48 relative overflow-hidden">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-darkplum text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
            <MapPin className="w-3 h-3 text-electriccyan" /> {tour.loc}
          </span>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-ratingYellow font-bold">
              <Star className="w-3.5 h-3.5 fill-current" /> {tour.rating}
            </span>
            <span className="text-textMuted flex items-center gap-1">
              ({tour.reviews} Reviews) • <Clock className="w-3 h-3 inline" />{" "}
              {tour.days}
            </span>
          </div>
          <h3 className="text-darkplum font-bold text-base mt-3 leading-snug">
            {tour.title}
          </h3>
        </div>
      </div>

      <div className="px-6 pb-6 pt-4 border-t border-borderDefault flex items-center justify-between mt-auto">
        <div>
          <span className="block text-[10px] text-textMuted">From</span>
          <span className="text-darkplum font-black text-xl">
            {tour.price}{" "}
            <span className="text-xs font-normal text-textMuted">/ person</span>
          </span>
        </div>
        <Link
          to={`/tours/${tour.id}`}
          className="bg-bgwarm text-darkplum font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-peach3 transition inline-block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
