import React, { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Usuarios } from "./usuarios/Usuarios";
import { Salones } from "./salones/Salones";
import { Cursos } from "./cursos/Cursos";
import { Button } from "@/components/ui/Button";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const vistaActual = useMemo(() => searchParams.get("vista") || "usuarios", [searchParams]);
  const navigate = useNavigate();

  const cambiarVista = (nuevaVista) => {
    setSearchParams(new URLSearchParams({ vista: nuevaVista }));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen md:h-[83vh] md:m-5">
      {/* Barra lateral (solo desktop) */}
      <div className="hidden md:flex md:w-1/6 bg-gray-200 p-6 flex-col gap-6 items-center justify-start rounded-lg h-full overflow-auto select-none">
        <div className="w-full text-center">
          <Button onClick={() => navigate("..")}>
            Menú Principal
          </Button>
        </div>
        {secciones.map(({ id, nombre, icono }) => (
          <button
            key={id}
            className={`cursor-pointer flex flex-col justify-center items-center p-4 rounded-lg shadow-md w-full flex-1 transition-all ${
              vistaActual === id ? "bg-gray-400" : "bg-white hover:bg-gray-200"
            }`}
            onClick={() => cambiarVista(id)}
          >
            <img src={icono} alt={nombre} className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
            <span className="mt-2 font-semibold text-xs sm:text-sm md:text-md">{nombre}</span>
          </button>
        ))}
      </div>

      {/* Espacio para desktop */}
      <div className="hidden md:block mx-3"></div>

      {/* Contenido principal con pequeño margen interno en móvil */}
      <div className="w-full md:w-5/6 flex-grow flex overflow-auto bg-gray-200 md:shadow-md md:rounded-lg px-2 md:p-4 pb-16 md:pb-4">
        <div className="w-full"> {/* Contenedor interno para el margen */}
          {componentes[vistaActual]}
        </div>
      </div>

      {/* Menú inferior móvil (pegado pero con pequeño margen interno) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300">
        <div className="flex px-1"> {/* Pequeño margen horizontal */}
          {secciones.map(({ id, nombre, icono }) => (
            <button
              key={id}
              onClick={() => cambiarVista(id)}
              className={`flex-1 flex flex-col items-center py-3 mx-0.5 rounded-t-lg ${vistaActual === id ? "bg-gray-200" : ""}`}
            >
              <img src={icono} alt={nombre} className="w-6 h-6" />
              <span className="text-xs mt-1">{nombre}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};