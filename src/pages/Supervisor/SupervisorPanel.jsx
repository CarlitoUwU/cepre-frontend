import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabla } from "../../components/ui/Tabla";
import aulasData from "../../data/aulas.json";
import docentesData from "../../data/docentes.json";

// Encabezados de las tablas
const encabezadoAulas = ["N°", "Aula", "Monitor", "Enlace", "Acciones"];
const encabezadoDirectorio = ["#", "Curso", "Nombre", "Correo", "Número"];

export const SupervisorPanel = () => {
  const [selectedSalon, setSelectedSalon] = useState(null);
  const navigate = useNavigate();

  // Función para obtener los datos de la tabla de aulas
  const getDatosAulas = () => {
    return aulasData.map((aula, index) => [
      index + 1,
      aula.aula,
      aula.monitor,
      <a href={aula.enlace} target="_blank" className="text-blue-500 underline hover:text-blue-700">
        {aula.enlace}
      </a>,
      <div className="inline-flex gap-4">
        <button
          onClick={() => navigate("/supervisor/horario")}
          className="bg-[#78211E] text-white px-4 py-2 rounded hover:bg-[#5a1815]"
        >
          Visualizar Horario
        </button>
        <button
          onClick={() => setSelectedSalon(aula.aula)}
          className="bg-[#78211E] text-white px-4 py-2 rounded hover:bg-[#5a1815]"
        >
          Ver Directorio
        </button>
      </div>,
    ]);
  };

  // Función para obtener el directorio de docentes del aula seleccionada
  const getDirectorioDocentes = () => {
    if (!selectedSalon) return [];
    return docentesData
      .filter((docente) => docente.salones_asignados.includes(selectedSalon))
      .map((docente, index) => [
        index + 1,
        docente.curso,
        docente.docente,
        docente.correo,
        docente.numero,
      ]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Panel de Supervisor</h1>

      {selectedSalon === null ? (
        <Tabla encabezado={encabezadoAulas} datos={getDatosAulas()} />
      ) : (
        <div>
          <h2 className="text-xl font-semibold text-center mb-4">
            Directorio del Aula {selectedSalon}
          </h2>

          {getDirectorioDocentes().length > 0 ? (
            <Tabla encabezado={encabezadoDirectorio} datos={getDirectorioDocentes()} />
          ) : (
            <p className="text-center py-4 text-red-600">No hay docentes asignados a este aula.</p>
          )}

          <div className="text-center mt-4">
            <button
              onClick={() => setSelectedSalon(null)}
              className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600"
            >
              Regresar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
