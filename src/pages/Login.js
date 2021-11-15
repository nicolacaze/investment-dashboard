import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form.email, form.password);
    navigate("/");
  };

  return (
    <>
      <h1>Log In</h1>
      <Link to="/">Back</Link>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="Login" />
        </form>
      </div>
    </>
  );
};

export default Login;
