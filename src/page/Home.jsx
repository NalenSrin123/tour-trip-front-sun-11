import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";

const tours = [
  {
    loc: "Siem Reap, Cambodia",
    title: "Angkor Wat Sunrise Adventure & Ancient Temples",
    rating: "4.9",
    reviews: "328",
    days: "2 Days",
    price: "$89",
  },
  {
    loc: "Ha Long, Vietnam",
    title: "Luxury Ha Long Bay Cruise & Kayaking Discovery",
    rating: "4.85",
    reviews: "210",
    days: "3 Days",
    price: "$240",
  },
  {
    loc: "Kyoto, Japan",
    title: "Classic Kyoto Temples & Mount Fuji Scenic Tour",
    rating: "4.96",
    reviews: "412",
    days: "5 Days",
    price: "$680",
  },
];

const destinations = [
  { name: "Cambodia", count: "42 Unforgettable Tours" },
  { name: "Singapore", count: "68 Island Experiences" },
  { name: "Japan", count: "54 Heritage Trips" },
  { name: "Vietnam", count: "38 Cultural Circuits" },
];

const features = [
  {
    title: "Guaranteed Best Price",
    desc: "Direct local partnerships with no hidden fees.",
  },
  {
    title: "Certified Local Experts",
    desc: "Passionate local storytellers and guides.",
  },
  {
    title: "24/7 Concierge Support",
    desc: "Always available before, during, and after trips.",
  },
  {
    title: "Flexible Cancellations",
    desc: "Free cancellations up to 48 hours prior.",
  },
];

export default function Home() {
  return (
    <div className="bg-bgwarm">
      {/* Hero */}
      <section className="bg-darkplum py-24 px-6 flex flex-col items-center text-center">
        <span className="inline-block bg-white/10 border border-white/20 text-peach1 text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
          Explore 500+ Handpicked Journeys
        </span>
        <h1 className="text-white font-black text-4xl md:text-6xl mt-6 max-w-3xl leading-tight">
          Discover Places You'll Never Forget.
        </h1>
        <p className="text-slate-300 text-base md:text-lg mt-4 max-w-xl">
          Explore unforgettable destinations, discover unique experiences, and
          create memories that last a lifetime with certified local experts.
        </p>

        {/* Floating search box */}
        <div className="mt-10 bg-white rounded-3xl shadow-2xl shadow-black/20 p-4 w-full max-w-4xl flex flex-col md:flex-row gap-3 md:gap-4 items-stretch">
          <SearchField label="Destination" value="Where do you want to go?" />
          <SearchField label="Travel Date" value="Select date" />
          <SearchField label="Guests" value="2 Travelers (Standard)" />
          <button className="bg-electriccyan hover:bg-darkteal text-white font-bold rounded-2xl px-8 py-4 text-sm transition whitespace-nowrap">
            Search Tours
          </button>
        </div>
      </section>

      {/* Popular Tours */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="text-tealcyan text-[11px] font-bold uppercase tracking-widest">
              Top Rated
            </span>
            <h2 className="text-darkplum font-extrabold text-3xl mt-1">
              Popular Tours
            </h2>
            <p className="text-textSec text-sm mt-2">
              Handpicked trips rated highest by over 10,000+ happy global
              travelers.
            </p>
          </div>
          <Link
            to="/tours"
            className="text-electriccyan font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
          >
            View All 124 Tours <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.title} tour={tour} />
          ))}
        </div>
      </section>

      {/* Explore Destinations */}
      <section className="bg-bgwarmSec py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <span className="text-tealcyan text-[11px] font-bold uppercase tracking-widest">
            Destination Guide
          </span>
          <h2 className="text-darkplum font-extrabold text-3xl mt-1">
            Explore Top Destinations
          </h2>
          <p className="text-textSec text-sm mt-2 max-w-md">
            Immerse yourself in rich cultures, pristine landscapes, and vibrant
            cities across Asia.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10 w-full">
            {destinations.map((d) => (
              <div
                key={d.name}
                className="bg-darkplum rounded-3xl h-64 flex flex-col justify-end p-6 hover:-translate-y-1 transition-transform cursor-pointer"
              >
                <span className="text-white font-bold text-xl">{d.name}</span>
                <span className="text-peach1 text-xs mt-1">{d.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose TravelEase */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1">
          <span className="text-electriccyan text-[11px] font-bold uppercase tracking-widest">
            Why TravelEase
          </span>
          <h2 className="text-darkplum font-extrabold text-3xl mt-2 max-w-md">
            Crafting Seamless Travel Experiences Designed Just For You.
          </h2>
          <p className="text-textBody text-sm mt-4 max-w-md">
            We eliminate the hassle of vacation planning. Enjoy handcrafted
            travel packages, 100% verified local guides, and 24/7 dedicated
            travel support every step of the way.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-peach3 flex-shrink-0" />
                <div>
                  <h3 className="text-darkplum font-bold text-sm">{f.title}</h3>
                  <p className="text-textSec text-xs mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 w-full relative">
          <div className="bg-peach4 rounded-3xl aspect-square w-full" />
          <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-xl p-5 max-w-xs">
            <div className="flex items-center gap-1 text-ratingYellow font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-current" /> 4.9/5 Overall
            </div>
            <p className="text-textBody text-xs mt-2">
              "TravelEase made our Cambodia honeymoon absolute magic. Flawless
              booking!"
            </p>
            <p className="text-textMuted text-[11px] font-bold mt-2">
              — Sarah & David M., UK
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-darkplum rounded-[32px] py-16 px-6 flex flex-col items-center text-center">
          <span className="text-peach1 text-[11px] font-bold uppercase tracking-widest">
            Stay Inspired
          </span>
          <h2 className="text-white font-extrabold text-3xl mt-2 max-w-lg">
            Get Special Tour Discounts & Travel Guides
          </h2>
          <p className="text-slate-300 text-sm mt-3 max-w-md">
            Subscribe to our weekly newsletter for exclusive early-bird deals
            and curated itineraries.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-electriccyan"
            />
            <button className="bg-electriccyan hover:bg-darkteal text-white font-bold rounded-2xl px-6 py-3.5 text-sm transition">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SearchField({ label, value }) {
  return (
    <div className="flex-1 bg-bgcard rounded-2xl px-4 py-2.5 text-left">
      <label className="block text-[10px] font-bold uppercase text-textMuted">
        {label}
      </label>
      <span className="text-sm font-semibold text-darkplum">{value}</span>
    </div>
  );
}

function TourCard({ tour }) {
  return (
    <div className="bg-white rounded-3xl border border-borderWarm shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
      <div className="h-48 bg-peach3" />
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 text-ratingYellow font-bold">
            <Star className="w-3.5 h-3.5 fill-current" /> {tour.rating}
          </span>
          <span className="text-textMuted">
            ({tour.reviews} Reviews) • {tour.days}
          </span>
        </div>
        <h3 className="text-darkplum font-bold text-base mt-3 leading-snug">
          {tour.title}
        </h3>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-borderDefault">
          <div>
            <span className="block text-[10px] text-textMuted">From</span>
            <span className="text-darkplum font-black text-xl">
              {tour.price} / person
            </span>
          </div>
          <button className="bg-bgwarm text-darkplum font-bold text-[11px] px-4 py-2 rounded-xl hover:bg-peach3 transition">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
