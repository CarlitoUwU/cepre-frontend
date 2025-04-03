import React, { useEffect, useState, useMemo } from "react";
import { TablaHorarioMonitor } from "@/components/Horarios/indexMonitor";
import MonitorServices from "@/services/monitorServices";

const formatTimeToHHMM = (isoString) => {
  if (!isoString) return "00:00"; // Evita errores si el valor es null o undefined
  const date = new Date(isoString);
  return date.toISOString().substring(11, 16);
};

const DIAS = {
  Lunes: "LUNES",
  Martes: "MARTES",
  Miércoles: "MIÉRCOLES",
  Jueves: "JUEVES",
  Viernes: "VIERNES",
  Sábado: "SÁBADO",
};

export const HorarioMonitorPanel = ({ aula = {}, volver = () => { }, cambiarVista = () => { } }) => {
  const [horario, setHorario] = useState([]);

  useEffect(() => {
    
    if (!aula || !aula.id) return; // Evita ejecutar si no hay aula válida

    const fetchHorarioData = async (salonId) => {
      try {
        const horarioData = await MonitorServices.cargarHorario(salonId);
        if (!Array.isArray(horarioData)) {
          console.error("Respuesta inválida de la API:", horarioData);
          return;
        }

        setHorario(
          horarioData.map((hora) => ({
            dia: DIAS[hora.weekday] || "Día desconocido",
            hora_ini: formatTimeToHHMM(hora.startTime),
            hora_fin: formatTimeToHHMM(hora.endTime),
            curso: hora.courseName || "Curso desconocido",
          }))
        );
      } catch (error) {
        console.error("Error al obtener horarios:", error);
      }
    };

    fetchHorarioData(aula.id);
  }, [aula]); // Se ejecuta cuando `aula` cambia

  const horariosRender = useMemo(() => horario, [horario]);

  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-4">
        {`Horario del Aula ${aula.aula || "Desconocida"}`}
      </h2>
      <TablaHorarioMonitor horas={horariosRender} />
      <div className="text-center mt-4 flex gap-4 justify-center">
        <button onClick={cambiarVista} className="bg-[#78211E] text-white px-4 py-2 rounded hover:bg-[#5a1815]">
          Visualizar Directorio
        </button>
        <button onClick={volver} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800">
          Volver
        </button>
      </div>
    </div>
  );
};
