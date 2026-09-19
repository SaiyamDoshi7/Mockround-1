import {
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import { useState } from "react";

import Layout from "./components/Layout";

import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import ApplyLeave from "./pages/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory";
import LeaveBalance from "./pages/LeaveBalance";
import LeaveDetails from "./pages/LeaveDetails";
import LeaveRequests from "./pages/LeaveRequests";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";

import { api } from "./services/api";

export default function App() {
  const [user, setUser] = useState(() => {
    const saved =
      localStorage.getItem(
        "leavepro_user"
      );

    return saved
      ? JSON.parse(saved)
      : null;
  });

  const [requests, setRequests] =
    useState(() => api.getRequests());

  const [users] = useState(
    () => api.getUsers()
  );

  const [departments] = useState(
    () => api.getDepartments()
  );

  const [leaveTypes] = useState(
    () => api.getLeaveTypes()
  );

  function refreshRequests() {
    setRequests(api.getRequests());
  }

  function handleRequestCreated() {
    refreshRequests();
  }

  function handleRequestUpdated() {
    refreshRequests();
  }

  if (!user) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />
      </Routes>
    );
  }

  return (
    <Layout user={user}>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={
                user.role === "manager"
                  ? "/manager"
                  : "/employee"
              }
              replace
            />
          }
        />

        <Route
          path="/employee"
          element={
            user.role === "employee" ? (
              <EmployeeDashboard
                user={user}
                requests={requests}
                users={users}
                leaveTypes={leaveTypes}
              />
            ) : (
              <Navigate
                to="/manager"
                replace
              />
            )
          }
        />

        <Route
          path="/manager"
          element={
            user.role === "manager" ? (
              <ManagerDashboard
                requests={requests}
                users={users}
                leaveTypes={leaveTypes}
              />
            ) : (
              <Navigate
                to="/employee"
                replace
              />
            )
          }
        />

        <Route
          path="/apply-leave"
          element={
            user.role === "employee" ? (
              <ApplyLeave
                user={user}
                leaveTypes={leaveTypes}
                onRequestCreated={
                  handleRequestCreated
                }
              />
            ) : (
              <Navigate
                to="/manager"
                replace
              />
            )
          }
        />

        <Route
          path="/history"
          element={
            user.role === "employee" ? (
              <LeaveHistory
                user={user}
                requests={requests}
                users={users}
                leaveTypes={leaveTypes}
              />
            ) : (
              <Navigate
                to="/manager"
                replace
              />
            )
          }
        />

        <Route
          path="/balance"
          element={
            user.role === "employee" ? (
              <LeaveBalance
                user={user}
                requests={requests}
                leaveTypes={leaveTypes}
              />
            ) : (
              <Navigate
                to="/manager"
                replace
              />
            )
          }
        />

        <Route
          path="/requests"
          element={
            user.role === "manager" ? (
              <LeaveRequests
                requests={requests}
                users={users}
                leaveTypes={leaveTypes}
              />
            ) : (
              <Navigate
                to="/employee"
                replace
              />
            )
          }
        />

        <Route
          path="/employees"
          element={
            user.role === "manager" ? (
              <Employees
                users={users}
                departments={
                  departments
                }
              />
            ) : (
              <Navigate
                to="/employee"
                replace
              />
            )
          }
        />

        <Route
          path="/departments"
          element={
            user.role === "manager" ? (
              <Departments
                departments={
                  departments
                }
                users={users}
              />
            ) : (
              <Navigate
                to="/employee"
                replace
              />
            )
          }
        />

        <Route
          path="/leave/:id"
          element={
            <LeaveDetails
              user={user}
              requests={requests}
              users={users}
              leaveTypes={leaveTypes}
              onRequestUpdated={
                handleRequestUpdated
              }
            />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to={
                user.role === "manager"
                  ? "/manager"
                  : "/employee"
              }
              replace
            />
          }
        />
      </Routes>
    </Layout>
  );
}