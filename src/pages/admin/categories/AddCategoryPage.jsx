import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Tag, FileText, Layers, CheckCircle2 } from "lucide-react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://tour-trip-sun-11.duckdns.org";

function AddCategoryPage() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        tours: 0,
        status: "Active"
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            setError("Category Name is required!");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // 1. ផ្ញើតែ category_name ទៅ Backend តាម API Document
            const payload = {
                category_name: formData.name.trim()
            };

            const token = localStorage.getItem("access_token") || localStorage.getItem("token");
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            };

            await axios.post(`${API_BASE_URL}/api/categories`, payload, config);

            // 2. រក្សាទុកព័ត៌មានបន្ថែមក្នុង localStorage
            const localData = JSON.parse(localStorage.getItem("category_extra_info") || "{}");
            const keyName = formData.name.trim().toLowerCase();
            
            localData[keyName] = {
                description: formData.description.trim(),
                tours: Number(formData.tours),
                status: formData.status
            };
            
            localStorage.setItem("category_extra_info", JSON.stringify(localData));

            navigate("/admin/categories");
        } catch (err) {
            console.error("Create Category Error:", err);
            if (err.response) {
                const backendMsg = err.response.data?.message || JSON.stringify(err.response.data);
                setError(`Backend Error (${err.response.status}): ${backendMsg}`);
            } else if (err.request) {
                setError("Unable to connect to the API server!");
            } else {
                setError("An error occurred while sending the request!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-gray-50/50 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <button 
                    type="button"
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm cursor-pointer"
                >
                    <ArrowLeft size={16} />
                    <span>Back to Categories</span>
                </button>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-100">
                        <h1 className="text-xl font-bold text-gray-900">Add New Category</h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Create a new tour category and configure its details.
                        </p>
                    </div>

                    {error && (
                        <div className="mx-8 mt-6 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-200 break-words">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Category Name */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                <Tag size={14} className="text-blue-500" />
                                <span>Category Name <span className="text-red-500">*</span></span>
                            </label>
                            <input 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                                placeholder="e.g. Cultural & Heritage"
                                className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-gray-900" 
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                <FileText size={14} className="text-blue-500" />
                                <span>Description</span>
                            </label>
                            <textarea 
                                name="description" 
                                rows="3"
                                value={formData.description} 
                                onChange={handleChange} 
                                placeholder="Enter short description..."
                                className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-gray-900" 
                            />
                        </div>

                        {/* Active Tours & Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    <Layers size={14} className="text-blue-500" />
                                    <span>Active Tours</span>
                                </label>
                                <input 
                                    type="number"
                                    min="0"
                                    name="tours" 
                                    value={formData.tours} 
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-gray-900" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    <CheckCircle2 size={14} className="text-blue-500" />
                                    <span>Status</span>
                                </label>
                                <select 
                                    name="status" 
                                    value={formData.status} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-gray-700"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                            <button 
                                type="button" 
                                onClick={() => navigate(-1)} 
                                disabled={loading}
                                className="px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-sm font-medium transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm shadow-blue-500/20 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                            >
                                {loading ? "Saving..." : "Save Category"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddCategoryPage;