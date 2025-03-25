import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import horarioData from "../../data/horario.json";
import { TablaHorarioMonitor } from "../../components/Horarios/indexMonitor";
import { ListaCursosMonitor } from "../../components/ListaCursosMonitor";
import { FuncionesMonitor } from "../../components/FuncionesMonitor";

export const MonitorPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const horario = horarioData; 

  const [meetLink, setMeetLink] = useState("https://meet.google.com/");
  const [classroomLink, setClassroomLink] = useState("https://classroom.google.com/");

  const updateLinks = () => {
    if (!location.state?.linkType || !location.state?.newLink) return;
    const linkHandlers = { meet: setMeetLink, classroom: setClassroomLink };
    linkHandlers[location.state.linkType]?.(location.state.newLink);
  };

  useEffect(updateLinks, [location.state]);

  const openEditPage = (type, currentLink) => {
    navigate(`/monitor/editar-enlace`, { state: { linkType: type, currentLink } });
  };

  const monitorInfo = { meetLink, classroomLink, openEditPage };

  return (
    <div className="bg-gray-200 p-4 mt-25 m-5 text-center">
      <div className="mx-auto bg-white p-4 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Lista de Cursos */}
          <div className="col-span-2 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">CURSOS</h2>
            <ListaCursosMonitor cursos={horario} />
          </div>

          {/* Horario del Monitor */}
          <div className="col-span-3 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">HORARIO I-102</h2>
            <TablaHorarioMonitor listaCursos={horario} />

            {/* Funciones del Monitor */}
            <div className="col-span-5 mt-8">
              <FuncionesMonitor monitorInfo={monitorInfo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
