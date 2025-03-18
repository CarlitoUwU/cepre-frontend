import React from "react";
import logo from "../assets/Unsa_Logo.png";
import escudo from "../assets/escudo-unsa.jpeg";

const Login = () => {
  return (
    <div className="h-screen p-5 flex flex-col items-left justify-center space-y-10">
      
      <div className="bg-white shadow-lg p-2 max-w-md  rounded-tl-[10px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px]">
        <img src={logo} alt="UNSA CEPRUNSA" className="h-20" />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full text-center">
        
        {/* Texto de inicio de sesión */}
        <div className="mb-4 text-lg font-semibold">
          Identifíquese usando su cuenta en:
        </div>

        {/* Botón con imagen y texto */}
        <button className="flex items-center space-x-2 text-black px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition w-full">
          <img src={escudo} alt="Escudo UNSA" className="h-6 w-6" />
          <span>Ingrese con su correo CEPRUNSA</span>
        </button>

        {/* Botón de aviso de cookies alineado a la derecha */}
        <div className="mt-4 flex justify-end">
          <a href="#" className="text-blue-500 hover:underline text-sm">Aviso de Cookies</a>
        </div>
        
      </div>

    </div>
  );
};

export default Login;
