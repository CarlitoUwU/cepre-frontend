import React, { useEffect } from "react";
import logoCeprunsa from "@/assets/CEPRUNSA_LOGO.jpg";
import logoUnsa from "@/assets/LOGO_UNSA.png";
import escudo from "@/assets/escudo-unsa.jpeg";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const width = Math.min(500, window.screen.width * 0.9);
    const height = Math.min(600, window.screen.height * 0.8);
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    window.open(
      `${import.meta.env.VITE_API_BACK_URL}/api/auth/google`,
      "_blank",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };
  
  useEffect(() => {
    const receiveMessage = (event) => {
      if (event.origin !== import.meta.env.VITE_API_BACK_URL) return;
      if (event.data.error) {
        alert("An error occurred during login. Please try again. ");
        return;
      }
      if (event.data.token) {
        localStorage.setItem("token", event.data.token);
        navigate("/");
      }
    };
    window.addEventListener("message", receiveMessage);
    return () => window.removeEventListener("message", receiveMessage);
  }, [navigate]);

  return (
    <div className="h-screen p-4 flex flex-col items-center md:items-start justify-center">
      {/* Contenedor único blanco - responsive */}
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md md:ml-8 mx-auto">
        {/* Contenedor de logos responsive */}
        <div className="flex justify-center md:justify-start items-center space-x-4 md:space-x-6 pt-2 md:pt-4">
          <img src={logoUnsa} alt="UNSA" className="h-12 md:h-14 object-contain" />
          <img src={logoCeprunsa} alt="CEPRUNSA" className="h-12 md:h-14 object-contain" />
        </div>

        {/* Línea divisoria */}
        <div className="border-t-2 border-gray-300 w-full my-3 md:my-4"></div>

        {/* Texto de inicio de sesión */}
        <div className="text-center md:text-left pt-1 md:pt-2">
          <h2 className="text-base md:text-lg font-semibold">
            Identifíquese usando su cuenta en:
          </h2>
        </div>

        {/* Botón de login responsive */}
        <button
          className="flex items-center justify-center space-x-2 md:space-x-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 md:py-4 px-4 md:px-6 rounded-lg w-full transition-colors mt-4"
          onClick={handleLogin}
        >
          <img src={escudo} alt="Escudo UNSA" className="h-6 md:h-7 w-6 md:w-7" />
          <span className="font-semibold text-sm md:text-base">Ingrese con su correo CEPRUNSA</span>
        </button>

        {/* Botón de cookies */}
        <div className="flex justify-end pt-3 md:pt-4">
          <button className="text-blue-500 hover:text-blue-700 text-xs md:text-sm font-medium px-2 md:px-3 py-1 rounded hover:bg-blue-50 transition-colors">
            Aviso de Cookies
          </button>
        </div>
      </div>
    </div>
  );
};