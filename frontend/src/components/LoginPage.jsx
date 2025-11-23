import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("userInfo", JSON.stringify(data));
    setMessage("Login successful ✅");

    // ⭐ REDIRECT USER HERE ⭐
    navigate("/products");

  } catch (err) {
    setMessage(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Sign in</h2>
        <p className="auth-subtitle">Welcome back to SwiftCart</p>

        {message && <div className="auth-message">{message}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
            />
          </div>

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
