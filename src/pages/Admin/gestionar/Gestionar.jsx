import React, { useState } from "react";
import { Usuarios } from "./Usuarios";
import { Salones } from "./Salones";
import { Cursos } from "./Cursos";

const secciones = [
  { id: "usuarios", nombre: "Usuarios", icono: "/usuarios.png" },
  { id: "salones", nombre: "Salones", icono: "/salones.png" },
  { id: "cursos", nombre: "Cursos", icono: "/cursos.png" },
];

const componentes = {
  usuarios: <Usuarios />,
  salones: <Salones />,
  cursos: <Cursos />,
};

export const Gestionar = () => {
  const [vistaActual, setVistaActual] = useState("usuarios");

  return (
    <div className="flex flex-col md:flex-row h-[85vh] m-5 mt-25">
      {/* Barra lateral responsive */}
      <div className="w-full md:w-1/6 bg-gray-200 p-6 flex md:flex-col flex-wrap gap-4 md:gap-6 items-center justify-center rounded-lg">
        {secciones.map(({ id, nombre, icono }) => (
          <button
            key={id}
            className={`cursor-pointer flex flex-col justify-center items-center p-4 rounded-lg shadow-md w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 transition-all ${
              vistaActual === id ? "bg-gray-400" : "bg-white hover:bg-gray-200"
            }`}
            onClick={() => setVistaActual(id)}
          >
            <img src={icono} alt={nombre} className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20" />
            <span className="mt-2 font-semibold text-sm sm:text-md md:text-lg">{nombre}</span>
          </button>
        ))}
      </div>

      {/* Espacio más pequeño en pantallas grandes */}
      <div className="hidden md:block mx-3"></div>

      {/* Contenido principal */}
      <div className="w-full md:w-5/6 shadow-md rounded-lg flex-grow flex overflow-auto bg-gray-200 p-4">
        {componentes[vistaActual]}
      </div>
    </div>
  );
};