import React, { useState, useEffect } from 'react';
import { destinationService } from '../../../services/destinationService';

export default function DestinationDashboard({ onAddClick, onEditClick, onViewClick }) {
    const [activeFilter, setActiveFilter] = useState('All');
    const [destinations, setDestinations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDestinations = async () => {
        try {
            setIsLoading(true);
            const data = await destinationService.getDestinations();
            setDestinations(data);
        } catch (error) {
            console.error("Failed to fetch destinations:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDestinations();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this destination?")) return;
        try {
            await destinationService.deleteDestination(id);
            // Refresh the list
            fetchDestinations();
        } catch (error) {
            console.error("Failed to delete destination:", error);
            alert("Failed to delete destination");
        }
    };

    const filteredDestinations = destinations.filter((dest) => {
        if (activeFilter === 'All') return true;
        return dest.status.toLowerCase() === activeFilter.toLowerCase();
    });

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-800">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Manage Destinations</h1>
                        <p className="text-sm text-slate-500 mt-1">View, edit, and organize tour locations.</p>
                    </div>
                    <button
                        onClick={onAddClick}
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                    >
                        + Add Destination
                    </button>
                </div>

                {/* Filters Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200/70">

                    {/* Search Bar */}
                    <div className="relative w-full md:w-96">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search destinations..."
                            className="w-full pl-9 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                        />
                    </div>

                    {/* Filter by Status */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold tracking-wider text-slate-500 mr-2">
                            FILTER BY STATUS:
                        </span>
                        {['All', 'Active', 'Inactive', 'Draft'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setActiveFilter(status)}
                                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all border ${activeFilter === status
                                    ? 'bg-blue-100/50 text-blue-700 border-blue-200/60 shadow-sm'
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Destinations Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wide text-slate-500 uppercase">Destination</th>
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wide text-slate-500 uppercase text-center">Active Tours</th>
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wide text-slate-500 uppercase text-center">Bookings</th>
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wide text-slate-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wide text-slate-500 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg className="animate-spin h-8 w-8 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span className="text-sm font-medium">Loading destinations...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredDestinations.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500 text-sm">
                                            No destinations found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredDestinations.map((dest) => (
                                        <tr key={dest.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={dest.image}
                                                        alt={dest.name}
                                                        className="w-12 h-12 rounded-xl object-cover shadow-sm"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-800">{dest.name}</p>
                                                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                                            <span>📍</span> {dest.country}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className="text-sm font-semibold text-slate-800">{dest.activeTours}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className="text-sm font-semibold text-slate-800">{dest.bookings}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${dest.status === 'Active'
                                                    ? 'bg-emerald-50 text-emerald-600'
                                                    : 'bg-slate-100 text-slate-500'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${dest.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                                                    {dest.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex items-center justify-end gap-6">
                                                    <button 
                                                        onClick={() => onEditClick(dest)}
                                                        className="text-slate-400 hover:text-indigo-600 transition-colors" 
                                                        title="Edit"
                                                    >
                                                        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                        </svg>
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(dest.id)}
                                                        className="text-slate-400 hover:text-rose-600 transition-colors" 
                                                        title="Delete"
                                                    >
                                                        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </button>
                                                    <button 
                                                        onClick={() => onViewClick(dest)}
                                                        className="text-[15px] font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                                                    >
                                                        View Details
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
