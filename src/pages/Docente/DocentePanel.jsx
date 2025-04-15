import React, { useState, useEffect } from "react";
import { AulaInfo } from "@/components/AulaInfo";
import { ListaSalones } from "@/components/ListaSalones";
import { TablaHorario } from "@/components/Horarios";
import ClassesServices from "@/services/ClassesServices";
import { DIAS } from "@/constants/dias";
import { formatTimeToHHMM } from "@/utils/formatTime";

const AREAS = {
  S: "Sociales",
  I: "Ingenierías",
  B: "Biomédicas",
};

const fetchHorarioData = async () => {
  try {
    const clases = await ClassesServices.getClassOfTeacher();

    return clases.map((clase) => ({
      aula: clase.name,
      monitor: clase.monitor?.user
        ? `${clase.monitor.user.firstName} ${clase.monitor.user.lastName}`
        : "No asignado",
      enlace: clase.urlMeet || "Sin enlace",
      area: AREAS[clase.name.charAt(0)] || "Desconocido",
      horas: clase.schedules?.map((hora) => ({
        dia: DIAS[hora.weekday] || "Día desconocido",
        hora_ini: formatTimeToHHMM(hora.hourSession.startTime),
        hora_fin: formatTimeToHHMM(hora.hourSession.endTime),
      })) || [],
    }));
  } catch (error) {
    console.error("Error fetching horario data", error);
    return [];
  }
};

export const DocentePanel = () => {
  const [horario, setHorario] = useState([]);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);

  useEffect(() => {
    const loadHorario = async () => {
      try {
        const data = await fetchHorarioData();
        setHorario(data);
      } catch (error) {
        console.error("Error cargando el horario", error);
      }
    };

    loadHorario();
  }, []);

  return (
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        {/* Horario General */}
        <div className="col-span-1 md:col-span-2 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-5xl font-semibold mb-4">Horario General</h2>
          <TablaHorario listaSalones={horario} setClaseSeleccionada={setClaseSeleccionada} />
        </div>

        {/* Información del Aula */}
        <div className="col-span-1 bg-gray-100 p-4 rounded-lg shadow-md flex justify-center items-center">
          <AulaInfo {...(claseSeleccionada || {})} />
        </div>

        {/* Lista de Salones */}
        <div className="col-span-1 md:col-span-3 bg-gray-100 p-4 rounded-lg shadow-md">
          <ListaSalones items={horario} />
        </div>
      </div>
    </div>
  );
};
