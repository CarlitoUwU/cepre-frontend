import React, { useMemo } from "react";
import { useSearchParams, useNavigate} from "react-router-dom";
import { Usuarios } from "./Usuarios";
import { Salones } from "./Salones";
import { Cursos } from "./Cursos";
import { Button } from "../../../components/ui/Button";

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
    <div className="flex flex-col md:flex-row h-[85vh] m-5 mt-25">
      {/* Barra lateral responsive */}
<div className="w-full md:w-1/6 bg-gray-200 p-6 flex flex-wrap md:flex-col gap-4 md:gap-6 items-center justify-start rounded-lg h-full max-h-screen overflow-auto">
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

  {/* Botón Menú Principal ocupa todo el ancho */}
  <div className="w-full text-center">
    <Button onClick={() => navigate("..")} >
      Menú Principal
    </Button>
  </div>
</div>
      {/* Espacio más pequeño en pantallas grandes */}
      <div className="hidden md:block mx-3"></div>

      {/* Contenido principal */}
      <div className="w-full md:w-5/6 shadow-md rounded-lg flex-grow flex overflow-auto bg-gray-200 p-4 pb-15">
        {componentes[vistaActual]}
      </div>
    </div>
  );
};