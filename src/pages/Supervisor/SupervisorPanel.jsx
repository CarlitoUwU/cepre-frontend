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
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Aula</th>
                <th className="py-2 px-4">Monitor</th>
                <th className="py-2 px-4">Enlace</th>
                <th className="py-2 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {aulasData.map((aula) => (
                <tr key={aula.id} className="border-b">
                  <td className="py-2 px-4 text-center">{aula.id}</td>
                  <td className="py-2 px-4">{aula.aula}</td>
                  <td className="py-2 px-4">{aula.monitor}</td>
                  <td className="py-2 px-4 text-center">
                    <a href={aula.enlace} target="_blank" className="text-blue-600 hover:underline">
                      Ir al aula
                    </a>
                  </td>
                  <td className="py-2 px-4 flex space-x-2">
                    {/* Botón de horario */}
                    <button
                      onClick={() => navigate("/supervisor/horario")}
                      className="bg-green-500 text-black px-3 py-1 rounded hover:bg-green-600"
                    >
                      Visualizar Horario
                    </button>
                    {/* Botón para ver directorio */}
                    <button
                      onClick={() => handleVerDirectorio(aula.aula)}
                      className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Ver Directorio
                    </button>
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
