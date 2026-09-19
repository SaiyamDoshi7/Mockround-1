import { useMemo, useState } from "react";
import LeaveTable from "../components/LeaveTable";

export default function LeaveHistory({
  user,
  requests,
  users,
  leaveTypes
}) {
  const [typeFilter, setTypeFilter] =
    useState("all");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const myRequests = requests.filter(
    (request) =>
      Number(request.employee_id) ===
      Number(user.id)
  );

  const filteredRequests = useMemo(() => {
    return myRequests.filter((request) => {
      const typeMatch =
        typeFilter === "all" ||
        String(request.leave_type_id) ===
          String(typeFilter);

      const statusMatch =
        statusFilter === "all" ||
        request.status === statusFilter;

      return typeMatch && statusMatch;
    });
  }, [
    myRequests,
    typeFilter,
    statusFilter
  ]);

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>My Leave History</h1>
          <p>
            View and track all your leave
            requests.
          </p>
        </div>
      </div>

      <div className="filter-card">
        <div className="form-group">
          <label>Leave Type</label>

          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value)
            }
          >
            <option value="all">
              All Leave Types
            </option>

            {leaveTypes.map((type) => (
              <option
                key={type.id}
                value={type.id}
              >
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="all">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Rejected">
              Rejected
            </option>
          </select>
        </div>
      </div>

      <LeaveTable
        requests={filteredRequests}
        users={users}
        leaveTypes={leaveTypes}
      />
    </div>
  );
}