import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Usuarios } from "./Usuarios";
import { Salones } from "./Salones";
import { Cursos } from "./Cursos";

const opciones = [
  { key: "usuarios", label: "Usuarios", icon: "/usuarios.png" },
  { key: "salones", label: "Salones", icon: "/salones.png" },
  { key: "cursos", label: "Cursos", icon: "/cursos.png" },
];

export const Gestionar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const vistaActual = useMemo(() => searchParams.get("vista") || "usuarios", [searchParams]);

  const cambiarVista = (nuevaVista) => {
    setSearchParams(new URLSearchParams({ vista: nuevaVista }));
  };

  return (
    <div className="flex flex-col">
      {/* Contenedor principal sin tanto margen inferior */}
      <div className="flex h-[85vh]">
        {/* Barra lateral */}
        <div className="w-1/6 h-full bg-gray-300 p-6 flex flex-col gap-10 items-center justify-center">
          {opciones.map(({ key, label, icon }) => (
            <button
              key={key}
              className={`flex flex-col justify-center items-center p-4 rounded-lg shadow-md w-50 h-50 transition-all 
                ${vistaActual === key ? "bg-gray-400" : "bg-white hover:bg-gray-200"}`}
              onClick={() => cambiarVista(key)}
            >
              <img src={icon} alt={label} className="w-15 h-15" />
              <span className="mt-2 font-semibold text-lg">{label}</span>
            </button>
          ))}
        </div>

        {/* Contenido, centrado solo horizontalmente */}
        <div className="w-5/6 pl-5 bg-white shadow-md rounded-lg h-[85vh] flex justify-center">
          <div className="w-full overflow-auto">
            {vistaActual === "usuarios" && <Usuarios />}
            {vistaActual === "salones" && <Salones />}
            {vistaActual === "cursos" && <Cursos />}
          </div>
        </div>
      </div>
    </div>
  );
};
