import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { guideData } from "../../../data/guideData"; 

function GuidesPage() {
    const navigate = useNavigate();

    const [guides, setGuides] = useState(() => {
        const savedGuides = localStorage.getItem("guidesList");
        return savedGuides ? JSON.parse(savedGuides) : (guideData || [
            { id: 1, name: "Elena Rostova", specialty: "Mountain Trekking", languages: "EN, ES", tours: 142, status: "Active" },
            { id: 2, name: "Marcus Thorne", specialty: "Ancient History", languages: "EN, DE", tours: 209, status: "Active" }
        ]);
    });

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [sortBy, setSortBy] = useState("most-active");

    useEffect(() => {
        localStorage.setItem("guidesList", JSON.stringify(guides));
    }, [guides]);

    const filteredGuides = guides
        .filter((guide) => {
            const matchSearch = guide.name.toLowerCase().includes(search.toLowerCase()) ||
                                guide.specialty.toLowerCase().includes(search.toLowerCase());
            const matchStatus = status === "All" || guide.status === status;
            return matchSearch && matchStatus;
        })
        .sort((a, b) => {
            if (sortBy === "most-active") return b.tours - a.tours;
            if (sortBy === "least-active") return a.tours - b.tours;
            if (sortBy === "name") return a.name.localeCompare(b.name);
            return 0;
        });

    const handleAdd = () => {
        navigate("/admin/guides/add");
    };

    // បន្ថែមមុខងារសម្រាប់ Edit
    const handleEdit = (id) => {
        navigate(`/admin/guides/edit/${id}`);
    };

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this guide?")) return;
        const updatedGuides = guides.filter((guide) => guide.id !== id);
        setGuides(updatedGuides);
    };

    return (
        <div className="dashboard-page guides-page p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center dashboard-header">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Guides</h1>
                    <p className="text-sm text-gray-500 mt-1">Oversee your tour guides, view their assignments, and manage profiles.</p>
                </div>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors shadow-sm shadow-blue-500/20"
                    onClick={handleAdd}
                >
                    <Plus size={17} />
                    Add Guide
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
                <input 
                    type="text"
                    placeholder="Search guides by name or specialty..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg w-full md:w-80 focus:outline-none focus:border-blue-500"
                />
                <div className="flex items-center gap-3">
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
                        <option value="most-active">Most Active</option>
                        <option value="least-active">Least Active</option>
                        <option value="name">Sort by Name</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-400">
                                <th className="py-4 px-4 font-medium">GUIDE NAME</th>
                                <th className="py-4 px-4 font-medium">SPECIALTY</th>
                                <th className="py-4 px-4 font-medium">LANGUAGES</th>
                                <th className="py-4 px-4 font-medium text-center">COMPLETED TOURS</th>
                                <th className="py-4 px-4 font-medium text-center">STATUS</th>
                                <th className="py-4 px-4 font-medium text-center">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredGuides.map((guide) => (
                                <tr key={guide.id} className="text-gray-600 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4 font-semibold text-gray-800">{guide.name}</td>
                                    <td className="py-4 px-4 text-gray-500">{guide.specialty}</td>
                                    <td className="py-4 px-4 text-gray-500">{guide.languages}</td>
                                    <td className="py-4 px-4 text-center font-medium">{guide.tours}</td>
                                    <td className="py-4 px-4 text-center">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${guide.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                            {guide.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            {/* ប៊ូតុង Edit */}
                                            <button 
                                                onClick={() => handleEdit(guide.id)} 
                                                className="px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-medium transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(guide.id)} 
                                                className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-medium transition-colors"
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
            </div>
        </div>
    );
}

export default GuidesPage;