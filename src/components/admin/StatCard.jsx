function StatCard({title, value,  change, icon}) {
  return (
      <div className="stat-card">
          <div className="stat-card-header">
              <p className="stat-title">
                {title}
              </p>

              <div className="stat-icon">
                  {icon}
              </div>
          </div>

          <div className="stat-card-bottom">
              <h2>
                  {value}
              </h2>

              <span className="stat-change">
                  {change}
              </span>
          </div>
      </div>
  );
}

export default StatCard;