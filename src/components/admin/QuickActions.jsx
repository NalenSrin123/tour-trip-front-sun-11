import { useNavigate } from "react-router-dom";

function QuickActions() {
    const navigate = useNavigate();

    return (
        <div className="dashboard-card quick-actions-card">
            <h3>Quick Actions</h3>

            <div className="quick-actions-grid">
                <button
                    className="primary-action"
                    onClick={() =>
                        navigate("/admin/tours/create")
                    }
                >
                    + Add Tour
                </button>

                <button
                    className="secondary-action"
                    onClick={() =>
                        navigate("/admin/destinations")
                    }
                >
                    ◉ Destination
                </button>

                <button
                    className="schedule-action"
                    onClick={() =>
                        navigate("/admin/schedules/create")
                    }
                >
                    ▣ Create Schedule
                </button>
            </div>
        </div>
    );
}

export default QuickActions;