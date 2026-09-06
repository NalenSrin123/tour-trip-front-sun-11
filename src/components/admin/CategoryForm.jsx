import { useEffect, useState } from "react";
import { X } from "lucide-react";

function CategoryForm({
    category,
    onClose,
    onSave,
}) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        tours: 0,
        status: "Active",
        icon: "adventure",
    });

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name || "",
                description:
                    category.description || "",
                tours: category.tours || 0,
                status:
                    category.status || "Active",
                icon:
                    category.icon || "adventure",
            });
        }
    }, [category]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        onSave({
            ...category,
            ...formData,
            tours: Number(formData.tours),
        });
    };


    return (
        <div className="category-modal-overlay">

            <div className="category-modal">

                {/* Header */}

                <div className="category-modal-header">

                    <div>
                        <h2>
                            {category
                                ? "Edit Category"
                                : "Add Category"}
                        </h2>

                        <p>
                            Configure your tour category.
                        </p>
                    </div>

                    <button
                        className="modal-close-btn"
                        onClick={onClose}
                    >
                        <X size={20} />
                    </button>

                </div>


                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="category-form"
                >

                    <div className="form-group">

                        <label>
                            Category Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter category name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            placeholder="Enter description"
                            value={
                                formData.description
                            }
                            onChange={handleChange}
                            rows="4"
                            required
                        />

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Active Tours
                            </label>

                            <input
                                type="number"
                                name="tours"
                                min="0"
                                value={formData.tours}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Active">
                                    Active
                                </option>

                                <option value="Inactive">
                                    Inactive
                                </option>

                            </select>

                        </div>

                    </div>


                    <div className="form-group">

                        <label>
                            Icon Type
                        </label>

                        <select
                            name="icon"
                            value={formData.icon}
                            onChange={handleChange}
                        >
                            <option value="adventure">
                                Adventure
                            </option>

                            <option value="cultural">
                                Cultural
                            </option>

                            <option value="beach">
                                Beach
                            </option>

                            <option value="city">
                                City
                            </option>

                            <option value="nature">
                                Nature
                            </option>

                        </select>

                    </div>


                    {/* Actions */}

                    <div className="category-form-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-button"
                        >
                            {category
                                ? "Save Changes"
                                : "Create Category"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default CategoryForm;