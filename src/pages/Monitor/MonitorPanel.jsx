import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TablaHorarioMonitor } from "@/components/Horarios/indexMonitor";
import { ListaCursosMonitor } from "@/components/ListaCursosMonitor";
import { FuncionesMonitor } from "./FuncionesMonitor";
import MonitorServices from "@/services/monitorServices";
import { DIAS } from "@/constants/dias";

const formatTimeToHHMM = (isoString) => {
  const date = new Date(isoString);
  return date.toISOString().substring(11, 16);
};

const fetchHorarioData = async () => {
  try {
    const horario = await MonitorServices.cargarHorario();
    return horario.map((hora) => ({
      dia: DIAS[hora.weekday],
      hora_ini: formatTimeToHHMM(hora.startTime),
      hora_fin: formatTimeToHHMM(hora.endTime),
      curso: hora.courseName,
    }));
  } catch (error) {
    console.error("Error fetching horario data", error);
    return [];
  }
};

const fetchProfesoresData = async () => {
  try {
    const profesores = await MonitorServices.cargarDocentes();
    return profesores.map((profesor) => ({
      curso: profesor.courseName,
      docente: `${profesor.firstName} ${profesor.lastName}`,
      correo: profesor.email,
    }))
  }
  catch (error) {
    console.error("Error fetching profesores data", error);
    return [];
  }
}

export const MonitorPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [horario, setHorario] = useState([]);
  const [listaProfesores, setListaProfesores] = useState([]);
  const [meetLink, setMeetLink] = useState("https://meet.google.com/");
  const [classroomLink, setClassroomLink] = useState("https://classroom.google.com/");

  const updateLinks = () => {
    const { linkType, newLink } = location.state || {};
    if (!linkType || !newLink) return;
    const linkHandlers = { meet: setMeetLink, classroom: setClassroomLink };
    linkHandlers[linkType]?.(newLink);
  };

  useEffect(() => {
    const loadHorario = async () => {
      const data = await fetchHorarioData();
      const profesores = await fetchProfesoresData();
      setListaProfesores(profesores);
      setHorario(data);
    };
    loadHorario();
  }, []);

  useEffect(updateLinks, [location.state]);

  const openEditPage = (type, currentLink) => {
    navigate(`/monitor/editar-enlace`, {
      state: { linkType: type, currentLink },
    });
  };

  const monitorInfo = { meetLink, classroomLink, openEditPage };

  return (
    <div className="bg-gray-200 p-4 m-5 text-center">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Lista de Cursos */}
        <div className="col-span-2 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4">CURSOS</h2>
          <ListaCursosMonitor cursos={listaProfesores} />
        </div>

        {/* Horario del Monitor */}
        <div className="col-span-3 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4">HORARIO I-102</h2>
          <TablaHorarioMonitor horas={horario} />

          {/* Funciones del Monitor */}
          <div className="col-span-5 mt-8">
            <FuncionesMonitor monitorInfo={monitorInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};