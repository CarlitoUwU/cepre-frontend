import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import unsaLogo from "../assets/Unsa_logo.png";

export const Header = ({ nombreUsuario = "Christian", rol = "Administrador" }) => {
  return (
    <header className="w-full fixed top-0 left-0 bg-[#D6AD65] h-20 shadow-md flex items-center">
      {/* Sección izquierda: Logo + Texto alineados */}
      <div className="flex items-center h-full">
        <img src={unsaLogo} alt="UNSA" className="h-full object-cover" />
        <p className="ml-4 text-white text-lg font-semibold">
          Bienvenido {rol}, {nombreUsuario}
        </p>
      </div>

      {/* Botón de salida alineado a la derecha */}
      <Link to="/logout" className="ml-auto flex items-center text-white space-x-2 hover:opacity-80 pr-4">
        <span>Salir</span>
        <FaSignOutAlt size={20} />
      </Link>
    </header>
  );
};
