import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { calculateDays } from "../utils/leaveUtils";

export default function ApplyLeave({
  user,
  leaveTypes,
  onRequestCreated
}) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    leave_type_id: "",
    start_date: "",
    end_date: "",
    reason: "",
    half_day: false
  });

  const [error, setError] = useState("");

  const [success, setSuccess] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  function handleChange(event) {
    const { name, value, type, checked } =
      event.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : value
    });

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (
      !form.leave_type_id ||
      !form.start_date ||
      !form.end_date ||
      !form.reason.trim()
    ) {
      setError(
        "Please fill all required fields."
      );
      return;
    }

    if (
      new Date(form.end_date) <
      new Date(form.start_date)
    ) {
      setError(
        "End date cannot be earlier than start date."
      );
      return;
    }

    const totalDays = calculateDays(
      form.start_date,
      form.end_date,
      form.half_day
    );

    setSubmitting(true);

    const request = api.createRequest({
      employee_id: user.id,
      leave_type_id: Number(
        form.leave_type_id
      ),
      start_date: form.start_date,
      end_date: form.end_date,
      total_days: totalDays,
      reason: form.reason
    });

    onRequestCreated(request);

    setSuccess(true);
    setSubmitting(false);

    setTimeout(() => {
      navigate("/history");
    }, 1000);
  }

  function resetForm() {
    setForm({
      leave_type_id: "",
      start_date: "",
      end_date: "",
      reason: "",
      half_day: false
    });

    setError("");
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Apply for Leave</h1>
          <p>
            Submit a new leave request for
            manager approval.
          </p>
        </div>
      </div>

      {success && (
        <div className="success-message">
          ✓ Leave request submitted successfully.
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>
                Leave Type <span>*</span>
              </label>

              <select
                name="leave_type_id"
                value={form.leave_type_id}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Leave Type
                </option>

                {leaveTypes.map((type) => (
                  <option
                    key={type.id}
                    value={type.id}
                  >
                    {type.name} ({type.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>
                Start Date <span>*</span>
              </label>

              <input
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                End Date <span>*</span>
              </label>

              <input
                type="date"
                name="end_date"
                value={form.end_date}
                min={form.start_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Total Days</label>

              <input
                type="text"
                readOnly
                value={
                  calculateDays(
                    form.start_date,
                    form.end_date,
                    form.half_day
                  ) || ""
                }
                placeholder="Automatically calculated"
              />
            </div>

            <div className="form-group full-width">
              <label>
                Reason <span>*</span>
              </label>

              <textarea
                name="reason"
                value={form.reason}
                onChange={handleChange}
                rows="5"
                placeholder="Enter reason for leave..."
                required
              ></textarea>
            </div>

            <div className="form-group checkbox-group full-width">
              <label>
                <input
                  type="checkbox"
                  name="half_day"
                  checked={form.half_day}
                  onChange={handleChange}
                />

                <span>
                  Apply as half day
                </span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={resetForm}
            >
              Reset
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={submitting}
            >
              {submitting
                ? "Submitting..."
                : "Apply Leave"}
            </button>
          </div>
        </form>
      </div>

      <div className="info-box">
        <strong>Leave Policy</strong>

        <p>
          Your leave request will remain
          <strong> Pending </strong>
          until it is reviewed by a manager.
          Your leave balance is only reduced
          after approval.
        </p>
      </div>
    </div>
  );
}