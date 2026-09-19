export default function LeaveBalanceCard({
  leave
}) {
  const percentage =
    leave.annual_limit > 0
      ? Math.min(
          (leave.used / leave.annual_limit) * 100,
          100
        )
      : 0;

  return (
    <div className="balance-card">
      <div className="balance-card-top">
        <div>
          <div className="leave-code">
            {leave.code}
          </div>

          <h3>{leave.name}</h3>
        </div>

        <div className="balance-number">
          {leave.remaining}
        </div>
      </div>

      <p>
        {leave.used} used of {leave.annual_limit} days
      </p>

      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}