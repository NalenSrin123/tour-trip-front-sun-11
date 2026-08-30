import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchForm() {
  const navigate = useNavigate();
  const [searchState, setSearchState] = useState({
    destination: "",
    date: "",
    guests: "2",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchState.destination)
      query.set("destination", searchState.destination);
    if (searchState.date) query.set("date", searchState.date);
    if (searchState.guests) query.set("guests", searchState.guests);

    navigate(`/tours?${query.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 bg-white rounded-3xl shadow-2xl shadow-black/20 p-4 w-full max-w-4xl flex flex-col md:flex-row gap-3 md:gap-4 items-stretch text-left"
    >
      <div className="flex-1 bg-bgcard rounded-2xl px-4 py-2.5 border border-transparent focus-within:border-electriccyan transition">
        <label
          className="block text-[10px] font-bold uppercase text-textMuted"
          htmlFor="destination"
        >
          Destination
        </label>
        <input
          id="destination"
          type="text"
          placeholder="Where do you want to go?"
          value={searchState.destination}
          onChange={(e) =>
            setSearchState({ ...searchState, destination: e.target.value })
          }
          className="w-full bg-transparent text-sm font-semibold text-darkplum focus:outline-none placeholder:text-slate-400 py-0.5"
        />
      </div>

      <div className="flex-1 bg-bgcard rounded-2xl px-4 py-2.5 border border-transparent focus-within:border-electriccyan transition">
        <label
          className="block text-[10px] font-bold uppercase text-textMuted"
          htmlFor="travel-date"
        >
          Travel Date
        </label>
        <input
          id="travel-date"
          type="date"
          value={searchState.date}
          onChange={(e) =>
            setSearchState({ ...searchState, date: e.target.value })
          }
          className="w-full bg-transparent text-sm font-semibold text-darkplum focus:outline-none py-0.5 cursor-pointer"
        />
      </div>

      <div className="flex-1 bg-bgcard rounded-2xl px-4 py-2.5 border border-transparent focus-within:border-electriccyan transition">
        <label
          className="block text-[10px] font-bold uppercase text-textMuted"
          htmlFor="guests"
        >
          Guests
        </label>
        <select
          id="guests"
          value={searchState.guests}
          onChange={(e) =>
            setSearchState({ ...searchState, guests: e.target.value })
          }
          className="w-full bg-transparent text-sm font-semibold text-darkplum focus:outline-none cursor-pointer py-0.5"
        >
          <option value="1">1 Traveler</option>
          <option value="2">2 Travelers (Standard)</option>
          <option value="3-5">3-5 Travelers</option>
          <option value="6+">Group (6+)</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-electriccyan hover:bg-darkteal text-white font-bold rounded-2xl px-8 py-4 text-sm transition whitespace-nowrap cursor-pointer"
      >
        Search Tours
      </button>
    </form>
  );
}
