import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { useAuthContext } from "../context/AuthContext";
import { validateForm } from "../utils";

const Login = () => {
  const { login, isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await login(values.email, values.password);
      navigate("/");
    } catch (error) {
      formik.setErrors({ email: error.message });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateForm,
    onSubmit,
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <>
      <h1>Log In</h1>
      <Link to="/">Back</Link>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...formik.getFieldProps("email")} />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Login;
