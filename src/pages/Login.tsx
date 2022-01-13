import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "../context/AppContext";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div className="bg-gray w-screen h-screen flex">
      <div className="h-3/6 w-4/12 max-w-5xl m-auto bg-white rounded p-6 shadow">
        <h1 className="text-center font-semibold text-xl">Log In</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
