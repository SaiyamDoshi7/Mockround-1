import { useState } from "react";
import {
  NavLink,
  useNavigate
} from "react-router-dom";

export default function Layout({
  user,
  children
}) {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] =
    useState(false);

  function logout() {
    localStorage.removeItem("leavepro_user");
    navigate("/login");
  }

  const employeeLinks = [
    {
      name: "Dashboard",
      path: "/employee"
    },
    {
      name: "Apply Leave",
      path: "/apply-leave"
    },
    {
      name: "Leave History",
      path: "/history"
    },
    {
      name: "Leave Balance",
      path: "/balance"
    }
  ];

  const managerLinks = [
    {
      name: "Dashboard",
      path: "/manager"
    },
    {
      name: "Leave Requests",
      path: "/requests"
    },
    {
      name: "Employees",
      path: "/employees"
    },
    {
      name: "Departments",
      path: "/departments"
    }
  ];

  const links =
    user.role === "manager"
      ? managerLinks
      : employeeLinks;

  return (
    <div className="app-layout">
      <aside
        className={`sidebar ${
          mobileMenu ? "open" : ""
        }`}
      >
        <div className="brand">
          <div className="brand-icon">L</div>
          <span>LeavePro</span>
        </div>

        <div className="sidebar-user">
          <div className="avatar">
            {user.name.charAt(0)}
          </div>

          <div>
            <strong>{user.name}</strong>
            <small>
              {user.role === "manager"
                ? "Manager"
                : "Employee"}
            </small>
          </div>
        </div>

        <nav className="navigation">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() =>
                setMobileMenu(false)
              }
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              <span className="nav-icon">
                {link.name === "Dashboard"
                  ? "⌂"
                  : link.name === "Apply Leave"
                  ? "+"
                  : link.name === "Leave History"
                  ? "▤"
                  : link.name === "Leave Balance"
                  ? "◉"
                  : link.name === "Leave Requests"
                  ? "☷"
                  : link.name === "Employees"
                  ? "♙"
                  : "▦"}
              </span>

              {link.name}
            </NavLink>
          ))}
        </nav>

        <button
          className="logout-button"
          onClick={logout}
        >
          ⇥ Logout
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
          >
            ☰
          </button>

          <div>
            <h2>Welcome, {user.name.split(" ")[0]}!</h2>
            <p>
              {user.role === "manager"
                ? "Manage employee leave requests"
                : "Manage your leaves and requests"}
            </p>
          </div>

          <div className="topbar-avatar">
            {user.name.charAt(0)}
          </div>
        </header>

        <section className="page-content">
          {children}
        </section>
      </main>
    </div>
  );
}