import { Link } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";

export default function ManagerDashboard({
  requests,
  users,
  leaveTypes
}) {
  const pending = requests.filter(
    (request) =>
      request.status === "Pending"
  );

  const approved = requests.filter(
    (request) =>
      request.status === "Approved"
  );

  const rejected = requests.filter(
    (request) =>
      request.status === "Rejected"
  );

  function employeeName(id) {
    return (
      users.find(
        (user) => Number(user.id) === Number(id)
      )?.name || "Unknown"
    );
  }

  function leaveName(id) {
    return (
      leaveTypes.find(
        (type) =>
          Number(type.id) === Number(id)
      )?.name || "Unknown"
    );
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Manager Dashboard</h1>
          <p>
            Review and manage employee leave
            requests.
          </p>
        </div>

        <Link
          to="/requests"
          className="primary-button"
        >
          View Requests
        </Link>
      </div>

      <div className="stat-grid">
        <div className="stat-card blue">
          <div>
            <span>Total Requests</span>
            <strong>{requests.length}</strong>
          </div>
          <div className="stat-icon">▦</div>
        </div>

        <div className="stat-card orange">
          <div>
            <span>Pending</span>
            <strong>{pending.length}</strong>
          </div>
          <div className="stat-icon">◷</div>
        </div>

        <div className="stat-card green">
          <div>
            <span>Approved</span>
            <strong>{approved.length}</strong>
          </div>
          <div className="stat-icon">✓</div>
        </div>

        <div className="stat-card red">
          <div>
            <span>Rejected</span>
            <strong>{rejected.length}</strong>
          </div>
          <div className="stat-icon">×</div>
        </div>
      </div>

      <div className="section-header">
        <div>
          <h2>Pending Requests</h2>
          <p>Requests waiting for your action</p>
        </div>

        <Link to="/requests">
          View All →
        </Link>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Leave Type</th>
              <th>Date</th>
              <th>Days</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {pending.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="empty-table"
                >
                  No pending requests.
                </td>
              </tr>
            ) : (
              pending.map((request) => (
                <tr key={request.id}>
                  <td>
                    <strong>
                      {employeeName(
                        request.employee_id
                      )}
                    </strong>
                  </td>

                  <td>
                    {leaveName(
                      request.leave_type_id
                    )}
                  </td>

                  <td>
                    {request.start_date} -{" "}
                    {request.end_date}
                  </td>

                  <td>
                    {request.total_days}
                  </td>

                  <td>
                    <StatusBadge
                      status={request.status}
                    />
                  </td>

                  <td>
                    <Link
                      className="table-action"
                      to={`/leave/${request.id}`}
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
