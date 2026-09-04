import { useNavigate } from "react-router-dom";

function RecentBooking() {
    const navigate = useNavigate();

    const bookings = [
        {
            id: "BK-8901",
            customer: "Sarah Jenkins",
            tour: "Colosseum Night Tour",
            date: "Oct 12, 2023",
            amount: "$150.00",
            status: "Confirmed",
        },
        {
            id: "BK-8902",
            customer: "Michael Chen",
            tour: "Kyoto Temple Walk",
            date: "Oct 14, 2023",
            amount: "$220.00",
            status: "Pending",
        },
        {
            id: "BK-8903",
            customer: "Emma Thompson",
            tour: "Louvre VIP Access",
            date: "Oct 15, 2023",
            amount: "$340.00",
            status: "Confirmed",
        },
        {
            id: "BK-8904",
            customer: "David Rodriguez",
            tour: "Grand Canyon Trek",
            date: "Oct 18, 2023",
            amount: "$850.00",
            status: "Cancelled",
        },
        {
            id: "BK-8905",
            customer: "Alice Wong",
            tour: "Machu Picchu Trek",
            date: "Oct 20, 2023",
            amount: "$1,200.00",
            status: "Confirmed",
        },
    ];

    return (
        <div className="dashboard-card recent-bookings-card">
            <div className="card-header">
                <h3>Recent Bookings</h3>

                <button
                    className="view-all"
                    onClick={() =>
                        navigate("/admin/bookings")
                    }
                >
                    View All →
                </button>
            </div>

            <div className="table-wrapper">
                <table className="booking-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Tour</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>

                                <td>
                                    {booking.customer}
                                </td>

                                <td>
                                    {booking.tour}
                                </td>

                                <td>
                                    {booking.date}
                                </td>

                                <td>
                                    {booking.amount}
                                </td>

                                <td>
                                    <span
                                        className={`booking-status ${booking.status.toLowerCase()}`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RecentBooking;