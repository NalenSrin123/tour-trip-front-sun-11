import { useState } from "react";

import { Plus } from "lucide-react";

import CategoryFilters from "../../../components/admin/CategoryFilters";
import CategoryForm from "../../../components/admin/CategoryForm";

import { categoryData } from "../../../data/categoryData";

function Categories() {
    const [categories, setCategories] =
        useState(categoryData);

    const [search, setSearch] =
        useState("");

    const [status, setStatus] =
        useState("All");

    const [sortBy, setSortBy] =
        useState("most-active");

    const [showForm, setShowForm] =
        useState(false);

    const [selectedCategory, setSelectedCategory] =
        useState(null);


    /* ===============================
       FILTER
    =============================== */

    const filteredCategories =
        categories
            .filter((category) => {

                const matchSearch =
                    category.name
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        );

                const matchStatus =
                    status === "All" ||
                    category.status === status;

                return (
                    matchSearch &&
                    matchStatus
                );
            })
            .sort((a, b) => {

                if (
                    sortBy ===
                    "most-active"
                ) {
                    return (
                        b.tours -
                        a.tours
                    );
                }

                if (
                    sortBy ===
                    "least-active"
                ) {
                    return (
                        a.tours -
                        b.tours
                    );
                }

                if (
                    sortBy === "name"
                ) {
                    return a.name.localeCompare(
                        b.name
                    );
                }

                return 0;
            });


    /* ===============================
       ADD
    =============================== */

    const handleAdd = () => {
        setSelectedCategory(null);
        setShowForm(true);
    };


    /* ===============================
       EDIT
    =============================== */

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setShowForm(true);
    };


    /* ===============================
       DELETE
    =============================== */

    const handleDelete = (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this category?"
            );

        if (!confirmDelete) {
            return;
        }

        setCategories((previous) =>
            previous.filter(
                (category) =>
                    category.id !== id
            )
        );
    };


    /* ===============================
       SAVE
    =============================== */

    const handleSave = (category) => {

        if (category.id) {

            setCategories((previous) =>
                previous.map((item) =>
                    item.id === category.id
                        ? category
                        : item
                )
            );

        } else {

            const newCategory = {
                ...category,
                id: Date.now(),
            };

            setCategories((previous) => [
                ...previous,
                newCategory,
            ]);
        }

        setShowForm(false);
        setSelectedCategory(null);
    };


    return (
        <div className="dashboard-page categories-page ">

            {/* ================= HEADER ================= */}

            <div className="flex justify-between items-center">

                <div className="dashboard-header">
                    <h1>
                        Categories
                    </h1>

                    <p>
                        Organize and configure your
                        tour offerings.
                    </p>
                </div>


                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                    onClick={handleAdd}
                >
                    <Plus size={17} />

                    Add Category
                </button>

            </div>


            {/* ================= FILTERS ================= */}

            <CategoryFilters
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />


            {/* ================= CATEGORY TABLE ================= */}

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-400">
                                <th className="py-4 px-4 font-medium">CATEGORY NAME</th>
                                <th className="py-4 px-4 font-medium w-1/2">DESCRIPTION</th>
                                <th className="py-4 px-4 font-medium text-center">ACTIVE TOURS</th>
                                <th className="py-4 px-4 font-medium text-center">STATUS</th>
                                <th className="py-4 px-4 font-medium text-center">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredCategories.map((category) => (
                                <tr key={category.id} className="text-gray-600 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4 font-semibold text-gray-800">{category.name}</td>
                                    <td className="py-4 px-4 text-gray-500">{category.description || category.desc}</td>
                                    <td className="py-4 px-4 text-center font-medium">{category.tours}</td>
                                    <td className="py-4 px-4 text-center">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${category.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                            {category.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button 
                                                onClick={() => handleEdit(category)}
                                                className="px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-medium transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(category.id)}
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

                {/* ================= EMPTY ================= */}
                {filteredCategories.length === 0 && (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-bold text-gray-800">No categories found</h3>
                        <p className="text-sm text-gray-500 mt-1">Try changing your search or filter.</p>
                    </div>
                )}
            </div>


            {/* ================= MODAL ================= */}

            {showForm && (

                <CategoryForm
                    category={
                        selectedCategory
                    }
                    onClose={() => {
                        setShowForm(false);
                        setSelectedCategory(null);
                    }}
                    onSave={handleSave}
                />

            )}

        </div>
    );
}

export default Categories;