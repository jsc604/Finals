import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "../styles/header.scss";

const LoginButton = () => {
  const { loginWithPopup } = useAuth0();

  

  return <button className="log-in" onClick={() => loginWithPopup()}>Log In</button>;
};

export default LoginButton;