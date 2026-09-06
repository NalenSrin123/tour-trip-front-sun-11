import { PieChart, Pie, Cell, ResponsiveContainer} from "recharts";

function BookingStatus() {
    const data = [
        {
            name: "Confirmed",
            value: 800,
            color: "#2563eb",
        },
        {
            name: "Pending",
            value: 250,
            color: "#7c3aed",
        },
        {
            name: "Cancelled",
            value: 150,
            color: "#cbd5e1",
        },
    ];

    const totalBookings = data.reduce(
        (total, item) => total + item.value,
        0
    );

    return (
        <div className="dashboard-card booking-status-card">
                <h3>Booking Status</h3>

                <div className="booking-chart-wrapper">
                    <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={62}
                                paddingAngle={3}
                                stroke="none"
                            >
                                {data.map((item) => (
                                    <Cell
                                        key={item.name}
                                        fill={item.color}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="booking-total">
                        <span>Total</span>

                        <strong>
                            {totalBookings >= 1000
                                ? `${(
                                        totalBookings / 1000
                                ).toFixed(1)}k`
                                : totalBookings
                            }
                        </strong>
                    </div>
                </div>

                <div className="booking-legend">
                    {data.map((item) => (
                        <div className="legend-item" key={item.name}>
                            <span
                                className="legend-item"
                                style={{
                                    backgroundColor: item.color,
                                }}
                            />

                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
        </div>
    );
}

export default BookingStatus;