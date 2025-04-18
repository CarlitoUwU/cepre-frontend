import React, { useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import unsaLogo from "@/assets/Unsa_logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("token");
      if (token) {
        login(token, navigate, false);
      }
    }
  }, [user, login, navigate]);

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#D6AD65] h-20 shadow-md flex items-center z-50">
      {/* Sección izquierda: Logo + Texto alineados */}
      <div className="flex items-center h-full pl-0">
        <img src={unsaLogo} alt="UNSA" className="h-full object-cover" />
        <p className="ml-4 text-white text-lg font-semibold">
          {user ? `Bienvenido ${user.role}, ${user.email}` : "Bienvenido"}
        </p>
      </div>

      {/* Botón de salida alineado a la derecha */}
      <button
        onClick={handleLogout}
        className="ml-auto flex items-center text-white space-x-2 hover:opacity-80 pr-4 cursor-pointer"
      >
        <span>Salir</span>
        <FaSignOutAlt size={20} />
      </button>
    </header>
  );
};
