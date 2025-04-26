import React from "react";
import { Tabla } from "./ui/Tabla";

const encabezado = ["Curso", "Docente", "Correo"];

export const ListaCursosMonitor = ({ cursos = [] }) => {
  const datos = [...cursos]
    .sort((a, b) => a.curso.localeCompare(b.curso))
    .map((clase) => [clase.curso, clase.docente, clase.correo]);

  return <Tabla encabezado={encabezado} datos={datos} />;
};
