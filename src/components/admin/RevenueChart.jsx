import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function RevenueChart() {
    const data = [
        { month: "Jan", revenue: 12000 },
        { month: "Feb", revenue: 18000 },
        { month: "Mar", revenue: 14000 },
        { month: "Apr", revenue: 22000 },
        { month: "May", revenue: 16000 },
        { month: "Jun", revenue: 28000 },
        { month: "Jul", revenue: 24000 },
        { month: "Aug", revenue: 36000 },
    ];

    return (
        <div className="dashboard-card revenue-card">
            <div className="card-header">
                <h3>Revenue Overview</h3>

                <select className="chart-select">
                    <option>This Year (Jan-Aug)</option>
                    <option>This Month</option>
                    <option>This Week</option>
                </select>
            </div>

            <div className="revenue-chart-container">
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: -10,
                            bottom: 0,
                        }}
                    >
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#64748b",
                                fontSize: 12,
                            }}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#64748b",
                                fontSize: 11,
                            }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />

                        <Tooltip
                            formatter={(value) =>
                                `$${Number(value).toLocaleString()}`
                            }
                        />

                        <Bar
                            dataKey="revenue"
                            fill="#2563eb"
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default RevenueChart;