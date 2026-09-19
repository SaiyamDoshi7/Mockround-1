import { useState } from "react";

export default function Employees({
  users,
  departments
}) {
  const employees = users.filter(
    (user) => user.role === "employee"
  );

  const [search, setSearch] =
    useState("");

  const filtered = employees.filter(
    (employee) =>
      employee.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      employee.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  function getDepartment(id) {
    return (
      departments.find(
        (department) =>
          Number(department.id) ===
          Number(id)
      )?.name || "-"
    );
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Employees</h1>
          <p>
            View employees and their department
            information.
          </p>
        </div>

        <button className="primary-button">
          + Add Employee
        </button>
      </div>

      <div className="search-box standalone">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div className="employee-grid">
        {filtered.map((employee) => (
          <div
            className="employee-card"
            key={employee.id}
          >
            <div className="employee-avatar">
              {employee.name.charAt(0)}
            </div>

            <div className="employee-info">
              <h3>{employee.name}</h3>

              <p>{employee.email}</p>

              <span>
                {getDepartment(
                  employee.department_id
                )}
              </span>
            </div>

            <div className="employee-status">
              <span className="active-dot"></span>
              {employee.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}