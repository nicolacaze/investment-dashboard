import React from "react";
import { Link } from "react-router-dom";
import netlifyIdentity from "netlify-identity-widget";

const Login = () => {
  return (
    <>
      <h1>Log In</h1>
      <Link to="/">Back to home</Link>
      <button onClick={() => netlifyIdentity.open()}>Log In</button>
      <button onClick={() => netlifyIdentity.logout()}>Logout</button>
    </>
  );
};

export default Login;
