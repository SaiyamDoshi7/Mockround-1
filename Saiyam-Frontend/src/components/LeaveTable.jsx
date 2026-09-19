import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { formatDate } from "../utils/leaveUtils";

export default function LeaveTable({
  requests,
  users,
  leaveTypes,
  showEmployee = false
}) {
  function getEmployee(id) {
    return users.find(
      (user) => Number(user.id) === Number(id)
    );
  }

  function getLeaveType(id) {
    return leaveTypes.find(
      (type) => Number(type.id) === Number(id)
    );
  }

  if (requests.length === 0) {
    return (
      <div className="empty-state">
        No leave requests found.
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {showEmployee && <th>Employee</th>}
            <th>Leave Type</th>
            <th>Date Range</th>
            <th>Days</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => {
            const employee = getEmployee(
              request.employee_id
            );

            const type = getLeaveType(
              request.leave_type_id
            );

            return (
              <tr key={request.id}>
                {showEmployee && (
                  <td>
                    <strong>
                      {employee?.name}
                    </strong>
                    <small>
                      {employee?.email}
                    </small>
                  </td>
                )}

                <td>
                  <span className="leave-type">
                    {type?.code}
                  </span>{" "}
                  {type?.name}
                </td>

                <td>
                  {formatDate(request.start_date)}
                  {" - "}
                  {formatDate(request.end_date)}
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
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}