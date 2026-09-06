import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { TOURS, DESTINATIONS, FEATURES } from "../data/mockData";
import TourCard from "../components/TourCard";
import SearchForm from "../components/SearchForm";

export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="bg-bgwarm min-h-screen">
      {/* Hero */}
      <section className="bg-darkplum py-24 px-6 flex flex-col items-center text-center relative overflow-hidden">
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

        <SearchForm />
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
            className="text-electriccyan font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all group"
          >
            View All 124 Tours{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TOURS.slice(0, 3).map((tour) => (
            <TourCard key={tour.id} tour={tour} />
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
            {DESTINATIONS.map((d) => (
              <Link
                key={d.id}
                to={`/tours?destination=${encodeURIComponent(d.name)}`}
                className="group relative bg-darkplum rounded-3xl h-64 overflow-hidden flex flex-col justify-end p-6 hover:-translate-y-1 transition-all cursor-pointer shadow-md"
              >
                <img
                  src={d.image}
                  alt={d.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darkplum via-darkplum/20 to-transparent" />
                <div className="relative z-10 text-left">
                  <span className="text-white font-bold text-xl block">
                    {d.name}
                  </span>
                  <span className="text-peach1 text-xs mt-1 block font-medium">
                    {d.count}
                  </span>
                </div>
              </Link>
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
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-peach3/30 flex items-center justify-center flex-shrink-0 text-darkplum">
                    <Icon className="w-5 h-5 text-electriccyan" />
                  </div>
                  <div>
                    <h3 className="text-darkplum font-bold text-sm">
                      {f.title}
                    </h3>
                    <p className="text-textSec text-xs mt-1">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 w-full relative">
          <div className="rounded-3xl overflow-hidden aspect-square w-full shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
              alt="Travelers exploring"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-5 max-w-xs border border-white/20">
            <div className="flex items-center gap-1 text-ratingYellow font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-current" /> 4.9/5 Overall
            </div>
            <p className="text-textBody text-xs mt-2 italic">
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
        <div className="bg-darkplum rounded-[32px] py-16 px-6 flex flex-col items-center text-center relative overflow-hidden">
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

          {subscribed ? (
            <div className="mt-6 bg-white/10 border border-white/20 text-white rounded-2xl px-6 py-4 text-sm font-semibold max-w-md w-full">
              🎉 Thanks for subscribing! Check your inbox soon.
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-md"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-electriccyan transition"
              />
              <button
                type="submit"
                className="bg-electriccyan hover:bg-darkteal text-white font-bold rounded-2xl px-6 py-3.5 text-sm transition cursor-pointer"
              >
                Subscribe Now
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
