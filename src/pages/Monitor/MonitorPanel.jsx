import React, { useState, useEffect } from "react";
import horarioData from "../../data/horario.json";
import { TablaHorarioMonitor } from "../../components/Horarios/indexMonitor";

export const MonitorPanel = () => {
  const [horario, setHorario] = useState([]);

  useEffect(() => {
    setHorario(horarioData);
  }, []);

  return (
    <div className="bg-gray-200 p-4 mt-18">
      <div className="mx-auto bg-white p-4 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Tabla de Cursos */}
          <div className="col-span-2 overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4">Cursos</h2>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-blue-200">
                  <th className="py-2 px-4 border-b border-gray-300">Curso</th>
                  <th className="py-2 px-4 border-b border-gray-300">Docente</th>
                  <th className="py-2 px-4 border-b border-gray-300">Correo</th>
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

          {/* Horario del Monitor */}
          <div className="col-span-3 overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4">Horario de Monitores</h2>
            <TablaHorarioMonitor listaCursos={horario} />
          </div>
        </div>
      </div>
    </div>
  );
};
