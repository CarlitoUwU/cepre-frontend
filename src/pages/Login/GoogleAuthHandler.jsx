import React, { useEffect } from "react";
import { useAuth } from "@/contexts/useAuth";
import { useNavigate } from "react-router-dom";

const getTokenFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("token");
};

export const GoogleAuthHandler = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const token = getTokenFromUrl();

  useEffect(() => {
    if (token) {
      login(token, navigate);
    } else {
      console.error("No se encontró token en la URL.");
      navigate("/");
    }
  }, [token, login, navigate]);

  return <div>Autenticando...</div>;
};
