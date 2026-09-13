import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CategoryFilters from "../../../components/admin/CategoryFilters";
import { categoryData } from "../../../data/categoryData";

function Categories() {
    const navigate = useNavigate();

    // ទាញយកទិន្នន័យពី localStorage ឬប្រើ categoryData ជាដើមទុន
    const [categories, setCategories] = useState(() => {
        const savedCategories = localStorage.getItem("categoriesList");
        return savedCategories ? JSON.parse(savedCategories) : categoryData;
    });

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [sortBy, setSortBy] = useState("most-active");

    // រក្សាទុកចូល localStorage រាល់ពេលដែល categories មានការផ្លាស់ប្តូរ
    useEffect(() => {
        localStorage.setItem("categoriesList", JSON.stringify(categories));
    }, [categories]);

    /* ===============================
       FILTER
    =============================== */
    const filteredCategories = categories
        .filter((category) => {
            const matchSearch = category.name.toLowerCase().includes(search.toLowerCase());
            const matchStatus = status === "All" || category.status === status;
            return matchSearch && matchStatus;
        })
        .sort((a, b) => {
            if (sortBy === "most-active") return b.tours - a.tours;
            if (sortBy === "least-active") return a.tours - b.tours;
            if (sortBy === "name") return a.name.localeCompare(b.name);
            return 0;
        });

    /* ===============================
       ADD
    =============================== */
    const handleAdd = () => {
        navigate("/admin/categories/add");
    };

    /* ===============================
       EDIT
    =============================== */
    const handleEdit = (category) => {
        navigate(`/admin/categories/edit/${category.id}`);
    };

    /* ===============================
       DELETE
    =============================== */
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (!confirmDelete) return;

        setCategories((previous) => previous.filter((category) => category.id !== id));
    };

    return (
        <div className="p-8 bg-gray-50/50 min-h-screen">

            {/* ================= HEADER ================= */}
            <div className="flex justify-between items-center dashboard-header">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                    <p className="text-sm text-gray-500 mt-1">Organize and configure your tour offerings.</p>
                </div>

                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors shadow-sm shadow-blue-500/20"
                    onClick={handleAdd}
                >
                    <Plus size={17} />
                    Add Category
                </button>
            </div>

            {/* ================= FILTERS ================= */}
            <div className="mb-6">
                <CategoryFilters
                    search={search}
                    setSearch={setSearch}
                    status={status}
                    setStatus={setStatus}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />
            </div>

            {/* ================= CATEGORY TABLE ================= */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                                <th className="py-4 px-6">CATEGORY NAME</th>
                                <th className="py-4 px-6 w-1/2">DESCRIPTION</th>
                                <th className="py-4 px-6 text-center">ACTIVE TOURS</th>
                                <th className="py-4 px-6 text-center">STATUS</th>
                                <th className="py-4 px-6 text-center">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredCategories.map((category) => (
                                <tr key={category.id} className="text-gray-600 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-6 font-semibold text-gray-900">{category.name}</td>
                                    <td className="py-4 px-6 text-gray-500">{category.description || category.desc}</td>
                                    <td className="py-4 px-6 text-center font-medium text-gray-800">{category.tours}</td>
                                    <td className="py-4 px-6 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${category.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                                            {category.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button 
                                                onClick={() => handleEdit(category)}
                                                className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-medium transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(category.id)}
                                                className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-medium transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ================= EMPTY ================= */}
                {filteredCategories.length === 0 && (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-bold text-gray-800">No categories found</h3>
                        <p className="text-sm text-gray-500 mt-1">Try changing your search or filter.</p>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Categories;