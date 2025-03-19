import React, { useState, useEffect } from "react";
import horarioData from "../../data/horario.json";
import { TablaHorarioMonitor } from "../../components/Horarios/indexMonitor";
import meetIcon from "../../assets/meet.png";
import classroomIcon from "../../assets/classroom.png";

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
            <h2 className="text-2xl font-bold mb-4">CURSOS</h2>
            <table className="min-w-full bg-white border border-gray-300 font-[Calibri] ">
            <thead>
              <tr className="bg-[#78211E] text-white font-[Calibri] font-extrabold">
                <th className="py-2 px-4 border-b border-gray-300">Curso</th>
                <th className="py-2 px-4 border-b border-gray-300">Docente</th>
                <th className="py-2 px-4 border-b border-gray-300">Correo</th>
              </tr>
            </thead>
            <tbody>
              {horario.map((clase, index) => (
                <tr
                  key={clase.id}
                  className={`${index % 2 === 0 ? "bg-[#F4F4F4]" : "bg-[#F6EDD8]"} font-[Calibri] font-medium`}
                >
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
            <h2 className="text-2xl font-bold mb-4">HORARIO I-102</h2>
            <TablaHorarioMonitor listaCursos={horario} />

            {/* Funciones del Monitor */}
            <div className="col-span-5 mt-6">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-[#78211E] text-white">
                    <th className="py-2 px-4 border-b border-gray-300 w-1/6">Aula</th>
                    <th className="py-2 px-4 border-b border-gray-300 w-2/6">Monitor</th>
                    <th className="py-2 px-4 border-b border-gray-300 w-1/6">Meet</th>
                    <th className="py-2 px-4 border-b border-gray-300 w-1/6">Classroom</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Primera fila (borde visible) */}
                  <tr>
                    <td className="py-2 px-4 border border-gray-300">I-102</td>
                    <td className="py-2 px-4 border border-gray-300">Joel Antonio Chino Pari</td>
                    <td className="py-2 px-4 border border-gray-300 text-center">
                      <a href="https://meet.google.com/byk-mjbz-qij" target="_blank" rel="noopener noreferrer">
                        <img src={meetIcon} alt="Meet" className="mx-auto" style={{ maxWidth: "100px", maxHeight: "50px" }} />
                      </a>
                    </td>
                    <td className="py-2 px-4 border border-gray-300 text-center">
                      <a href="https://classroom.google.com/c/NzA1MzczMDAwNzIz" target="_blank" rel="noopener noreferrer">
                        <img src={classroomIcon} alt="Classroom" className="mx-auto" style={{ maxWidth: "50px", maxHeight: "50px" }} />
                      </a>
                    </td>
                  </tr>         
                </tbody>
              </table>

              {/* Botones para agregar enlaces */}
              <div className="grid grid-cols-5 mt-8">
                <div></div> {/* Espacio 1 */}
                <div className="flex justify-center"> {/* Espacio 2 */}
                  <button className="bg-[#78211E] text-white px-6 py-2 rounded hover:bg-[#5a1815] transition font-[Calibri]">
                    Añadir Enlace Meet
                  </button>
                </div>
                <div></div> {/* Espacio 3 */}
                <div className="flex justify-center"> {/* Espacio 4 */}
                  <button className="bg-[#78211E] text-white px-6 py-2 rounded hover:bg-[#5a1815] transition font-[Calibri]">
                    Añadir Enlace Classroom
                  </button>
                </div>
                <div></div> {/* Espacio 5 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
