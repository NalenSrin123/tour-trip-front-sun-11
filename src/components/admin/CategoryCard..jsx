import {
    Mountain,
    Landmark,
    Umbrella,
    Building2,
    Trees,
    Pencil,
    Trash2,
} from "lucide-react";

const iconMap = {
    adventure: Mountain,
    cultural: Landmark,
    beach: Umbrella,
    city: Building2,
    nature: Trees,
};

function CategoryCard({
    category,
    onEdit,
    onDelete,
}) {
    const Icon = iconMap[category.icon] || Landmark;

    return (
        <div className="category-card">

            {/* Icon */}
            <div className="category-icon">
                <Icon size={22} />
            </div>

            {/* Content */}
            <div className="category-content">
                <h3>{category.name}</h3>

                <p>
                    {category.description}
                </p>
            </div>

            <div className="category-divider" />

            {/* Footer */}
            <div className="category-card-footer">

                <div>
                    <span className="category-label">
                        ACTIVE TOURS
                    </span>

                    <strong>
                        {category.tours}
                    </strong>
                </div>

                <span
                    className={`category-status ${
                        category.status === "Active"
                            ? "active"
                            : "inactive"
                    }`}
                >
                    {category.status}
                </span>

            </div>

            {/* Actions */}
            <div className="category-actions">

                <button
                    className="category-edit-btn"
                    onClick={() => onEdit(category)}
                >
                    <Pencil size={14} />
                    Edit
                </button>

                <button
                    className="category-delete-btn"
                    onClick={() => onDelete(category.id)}
                >
                    <Trash2 size={14} />
                    Delete
                </button>

            </div>

        </div>
    );
}

export default CategoryCard;