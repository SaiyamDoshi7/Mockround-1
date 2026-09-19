export default function Departments({
  departments,
  users
}) {
  function employeeCount(departmentId) {
    return users.filter(
      (user) =>
        Number(user.department_id) ===
        Number(departmentId) &&
        user.role === "employee"
    ).length;
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Departments</h1>
          <p>
            Manage departments and employee
            counts.
          </p>
        </div>

        <button className="primary-button">
          + Add Department
        </button>
      </div>

      <div className="department-grid">
        {departments.map((department) => (
          <div
            className="department-card"
            key={department.id}
          >
            <div className="department-icon">
              ▦
            </div>

            <div>
              <h3>{department.name}</h3>

              <p>
                {employeeCount(
                  department.id
                )}{" "}
                employees
              </p>
            </div>

            <span className="status-badge approved">
              {department.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}