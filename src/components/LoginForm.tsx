import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { useAppContext } from "../context/AppContext";
import { validateLoginForm } from "../utils";

const LoginForm = () => {
  const { login } = useAppContext();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await login(values.email, values.password);
      navigate("/");
    } catch (error) {
      formik.setErrors({ email: error.json.error_description });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLoginForm,
    onSubmit,
  });

  return (
    <form
      name="user-login"
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
        <div className="bg-yellow-400 rounded mt-5 p-2">
          {formik.errors.email}
        </div>
      ) : null}
      {formik.touched.password && formik.errors.password ? (
        <div className="bg-yellow-400 rounded mt-5 p-2">
          {formik.errors.password}
        </div>
      ) : null}
    </form>
  );
};

export default LoginForm;
