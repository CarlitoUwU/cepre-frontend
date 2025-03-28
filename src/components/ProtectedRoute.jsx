import React from "react";
import { Navigate, Outlet, useLocation, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { LoginPanel } from "../pages/Login/LoginPanel";

export const ProtectedRoute = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Buscar el token en la URL (para GoogleAuthHandler)
  const urlToken = searchParams.get("token") || null;
  const storedToken = localStorage.getItem("token");
  const token = urlToken || storedToken;

  // Permitir acceso a GoogleAuthHandler si el token está en la URL
  if (location.pathname === "/login" && urlToken) {
    return <Outlet />;
  }

  if (!token) {
    return <LoginPanel />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    // Si el token en la URL es diferente al de localStorage, actualizarlo
    if (urlToken && urlToken !== storedToken) {
      localStorage.setItem("token", urlToken);
    }

    // Definir las rutas permitidas por rol
    const rolePaths = {
      administrador: "/admin",
      docente: "/docente",
      monitor: "/monitor",
      supervisor: "/supervisor",
    };

    const expectedPath = rolePaths[userRole] || "/";

    // ✅ Redirigir si la ruta actual no coincide con la del rol
    if (!location.pathname.startsWith(expectedPath)) {
      return <Navigate to={expectedPath} replace />;
    }

    return <Outlet />; // Permite acceso si la ruta es correcta
  } catch (error) {
    console.error("Token inválido:", error);
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
};
