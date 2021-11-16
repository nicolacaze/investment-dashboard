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
    <div className="bg-gray w-screen h-screen flex">
      <Link to="/">Back</Link>
      <div className="h-3/6 w-4/12 max-w-5xl m-auto bg-white rounded p-6 shadow">
        <h1 className="text-center font-semibold text-xl">Log In</h1>
        <form
          className="flex flex-col p-8 h-full"
          onSubmit={formik.handleSubmit}
        >
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="px-2 py-2 rounded border-2 border-gray-700"
            type="email"
            {...formik.getFieldProps("email")}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="px-2 py-2 rounded border-2 border-gray-700"
            type="password"
            {...formik.getFieldProps("password")}
          />
          <button
            className="mt-5 p-3 bg-dark-gray hover:opacity-80 text-white rounded"
            type="submit"
          >
            Submit
          </button>
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Login;
