import React, { useEffect } from "react";
import logoCeprunsa from "@/assets/CEPRUNSA_LOGO.jpg";
import logoUnsa from "@/assets/LOGO_UNSA.png";
import escudo from "@/assets/escudo-unsa.jpeg";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const width = 500;
    const height = 600;
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
    <div className="h-screen p-5 flex flex-col items-start justify-center"> {/* Cambiado a items-start */}
      {/* Contenedor único blanco con margen izquierdo */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6 ml-8"> {/* Añadido ml-8 y aumentado p-6 a p-8 */}
        {/* Contenedor de logos con espacio superior */}
        <div className="flex justify-start items-center space-x-6 pt-4"> {/* Cambiado a justify-start y añadido pt-4 */}
          <img src={logoUnsa} alt="UNSA" className="h-14 object-contain" />
          <img src={logoCeprunsa} alt="CEPRUNSA" className="h-14 object-contain" />
        </div>

        {/* Línea divisoria horizontal con más espacio */}
        <div className="border-t-2 border-gray-300 w-full my-4"></div> {/* Aumentado my-2 a my-4 */}

        {/* Texto de inicio de sesión con más espacio superior */}
        <div className="text-left pt-2"> {/* Cambiado a text-left y añadido pt-2 */}
          <h2 className="text-lg font-semibold">
            Identifíquese usando su cuenta en:
          </h2>
        </div>

        {/* Botón de login más grueso */}
        <button
          className="flex items-center justify-center space-x-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-4 px-6 rounded-lg w-full transition-colors" /* Aumentado py-3 a py-4 y px-4 a px-6 */
          onClick={handleLogin}
        >
          <img src={escudo} alt="Escudo UNSA" className="h-7 w-7" /> {/* Aumentado tamaño del icono */}
          <span className="font-semibold text-base">Ingrese con su correo CEPRUNSA</span> {/* Aumentado tamaño texto */}
        </button>

        {/* Botón de cookies */}
        <div className="flex justify-end pt-4"> {/* Aumentado pt-2 a pt-4 */}
          <button className="text-blue-500 hover:text-blue-700 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors">
            Aviso de Cookies
          </button>
        </div>
      </div>
    </div>
  );
};