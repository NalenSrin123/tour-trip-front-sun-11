import React, { useState } from 'react';
import { Plus, Search, MapPin, ChevronRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

// // កែសម្រួល Path ត្រង់នេះ
import "../../../assets/styles/Admin.css";

const initialDestinations = [
  {
    id: 1,
    name: 'Siem Reap',
    country: 'Cambodia',
    activeTours: 24,
    bookings: '1,420',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'Phnom Penh',
    country: 'Cambodia',
    activeTours: 18,
    bookings: '850',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'Battambang',
    country: 'Cambodia',
    activeTours: 5,
    bookings: '120',
    status: 'Inactive',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
  },
];

const Pagedestination = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Filter Logic
  const filteredDestinations = initialDestinations.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className=''>
          <h2 style={{ fontSize: '30px', fontWeight: 'bold' }}>Manage Destinations</h2>
          <p className="text-slate-500 text-sm">View, edit, and organize tour locations.</p>
        </div>
        
        {/* ប៊ូតុង Add Destination ដែលបានកែសម្រួល */}
        <Link 
          to="/admin/destinations/create" 
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition shadow-sm hover:shadow group"
        >
          <Plus size={16} className="transition-transform group-hover:rotate-90 duration-200" />
          <span>Add Destination</span>
        </Link>
      </div>

      {/* Filter & Search Bar Section */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
        {/* Search Input */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mr-1 flex items-center gap-1">
            Filter by Status:
          </span>
          {['All', 'Active', 'Inactive', 'Draft'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDestinations.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="h-44 relative overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-4">
                <h3 className="font-bold text-slate-900 text-lg">{item.name}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin size={12} /> {item.country}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 my-4 p-2.5 bg-slate-50 rounded-lg text-center border border-slate-100">
                  <div>
                    <span className="block text-lg font-bold text-slate-800">{item.activeTours}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Active Tours</span>
                  </div>
                  <div>
                    <span className="block text-lg font-bold text-slate-800">{item.bookings}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Bookings</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-4 py-3 flex justify-between items-center text-xs border-t border-slate-100 bg-slate-50/50">
              <span
                className={`flex items-center gap-1.5 font-medium ${
                  item.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                />
                {item.status}
              </span>
              <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5 hover:underline">
                View Details <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}

        {/* Add New Card Button */}
        <Link 
          to="/admin/destinations/create"
          className="border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/40 hover:bg-blue-50 flex flex-col items-center justify-center p-6 text-center transition cursor-pointer min-h-[320px] group"
        >
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Plus size={24} />
          </div>
          <h4 className="font-semibold text-slate-800 text-sm">
            New Destination
          </h4>
          <p className="text-xs text-slate-500 mt-1 max-w-[160px]">
            Expand your catalog by adding a new location.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Pagedestination;