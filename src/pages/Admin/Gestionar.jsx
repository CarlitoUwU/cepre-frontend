import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Usuarios } from "./Usuarios";
import { Salones } from "./Salones";
import { Cursos } from "./Cursos";

export const Gestionar = () => {
  const [vistaActual, setVistaActual] = useState("usuarios");
  const navigate = useNavigate();


  return (
    <div className="flex h-screen">
      {/* Barra lateral */}
      <div className="w-1/5 bg-gray-300 p-4 flex flex-col gap-4">
        <button 
          className={`bg-white p-3 rounded-md shadow-md hover:bg-gray-200 transition-all ${
            vistaActual === "usuarios" ? "bg-gray-200" : ""
          }`}
          onClick={() => setVistaActual("usuarios")}
        >
          Usuarios
        </button>
        <button 
          className={`bg-white p-3 rounded-md shadow-md hover:bg-gray-200 transition-all ${
            vistaActual === "salones" ? "bg-gray-200" : ""
          }`}
          onClick={() => setVistaActual("salones")}
        >
          Salones
        </button>
        <button 
          className={`bg-white p-3 rounded-md shadow-md hover:bg-gray-200 transition-all ${
            vistaActual === "cursos" ? "bg-gray-200" : ""
          }`}
          onClick={() => setVistaActual("cursos")}
        >
          Cursos
        </button>
      </div>

      {/* Contenido dinámico en la parte derecha */}
      <div className="w-4/5 p-6">
        {vistaActual === "usuarios" && <Usuarios />}
        {vistaActual === "salones" && <Salones />}
        {vistaActual === "cursos" && <Cursos />}
      </div>
      <footer className="fixed left-0 bottom-0 w-full bg-gray-100 p-4 flex justify-start items-center">
        <button
          onClick={() => navigate("/admin")}
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all"
        >
          Menú Principal
        </button>
      </footer>
    </div>
  );
};
