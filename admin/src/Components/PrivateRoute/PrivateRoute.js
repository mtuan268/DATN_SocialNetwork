import React from "react";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const login = localStorage.getItem("firstLogin");
  console.log(" toke", login);
  return <>{login ? <>{children}</> : navigate("/login")}</>;
};
