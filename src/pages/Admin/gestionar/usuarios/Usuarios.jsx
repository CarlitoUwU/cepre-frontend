import React, { useState } from "react";
import { ButtonCabecera } from "@/components/ui/ButtonCabecera";
import { DocenteUsuarios } from "./docente/DocenteUsuarios";
import { MonitorUsuarios } from "./monitor/MonitorUsuarios";
import { SupervisorUsuarios } from "./supervisor/SupervisorUsuarios";

const ROLES = {
  DOCENTE: "Docente",
  MONITOR: "Monitor",
  SUPERVISOR: "Supervisor",
};

export const Usuarios = () => {
  const [rol, setRol] = useState(ROLES.DOCENTE);

  const handleClick = (nuevoRol) => setRol(nuevoRol);

  return (
    <div className="overflow-x-auto w-full text-center">
      <div className="flex w-80 justify-between mx-auto mb-4">
        {Object.values(ROLES).map((tipoRol) => (
          <ButtonCabecera key={tipoRol} text={tipoRol} handleClick={() => handleClick(tipoRol)} className={`${rol === tipoRol ? "bg-gray-300 font-bold" : "bg-white"} px-4 py-2 rounded shadow`} />
        ))}
      </div>

      {rol === ROLES.DOCENTE && <DocenteUsuarios />}
      {rol === ROLES.MONITOR && <MonitorUsuarios />}
      {rol === ROLES.SUPERVISOR && <SupervisorUsuarios />}
    </div>
  );
};
