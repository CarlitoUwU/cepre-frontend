import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../data/aulas.json"; // Ruta json

export const SupervisorPanel = () => {
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [directorio, setDirectorio] = useState([]);
  const navigate = useNavigate();

  const aulas = data; // Ahora usa los datos de aulas.json

  const directorioEjemplo = {
    1: [
      { curso: "Matemáticas", nombre: "Pedro Ramirez", correo: "pedro@mail.com", numero: "987654321" },
      { curso: "Historia", nombre: "Laura Fernández", correo: "laura@mail.com", numero: "912345678" },
    ],
    2: [
      { curso: "Física", nombre: "Luis Torres", correo: "luis@mail.com", numero: "923456789" },
      { curso: "Química", nombre: "Maria Herrera", correo: "maria@mail.com", numero: "956789123" },
    ],
    3: [
      { curso: "Inglés", nombre: "Fernando Pérez", correo: "fernando@mail.com", numero: "934567890" },
      { curso: "Biología", nombre: "Sofía Martínez", correo: "sofia@mail.com", numero: "987123456" },
    ],
  };

  const handleVerDirectorio = (id) => {
    setSelectedSalon(id);
    setDirectorio(directorioEjemplo[id] || []);
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
              {aulas.map((aula) => (
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
                    {/* Botón actualizado para redirigir a la vista de horario */}
                    <button
                      onClick={() => {
                        if (aula.id === 1) {
                          window.location.href = "/supervisor/horario";
                        } else {
                          alert(`El horario para ${aula.aula} no está disponible.`);
                        }
                      }}
                      className="bg-green-500 text-black px-3 py-1 rounded hover:bg-green-600"
                    >
                      Visualizar Horario
                    </button>
                    <button
                      onClick={() => handleVerDirectorio(aula.id)}
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
          <h2 className="text-xl font-semibold text-center mb-4">Directorio de Aula</h2>
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
                {directorio.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 text-center">{index + 1}</td>
                    <td className="py-2 px-4">{item.curso}</td>
                    <td className="py-2 px-4">{item.nombre}</td>
                    <td className="py-2 px-4">{item.correo}</td>
                    <td className="py-2 px-4">{item.numero}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-4">
            <button
              onClick={handleRegresar}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Regresar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};