import React from 'react';

export default function ViewPageDestination({ destination, onBack }) {
    if (!destination) {
        return (
            <div className="min-h-screen bg-slate-50 p-6 md:p-10 flex items-center justify-center">
                <p className="text-slate-500">Destination not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-800">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header & Back Button */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Dashboard
                    </button>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${destination.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                        }`}>
                        <span className={`w-2 h-2 rounded-full ${destination.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                        {destination.status} Status
                    </span>
                </div>

                {/* Hero Section */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
                    <div className="h-64 sm:h-80 w-full relative">
                        <img
                            src={destination.image}
                            alt={destination.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                            <p className="text-sm font-bold tracking-widest uppercase text-white/80 mb-2 flex items-center gap-2">
                                <span>📍</span> {destination.country}
                            </p>
                            <h1 className="text-4xl font-bold tracking-tight">{destination.name}</h1>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Stats */}
                            <div className="col-span-1 space-y-6">
                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                    <p className="text-sm font-semibold text-slate-500 mb-1">Active Tours</p>
                                    <p className="text-3xl font-bold text-slate-900">{destination.activeTours}</p>
                                </div>
                                <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100/50">
                                    <p className="text-sm font-semibold text-indigo-600 mb-1">Total Bookings</p>
                                    <p className="text-3xl font-bold text-indigo-900">{destination.bookings}</p>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="col-span-1 md:col-span-2">
                                <h2 className="text-xl font-bold text-slate-900 mb-4">About this Destination</h2>
                                <div className="prose prose-slate max-w-none">
                                    <p className="text-slate-600 leading-relaxed">
                                        {destination.description || `Explore the beautiful landscapes and vibrant culture of ${destination.name}, located in the heart of ${destination.country}. This destination currently hosts ${destination.activeTours} active tours and has gathered significant interest with over ${destination.bookings} total bookings. Experience the unique charm and unforgettable adventures that await you in this remarkable location.`}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
