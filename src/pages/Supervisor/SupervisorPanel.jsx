import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import aulasData from "../../data/aulas.json";
import docentesData from "../../data/docentes.json";

export const SupervisorPanel = () => {
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [directorio, setDirectorio] = useState([]);
  const navigate = useNavigate();

  const handleVerDirectorio = (aulaSeleccionada) => {
    setSelectedSalon(aulaSeleccionada);

    // Filtrar docentes que tienen este aula en "salones_asignados"
    const docentesFiltrados = docentesData
      .filter((docente) => docente.salones_asignados.includes(aulaSeleccionada))
      .map((docente) => ({
        curso: docente.curso,
        nombre: docente.docente,
        correo: docente.correo,
        numero: docente.numero,
      }));

    setDirectorio(docentesFiltrados);
  };

  const handleRegresar = () => {
    setSelectedSalon(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Panel de Supervisor</h1>

      {selectedSalon === null ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-[#78211E] text-white font-[Calibri] font-extrabold">
                <th className="py-2 px-4 border-b border-gray-300">N°</th>
                <th className="py-2 px-4 border-b border-gray-300">Aula</th>
                <th className="py-2 px-4 border-b border-gray-300">Monitor</th>
                <th className="py-2 px-4 border-b border-gray-300">Enlace</th>
                <th className="py-2 px-4 border-b border-gray-300">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {aulasData.map((aula, index) => (
                <tr key={index}
                  className={`${index % 2 === 0 ? "bg-[#F4F4F4]" : "bg-[#F6EDD8]"} font-[Calibri] font-medium`}>
                  <td className="py-2 px-4 border-b border-gray-300" >{index + 1}</td>
                  <td className="py-2 px-4 border-b border-gray-300" >{aula.aula}</td>
                  <td className="py-2 px-4 border-b border-gray-300" >{aula.monitor}</td>
                  <td className="py-2 px-4 border-b border-gray-300" >
                    <a href={aula.enlace} target="_blank" className="text-blue-600 hover:underline">
                      Ir al aula
                    </a>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center" >
                    <div className="inline-flex gap-4">
                      {/* Botón de horario */}
                      <button
                        onClick={() => navigate("/supervisor/horario")}
                        className="bg-[#78211E] text-white px-4 py-2 rounded hover:bg-[#5a1815]"
                      >
                        Visualizar Horario
                      </button>
                      {/* Botón para ver directorio */}
                      <button
                        onClick={() => handleVerDirectorio(aula.aula)}
                        className="bg-[#78211E] text-white px-4 py-2 rounded hover:bg-[#5a1815]"
                      >
                        Ver Directorio
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold text-center mb-4">Directorio del Aula {selectedSalon}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">Curso</th>
                  <th className="py-2 px-4">Nombre</th>
                  <th className="py-2 px-4">Correo</th>
                  <th className="py-2 px-4">Número</th>
                </tr>
              </thead>
              <tbody>
                {directorio.length > 0 ? (
                  directorio.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4 text-center">{index + 1}</td>
                      <td className="py-2 px-4">{item.curso}</td>
                      <td className="py-2 px-4">{item.nombre}</td>
                      <td className="py-2 px-4">{item.correo}</td>
                      <td className="py-2 px-4">{item.numero}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-red-600">
                      No hay docentes asignados a este aula.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-4">
            <button
              onClick={handleRegresar}
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
