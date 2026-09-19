import { useMemo, useState } from "react";
import LeaveTable from "../components/LeaveTable";

export default function LeaveRequests({
  requests,
  users,
  leaveTypes
}) {
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const employee = users.find(
        (user) =>
          Number(user.id) ===
          Number(request.employee_id)
      );

      const leaveType = leaveTypes.find(
        (type) =>
          Number(type.id) ===
          Number(request.leave_type_id)
      );

      const searchText =
        `${employee?.name || ""} ${leaveType?.name || ""} ${leaveType?.code || ""}`
          .toLowerCase();

      const matchesSearch =
        searchText.includes(
          search.toLowerCase()
        );

      const matchesStatus =
        status === "all" ||
        request.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    requests,
    users,
    leaveTypes,
    search,
    status
  ]);

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Leave Requests</h1>
          <p>
            Review, search and manage employee
            leave requests.
          </p>
        </div>
      </div>

      <div className="request-filters">
        <div className="search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search employee or leave type..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
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

      <div className="result-count">
        Showing{" "}
        <strong>
          {filteredRequests.length}
        </strong>{" "}
        request(s)
      </div>

      <LeaveTable
        requests={filteredRequests}
        users={users}
        leaveTypes={leaveTypes}
        showEmployee={true}
      />
    </div>
  );
}