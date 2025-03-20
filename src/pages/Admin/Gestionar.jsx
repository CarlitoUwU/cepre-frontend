import React, { useState } from "react";
import { Usuarios } from "./Usuarios";
import { Salones } from "./Salones";
import { Cursos } from "./Cursos";

const usuariosIcon = "/usuarios.png";
const salonesIcon = "/salones.png";
const cursosIcon = "/cursos.png";

export const Gestionar = () => {
  const [vistaActual, setVistaActual] = useState("usuarios");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Contenedor principal sin tanto margen inferior */}
      <div className="flex h-[75vh]">
        {/* Barra lateral */}
        <div className="w-1/6 bg-gray-300 p-4 flex flex-col gap-7 items-center justify-center">
          <button
            className={`flex flex-col justify-center items-center p-4 rounded-lg shadow-md w-35 h-50 transition-all ${
              vistaActual === "usuarios" ? "bg-gray-400" : "bg-white hover:bg-gray-200"
            }`}
            onClick={() => setVistaActual("usuarios")}
          >
            <img src={usuariosIcon} alt="Usuarios" className="w-15 h-15" />
            <span className="mt-2 font-semibold text-lg">Usuarios</span>
          </button>

          <button
            className={`flex flex-col justify-center items-center p-4 rounded-lg shadow-md w-35 h-50 transition-all ${
              vistaActual === "salones" ? "bg-gray-400" : "bg-white hover:bg-gray-200"
            }`}
            onClick={() => setVistaActual("salones")}
          >
            <img src={salonesIcon} alt="Salones" className="w-15 h-15" />
            <span className="mt-2 font-semibold text-lg">Salones</span>
          </button>

          <button
            className={`flex flex-col justify-center items-center p-4 rounded-lg shadow-md w-35 h-50 transition-all ${
              vistaActual === "cursos" ? "bg-gray-400" : "bg-white hover:bg-gray-200"
            }`}
            onClick={() => setVistaActual("cursos")}
          >
            <img src={cursosIcon} alt="Cursos" className="w-15 h-15" />
            <span className="mt-2 font-semibold text-lg">Cursos</span>
          </button>
        </div>

        {/* Contenido, centrado solo horizontalmente */}
        <div className="w-5/6 p-8 bg-white shadow-md rounded-lg h-[75vh] flex justify-center">
          <div className="w-full overflow-auto">
            {vistaActual === "usuarios" && <Usuarios />}
            {vistaActual === "salones" && <Salones />}
            {vistaActual === "cursos" && (
              <div className="overflow-x-auto"> {/* Agrega este div */}
                <Cursos />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer fijo, ahora más pegado */}
      <footer className="fixed bottom-0 left-0 w-full bg-gray-200 h-16 shadow-md flex items-center z-50">
        <button
          onClick={() => navigate("/admin")}
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all ml-8"
        >
          Menú Principal
        </button>
      </footer>
    </div>
  );
};
