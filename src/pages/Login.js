import React from "react";
import { Link } from "react-router-dom";
import netlifyIdentity from "netlify-identity-widget";

const Login = () => {
  return (
    <>
      <h1>Log In</h1>
      <Link to="/">Back</Link>
      <div>
        <button onClick={() => netlifyIdentity.open()}>Login</button>
        <button onClick={() => netlifyIdentity.logout()}>Log Out</button>
      </div>
    </>
  );
};

export default Login;
