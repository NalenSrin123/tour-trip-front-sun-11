import React, { useState } from 'react';
import { destinationService } from '../../../services/destinationService';

export default function CreatePageDestination({ onCancel, initialData }) {
    const [formData, setFormData] = useState(initialData || {
        name: '',
        country: '',
        status: 'Draft',
        image: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.name) return alert("Name is required");
        try {
            setIsSubmitting(true);
            if (initialData && initialData.id) {
                await destinationService.updateDestination(initialData.id, formData);
            } else {
                await destinationService.createDestination(formData);
            }
            onCancel(); // Go back to dashboard on success
        } catch (error) {
            console.error("Failed to save destination", error);
            alert("Failed to save destination");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-800">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                            {initialData ? 'Edit Destination' : 'Create Destination'}
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            {initialData ? 'Update the details for this tour location.' : 'Add a new tour location to your catalog.'}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={onCancel}
                            disabled={isSubmitting}
                            className="px-5 py-2 bg-white text-slate-700 text-sm font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Destination'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Main Information */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">Basic Information</h2>

                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        Destination Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Angkor Wat, Siem Reap"
                                        className="w-full px-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="country" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        Country
                                    </label>
                                    <select
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                                    >
                                        <option value="">Select a country...</option>
                                        <option value="Cambodia">Cambodia</option>
                                        <option value="Thailand">Thailand</option>
                                        <option value="Vietnam">Vietnam</option>
                                        <option value="Laos">Laos</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="4"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Write a brief description about this destination..."
                                        className="w-full px-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-y"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Side Information */}
                    <div className="space-y-6">

                        {/* Status Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">Status</h2>
                            <div>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none font-medium"
                                >
                                    <option value="Active">🟢 Active</option>
                                    <option value="Draft">⚪ Draft</option>
                                    <option value="Inactive">🔴 Inactive</option>
                                </select>
                                <p className="text-xs text-slate-500 mt-2">
                                    Drafts will not be visible to customers.
                                </p>
                            </div>
                        </div>

                        {/* Media Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">Cover Image</h2>

                            <div className="space-y-4">
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 shadow-sm">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-700">Click to upload image</p>
                                    <p className="text-xs text-slate-500 mt-1">PNG, JPG or WEBP</p>
                                </div>

                                <div className="flex items-center">
                                    <div className="flex-grow border-t border-slate-100"></div>
                                    <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">or via URL</span>
                                    <div className="flex-grow border-t border-slate-100"></div>
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full px-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
