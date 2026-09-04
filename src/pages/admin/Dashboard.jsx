import StatCard from "../../components/admin/StatCard";
import RevenueChart from "../../components/admin/RevenueChart";
import BookingStatus from "../../components/admin/BookingStatus";
import QuickActions from "../../components/admin/QuickActions";
import RecentBooking from "../../components/admin/RecentBooking";
import PopularTours from "../../components/admin/PopularTours";

import {
    Map,
    CalendarDays,
    Users,
    DollarSign,
} from "lucide-react";

import "../../components/admin/Admin.css";

function Dashboard() {
    return (
        <div className="dashboard-page">

            {/* ================= HEADER ================= */}

            <div className="dashboard-header">
                <h1>Dashboard</h1>

                <p>
                    Welcome back, Admin. Here's what's happening with your business.
                </p>
            </div>


            {/* ================= STATISTICS ================= */}

            <div className="dashboard-stats">

                <StatCard
                    title="Total Tours"
                    value="128"
                    change="+12.5%"
                    icon={<Map size={20} />}
                />

                <StatCard
                    title="Total Bookings"
                    value="1,248"
                    change="+18.2%"
                    icon={<CalendarDays size={20} />}
                />

                <StatCard
                    title="Total Customers"
                    value="856"
                    change="+9.4%"
                    icon={<Users size={20} />}
                />

                <StatCard
                    title="Total Revenue"
                    value="$48,650"
                    change="+15.6%"
                    icon={<DollarSign size={20} />}
                />

            </div>


            {/* ================= MAIN DASHBOARD ================= */}

            <div className="dashboard-main">


                {/* LEFT SIDE */}

                <div className="dashboard-left">

                    <RevenueChart />

                    <RecentBooking />

                </div>


                {/* RIGHT SIDE */}

                <div className="dashboard-right">

                    <BookingStatus />

                    <QuickActions />

                    <PopularTours />

                </div>

            </div>

        </div>
    );
}

export default Dashboard;