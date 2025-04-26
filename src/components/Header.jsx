import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import unsaLogo from "@/assets/Unsa_logo.png";
import { useAuth } from "@/contexts/useAuth";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#78211E] h-20 shadow-md flex items-center z-50">
      {/* Sección izquierda: Logo + Texto alineados */}
      <div className="flex items-center h-full pl-0">
        <img
          src={unsaLogo}
          alt="UNSA"
          className="h-full md:h-full object-cover w-auto md:w-auto max-h-[50px] md:max-h-none"
        />
        <p className="ml-2 md:ml-4 text-white text-sm md:text-lg font-semibold">
          {user ? `Bienvenido ${user.role}, ${user?.firstName?.split(' ')[0] || 'Sin Nombres'} ${user?.lastName || ''}` : "Bienvenido"}
        </p>
      </div>

      {/* Botón de salida - Versión ligeramente más grande */}
      <button
        onClick={handleLogout}
        className="ml-auto flex items-center text-white space-x-2 hover:opacity-80 pr-4 cursor-pointer"
      >
        <span className="text-sm md:text-base">Salir</span>
        <FaSignOutAlt size={18} className="md:size-5" />
      </button>
    </header>
  );
};