import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Compass, Landmark, Palmtree, Building2, Trees, Filter, Trash2 } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://tour-trip-sun-11.duckdns.org";

function Categories() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("most-active");

    const getCategoryIcon = (name = "") => {
        const lower = name.toLowerCase();
        if (lower.includes("adventure")) return <Compass className="w-5 h-5 text-blue-600" />;
        if (lower.includes("cultural")) return <Landmark className="w-5 h-5 text-blue-600" />;
        if (lower.includes("beach") || lower.includes("island")) return <Palmtree className="w-5 h-5 text-blue-600" />;
        if (lower.includes("city")) return <Building2 className="w-5 h-5 text-blue-600" />;
        if (lower.includes("nature") || lower.includes("wildlife")) return <Trees className="w-5 h-5 text-blue-600" />;
        return <Compass className="w-5 h-5 text-blue-600" />;
    };

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("access_token") || localStorage.getItem("token");
            const config = {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                },
                params: {
                    search: search || undefined,
                    per_page: 10
                }
            };

            const response = await axios.get(`${API_BASE_URL}/api/categories`, config);
            const result = response.data.data ? response.data.data : response.data;
            setCategories(Array.isArray(result) ? result : []);
        } catch (err) {
            console.error("Fetch Error:", err);
            setError("Failed to fetch categories!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchCategories();
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    // DELETE CATEGORY
    const handleDelete = (e, cat) => {
        e.stopPropagation();

        const categoryId = cat?.id || cat?.category_id || cat?._id;
        const categoryName = cat?.category_name || cat?.name || "";

        if (!categoryId) {
            Swal.fire({
                title: "Failed!",
                text: "Category ID not found!",
                icon: "error"
            });
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "This category data will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem("access_token") || localStorage.getItem("token");
                    const config = {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            ...(token && { Authorization: `Bearer ${token}` })
                        }
                    };

                    await axios.delete(`${API_BASE_URL}/api/categories/${categoryId}`, config);
                    setCategories((prev) => prev.filter((item) => (item.id || item.category_id || item._id) !== categoryId));

                    if (categoryName) {
                        const extraInfo = JSON.parse(localStorage.getItem("category_extra_info") || "{}");
                        delete extraInfo[categoryName.trim().toLowerCase()];
                        localStorage.setItem("category_extra_info", JSON.stringify(extraInfo));
                    }

                    Swal.fire({
                        title: "Deleted!",
                        text: "Category has been deleted successfully.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                } catch (err) {
                    console.error("Delete Error:", err);
                    const errorMessage = err.response?.data?.message || "Could not delete this category!";
                    
                    Swal.fire({
                        title: "Failed!",
                        text: errorMessage,
                        icon: "error"
                    });
                }
            }
        });
    };

    const extraInfo = JSON.parse(localStorage.getItem("category_extra_info") || "{}");

    const sortedCategories = [...categories].sort((a, b) => {
        const aName = (a.category_name || a.name || "").trim().toLowerCase();
        const bName = (b.category_name || b.name || "").trim().toLowerCase();

        const aTours = extraInfo[aName]?.tours ?? a.tours ?? a.active_tours_count ?? 0;
        const bTours = extraInfo[bName]?.tours ?? b.tours ?? b.active_tours_count ?? 0;

        if (sortBy === "most-active") return bTours - aTours;
        if (sortBy === "least-active") return aTours - bTours;
        return 0;
    });

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manage Categories</h1>
                    <p className="text-sm text-gray-500 mt-1">Organize and configure your tour offerings.</p>
                </div>
                <button
                    onClick={() => navigate("/admin/categories/add")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                    <Plus size={18} />
                    Add Category
                </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="relative flex-1 max-w-xs">
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-3 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600">
                    <Filter size={16} />
                    <span>Filter</span>
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600">
                    <span className="text-gray-400">SORT BY:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-transparent font-medium text-gray-800 focus:outline-none cursor-pointer"
                    >
                        <option value="most-active">Most Active</option>
                        <option value="least-active">Least Active</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading categories...</div>
            ) : error ? (
                <div className="text-center py-12 text-red-500">{error}</div>
            ) : sortedCategories.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No categories found.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {sortedCategories.map((cat, index) => {
                        const categoryId = cat.id || cat.category_id || cat._id || index;
                        const categoryName = cat.category_name || cat.name || "Untitled Category";
                        
                        const keyName = categoryName.trim().toLowerCase();
                        const catExtra = extraInfo[keyName] || {};

                        const toursCount = catExtra.tours ?? cat.tours ?? cat.active_tours_count ?? 0;
                        const statusVal = catExtra.status || cat.status || "Active";
                        const isActive = String(statusVal).toLowerCase() === "active";
                        const description = catExtra.description || cat.description || cat.desc || ("Tour category for " + categoryName);

                        return (
                            <div
                                key={categoryId}
                                onClick={() => navigate(`/admin/categories/edit/${categoryId}`)}
                                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between min-h-[180px] relative group"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                            {getCategoryIcon(categoryName)}
                                        </div>

                                        <button
                                            onClick={(e) => handleDelete(e, cat)}
                                            title="Delete Category"
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <h3 className="font-bold text-gray-900 text-base mb-1">
                                        {categoryName}
                                    </h3>
                                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                        {description}
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                                    <div>
                                        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                                            ACTIVE TOURS
                                        </div>
                                        <div className="text-lg font-bold text-gray-900 mt-0.5">
                                            {toursCount}
                                        </div>
                                    </div>

                                    <span
                                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                            isActive
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "bg-gray-100 text-gray-400"
                                        }`}
                                    >
                                        {isActive ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// ជួរកូដសំខាន់ដើម្បីដោះស្រាយ Error នេះ
export default Categories;