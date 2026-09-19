import LeaveBalanceCard from "../components/LeaveBalanceCard";
import { getLeaveBalance } from "../utils/leaveUtils";

export default function LeaveBalance({
  user,
  requests,
  leaveTypes
}) {
  const balances = getLeaveBalance(
    requests,
    user.id,
    leaveTypes
  );

  const total = balances.reduce(
    (sum, leave) =>
      sum + leave.annual_limit,
    0
  );

  const used = balances.reduce(
    (sum, leave) =>
      sum + leave.used,
    0
  );

  const remaining = total - used;

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Leave Balance</h1>
          <p>
            Your current-year leave allocation
            and usage.
          </p>
        </div>
      </div>

      <div className="balance-summary">
        <div>
          <span>Total Allocation</span>
          <strong>{total}</strong>
          <small>days per year</small>
        </div>

        <div>
          <span>Used</span>
          <strong>{used}</strong>
          <small>approved days</small>
        </div>

        <div>
          <span>Remaining</span>
          <strong>{remaining}</strong>
          <small>available days</small>
        </div>
      </div>

      <div className="section-header">
        <div>
          <h2>Balance by Leave Type</h2>
          <p>
            Your current leave balance for each
            category.
          </p>
        </div>
      </div>

      <div className="balance-grid large">
        {balances.map((leave) => (
          <LeaveBalanceCard
            key={leave.id}
            leave={leave}
          />
        ))}
      </div>

      <div className="info-box">
        <strong>Leave Balance Policy</strong>

        <p>
          Pending requests do not reduce your
          leave balance. Balance is updated only
          after your manager approves a leave
          request.
        </p>
      </div>
    </div>
  );
}