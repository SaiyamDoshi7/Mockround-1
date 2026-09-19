import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams
} from "react-router-dom";

import StatusBadge from "../components/StatusBadge";
import { formatDate } from "../utils/leaveUtils";
import { api } from "../services/api";

export default function LeaveDetails({
  user,
  requests,
  users,
  leaveTypes,
  onRequestUpdated
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] =
    useState("");

  const request = requests.find(
    (item) =>
      Number(item.id) === Number(id)
  );

  if (!request) {
    return (
      <div className="empty-state">
        Leave request not found.
      </div>
    );
  }

  const employee = users.find(
    (item) =>
      Number(item.id) ===
      Number(request.employee_id)
  );

  const leaveType = leaveTypes.find(
    (item) =>
      Number(item.id) ===
      Number(request.leave_type_id)
  );

  const approver = users.find(
    (item) =>
      Number(item.id) ===
      Number(request.approved_by)
  );

  function updateStatus(status) {
    const confirmAction =
      window.confirm(
        `Are you sure you want to ${status.toLowerCase()} this leave request?`
      );

    if (!confirmAction) return;

    const updated =
      api.updateRequestStatus(
        request.id,
        status,
        user.id
      );

    onRequestUpdated(updated);

    setMessage(
      `Leave request ${status.toLowerCase()} successfully.`
    );

    setTimeout(() => {
      navigate("/requests");
    }, 800);
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <button
            className="back-button"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <h1>Leave Request Details</h1>

          <p>
            Review complete leave request
            information.
          </p>
        </div>
      </div>

      {message && (
        <div className="success-message">
          ✓ {message}
        </div>
      )}

      <div className="details-grid">
        <div className="details-card">
          <div className="details-card-header">
            <div>
              <h2>Leave Information</h2>
              <p>
                Request #{request.id}
              </p>
            </div>

            <StatusBadge
              status={request.status}
            />
          </div>

          <div className="details-list">
            <div>
              <span>Employee</span>
              <strong>
                {employee?.name}
              </strong>
            </div>

            <div>
              <span>Leave Type</span>
              <strong>
                {leaveType?.name} (
                {leaveType?.code})
              </strong>
            </div>

            <div>
              <span>Start Date</span>
              <strong>
                {formatDate(
                  request.start_date
                )}
              </strong>
            </div>

            <div>
              <span>End Date</span>
              <strong>
                {formatDate(
                  request.end_date
                )}
              </strong>
            </div>

            <div>
              <span>Total Days</span>
              <strong>
                {request.total_days} days
              </strong>
            </div>

            <div>
              <span>Applied On</span>
              <strong>
                {formatDate(
                  request.created_at
                )}
              </strong>
            </div>

            <div className="full-detail">
              <span>Reason</span>
              <p>{request.reason}</p>
            </div>
          </div>
        </div>

        <div className="details-card">
          <div className="details-card-header">
            <div>
              <h2>Employee Profile</h2>
              <p>
                Employee information
              </p>
            </div>
          </div>

          <div className="profile-large">
            <div className="profile-avatar">
              {employee?.name?.charAt(0)}
            </div>

            <div>
              <h3>{employee?.name}</h3>
              <p>{employee?.email}</p>
            </div>
          </div>

          <div className="profile-info">
            <div>
              <span>Department</span>
              <strong>
                Employee Department
              </strong>
            </div>

            <div>
              <span>Account Status</span>
              <strong>
                {employee?.status}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {user.role === "manager" &&
        request.status === "Pending" && (
          <div className="action-card">
            <div>
              <h3>Manager Action</h3>
              <p>
                Review this request and choose
                an appropriate action.
              </p>
            </div>

            <div className="action-buttons">
              <button
                className="danger-button"
                onClick={() =>
                  updateStatus("Rejected")
                }
              >
                ✕ Reject
              </button>

              <button
                className="success-button"
                onClick={() =>
                  updateStatus("Approved")
                }
              >
                ✓ Approve
              </button>
            </div>
          </div>
        )}

      {request.approved_by && (
        <div className="info-box">
          <strong>
            Approved / Updated By
          </strong>

          <p>
            {approver?.name ||
              "Manager"}
          </p>
        </div>
      )}

      {user.role === "employee" && (
        <Link
          className="secondary-button inline-button"
          to="/history"
        >
          ← Back to Leave History
        </Link>
      )}
    </div>
  );
}