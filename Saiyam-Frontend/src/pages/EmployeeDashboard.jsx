import { Link } from "react-router-dom";
import LeaveTable from "../components/LeaveTable";
import LeaveBalanceCard from "../components/LeaveBalanceCard";
import { getLeaveBalance } from "../utils/leaveUtils";

export default function EmployeeDashboard({
  user,
  requests,
  users,
  leaveTypes
}) {
  const myRequests = requests.filter(
    (request) =>
      Number(request.employee_id) ===
      Number(user.id)
  );

  const balances = getLeaveBalance(
    requests,
    user.id,
    leaveTypes
  );

  const usedLeaves = myRequests
    .filter(
      (request) =>
        request.status === "Approved"
    )
    .reduce(
      (total, request) =>
        total + Number(request.total_days),
      0
    );

  const pendingLeaves = myRequests.filter(
    (request) =>
      request.status === "Pending"
  ).length;

  const totalLeaves = leaveTypes.reduce(
    (total, type) =>
      total + type.annual_limit,
    0
  );

  const remainingLeaves =
    totalLeaves - usedLeaves;

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Employee Dashboard</h1>
          <p>
            Here's an overview of your leave
            information.
          </p>
        </div>

        <Link
          to="/apply-leave"
          className="primary-button"
        >
          + Apply Leave
        </Link>
      </div>

      <div className="stat-grid">
        <div className="stat-card blue">
          <div>
            <span>Total Leaves</span>
            <strong>{totalLeaves}</strong>
          </div>
          <div className="stat-icon">▦</div>
        </div>

        <div className="stat-card orange">
          <div>
            <span>Used Leaves</span>
            <strong>{usedLeaves}</strong>
          </div>
          <div className="stat-icon">◷</div>
        </div>

        <div className="stat-card green">
          <div>
            <span>Remaining</span>
            <strong>{remainingLeaves}</strong>
          </div>
          <div className="stat-icon">✓</div>
        </div>

        <div className="stat-card purple">
          <div>
            <span>Pending Requests</span>
            <strong>{pendingLeaves}</strong>
          </div>
          <div className="stat-icon">◉</div>
        </div>
      </div>

      <div className="section-header">
        <div>
          <h2>Leave Balance</h2>
          <p>Current year leave allocation</p>
        </div>

        <Link to="/balance">
          View Details →
        </Link>
      </div>

      <div className="balance-grid">
        {balances.map((leave) => (
          <LeaveBalanceCard
            key={leave.id}
            leave={leave}
          />
        ))}
      </div>

      <div className="section-header">
        <div>
          <h2>Recent Leave Requests</h2>
          <p>Your latest leave applications</p>
        </div>

        <Link to="/history">
          View All →
        </Link>
      </div>

      <LeaveTable
        requests={myRequests.slice(0, 5)}
        users={users}
        leaveTypes={leaveTypes}
      />
    </div>
  );
}