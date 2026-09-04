import { useNavigate } from "react-router-dom";

function PopularTours() {
    const navigate = useNavigate();

    const tours = [
        {
            id: 1,
            image: "🏛️",
            name: "Colosseum Night Tour",
            location: "Rome, Italy",
            price: "$150",
            booked: 245,
        },
        {
            id: 2,
            image: "🏯",
            name: "Kyoto Temple Walk",
            location: "Kyoto, Japan",
            price: "$220",
            booked: 189,
        },
        {
            id: 3,
            image: "🖼️",
            name: "Louvre VIP Access",
            location: "Paris, France",
            price: "$340",
            booked: 156,
        },
    ];

    return (
        <div className="dashboard-card popular-tours-card">
            <h3>Popular Tours</h3>

            <div className="popular-tour-list">
                {tours.map((tour) => (
                    <div
                        className="popular-tour-item"
                        key={tour.id}
                    >
                        <div className="tour-image">
                            {tour.image}
                        </div>

                        <div className="tour-info">
                            <strong>{tour.name}</strong>

                            <span>
                                📍 {tour.location}
                            </span>
                        </div>

                        <div className="tour-price">
                            <strong>{tour.price}</strong>

                            <span>
                                {tour.booked} booked
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="view-all-tours"
                onClick={() =>
                    navigate("/admin/tours")
                }
            >
                View All Tours
            </button>
        </div>
    );
}

export default PopularTours;