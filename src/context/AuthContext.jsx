import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUser({
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
          });
        } catch (error) {
          console.error("Error decodificando el token:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
    };

    loadUser();
  }, []);

  const login = (token, navigate) => { // ✅ Pasar navigate como parámetro
    try {
      const storedToken = localStorage.getItem("token");

      // Si no se pasa un token como argumento, usar el del localStorage
      if (!token) {
        token = storedToken;
      }

      // Si hay token en localStorage y es diferente al que se pasa, usar el nuevo
      if (token && token !== storedToken) {
        localStorage.setItem("token", token);
      }

      if (!token) {
        console.error("No hay token disponible para autenticar.");
        return;
      }

      const decoded = jwtDecode(token);
      const user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };

      setUser(user);

      redirectByRole(decoded.role, navigate);
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  const logout = (navigate) => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const redirectByRole = (role, navigate) => {
    switch (role) {
      case "administrador":
        navigate("/admin");
        break;
      case "docente":
        navigate("/docente");
        break;
      case "monitor":
        navigate("/monitor");
        break;
      case "supervisor":
        navigate("/supervisor");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
