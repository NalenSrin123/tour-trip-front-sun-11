import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Tag, FileText, Layers, CheckCircle2 } from "lucide-react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://tour-trip-sun-11.duckdns.org";

function EditCategoryPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [oldName, setOldName] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        tours: 0,
        status: "Active"
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 1. GET /api/categories/{id} + LocalStorage Extra Info
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const token = localStorage.getItem("access_token") || localStorage.getItem("token");
                const config = {
                    headers: {
                        ...(token && { Authorization: `Bearer ${token}` })
                    }
                };

                const response = await axios.get(`${API_BASE_URL}/api/categories/${id}`, config);
                const data = response.data?.data?.[0] || response.data?.data || response.data;
                
                const categoryName = data.category_name || data.name || "";
                setOldName(categoryName);
                
                // អាន Extra Info ពី localStorage តាម Category Name Key
                const extraInfo = JSON.parse(localStorage.getItem("category_extra_info") || "{}");
                const keyName = categoryName.trim().toLowerCase();
                const catExtra = extraInfo[keyName] || {};

                setFormData({
                    name: categoryName,
                    description: catExtra.description || data.description || data.desc || "",
                    tours: catExtra.tours ?? data.tours ?? data.active_tours_count ?? 0,
                    status: catExtra.status || data.status || "Active"
                });
            } catch (err) {
                console.error("Fetch Detail Error:", err);
                setError("Failed to fetch details for this category!");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDetail();
    }, [id]);

    // 2. PUT /api/categories/{id}
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const updatedName = formData.name.trim();

            // ផ្ញើ category_name ទៅ Backend API
            const payload = {
                category_name: updatedName
            };

            const token = localStorage.getItem("access_token") || localStorage.getItem("token");
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            };

            await axios.put(`${API_BASE_URL}/api/categories/${id}`, payload, config);

            // រក្សាទុក Extra Info ចូល localStorage តាម Category Name ថ្មី
            const extraInfo = JSON.parse(localStorage.getItem("category_extra_info") || "{}");
            
            // ប្រសិនបើកែឈ្មោះ លុប Key ចាស់ចេញ
            if (oldName && oldName.trim().toLowerCase() !== updatedName.toLowerCase()) {
                delete extraInfo[oldName.trim().toLowerCase()];
            }

            extraInfo[updatedName.toLowerCase()] = {
                description: formData.description,
                tours: Number(formData.tours),
                status: formData.status
            };

            localStorage.setItem("category_extra_info", JSON.stringify(extraInfo));

            navigate("/admin/categories");
        } catch (err) {
            console.error("Update Error:", err);
            setError(err.response?.data?.message || "Failed to save changes!");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading details...</div>;

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
                        <h1 className="text-xl font-bold text-gray-900">Edit Category</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Update tour category information.</p>
                    </div>

                    {error && (
                        <div className="mx-8 mt-6 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-200">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Category Name Input */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                <Tag size={14} className="text-blue-500" />
                                <span>Category Name</span>
                            </label>
                            <input 
                                type="text"
                                name="name"
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                                className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-gray-900" 
                            />
                        </div>

                        {/* Description Input */}
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
                                className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-gray-900" 
                            />
                        </div>

                        {/* Grid Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Active Tours Input */}
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
                                    className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-gray-900" 
                                />
                            </div>

                            {/* Status Selector */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    <CheckCircle2 size={14} className="text-blue-500" />
                                    <span>Status</span>
                                </label>
                                <select 
                                    name="status" 
                                    value={formData.status} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-gray-700"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                            <button 
                                type="button" 
                                onClick={() => navigate(-1)} 
                                disabled={submitting}
                                className="px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-sm font-medium cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={submitting}
                                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium cursor-pointer"
                            >
                                {submitting ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditCategoryPage;