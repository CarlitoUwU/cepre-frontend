import React, { useState, useEffect } from "react";
import horarioData from "../../data/horario.json";
import { TablaHorario } from "../../components/Horarios";

export const MonitorPanel = () => {
  const [horario, setHorario] = useState([]);

  useEffect(() => {
    setHorario(horarioData);
  }, []);

  return (
    <div className="bg-gray-200 p-4 mt-18">
      <div className=" mx-auto bg-white p-4 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Tabla de Cursos */}
          <div className="col-span-2 overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4">Cursos</h2>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-blue-200">
                  <th className="py-2 px-4 border-b border-gray-300 col-span-2">Curso</th>
                  <th className="py-2 px-4 border-b border-gray-300 col-span-3">Docente</th>
                  <th className="py-2 px-4 border-b border-gray-300 col-span-2">Correo</th>
                </tr>
              </thead>
              <tbody>
                {horario.map((clase) => (
                  <tr key={clase.id}>
                    <td className="py-2 px-4 border-b border-gray-300">{clase.curso}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{clase.docente}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{clase.correo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="col-span-3 overflow-x-auto">
            {/* Tabla de Horario */}
            <h2 className="text-2xl font-semibold mb-4">Horario de Clases</h2>
            <TablaHorario listaSalones={horario}/>
            
            {/* Agregar funciones monitor */}
            <h2 className="text-2xl font-semibold mt-6 mb-4">Funciones del Monitor</h2>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-blue-200">
                  <th className="py-2 px-4 border-b border-gray-300">Aula</th>
                  <th className="py-2 px-4 border-b border-gray-300">Monitor</th>
                  <th className="py-2 px-4 border-b border-gray-300">Enlace</th>
                  <th className="py-2 px-4 border-b border-gray-300">Acciones</th>
                  <th className="py-2 px-4 border-b border-gray-300">Classroom</th>
                </tr>
              </thead>
              <tbody>
                {horario.map((clase) => (
                  <tr key={clase.id}>
                    <td className="py-2 px-4 border-b border-gray-300">{clase.aula || "N/A"}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{clase.monitor || "N/A"}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{clase.enlace || "N/A"}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{clase.acciones || "N/A"}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{clase.classroom || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
