import React from "react";
import { Login } from "./Login";
import background from "../../assets/ceprunsa.png";

export const LoginPanel = () => {
  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Login />
    </div>
  );
};

export default LoginPanel;
