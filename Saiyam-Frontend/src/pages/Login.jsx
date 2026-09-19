import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("employee@company.com");

  const [password, setPassword] =
    useState("123456");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    setTimeout(() => {
      const user = api.login(
        email,
        password
      );

      if (!user) {
        setError(
          "Invalid email or password."
        );
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "leavepro_user",
        JSON.stringify(user)
      );

      if (user.role === "manager") {
        navigate("/manager");
      } else {
        navigate("/employee");
      }

      setLoading(false);
    }, 400);
  }

  function loginAsEmployee() {
    setEmail("employee@company.com");
    setPassword("123456");
  }

  function loginAsManager() {
    setEmail("manager@company.com");
    setPassword("123456");
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="brand-icon">L</div>
          <span>LeavePro</span>
        </div>

        <div className="login-intro">
          <h1>
            Employee Leave
            <br />
            Management
          </h1>

          <p>
            Manage employee leaves, approvals,
            balances and requests in one place.
          </p>

          <div className="login-feature">
            <span>✓</span>
            Easy leave management
          </div>

          <div className="login-feature">
            <span>✓</span>
            Fast approval workflow
          </div>

          <div className="login-feature">
            <span>✓</span>
            Real-time leave balance
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-box">
          <div className="mobile-login-logo">
            <div className="brand-icon">L</div>
            <span>LeavePro</span>
          </div>

          <h2>Welcome Back</h2>

          <p className="login-subtitle">
            Sign in to continue to your account
          </p>

          <form onSubmit={handleSubmit}>
            <label>Email Address</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              required
            />

            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              required
            />

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button
              className="primary-button login-button"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>
          </form>

          <div className="demo-login">
            <h4>Demo Accounts</h4>

            <button onClick={loginAsEmployee}>
              Employee Account
            </button>

            <button onClick={loginAsManager}>
              Manager Account
            </button>

            <small>
              Password: 123456
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}