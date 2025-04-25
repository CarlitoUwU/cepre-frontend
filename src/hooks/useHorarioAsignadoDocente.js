import { useState } from "react";
import { DIAS_DIC } from "@/constants/dias";
import { TeachersServices } from "@/services/TeachersServices";
import { formatTimeToHHMM } from "@/utils/formatTime"; 

export const useHorarioAsignadoDocente = () => {
  const [horario, setHorario] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarHorarioAsignado = async (idDocente) => {
    try {
      setLoading(true);
      const data = await TeachersServices.getHorario(idDocente);
        
      const horarioFormateado = Array.isArray(data)
        ? data.flatMap((clase) =>
            Array.isArray(clase.schedules)
              ? clase.schedules.map((item) => ({
                  area: clase.areaName || "Sin área",  
                  dia: DIAS_DIC[item.weekday] || item.weekday || "Día desconocido",
                  hora_ini: formatTimeToHHMM(item.hourSession?.startTime),
                  hora_fin: formatTimeToHHMM(item.hourSession?.endTime),
                  clase: clase.className || "ASIGNADO",
                }))
              : []
          )
        : [];

      setHorario(horarioFormateado);
    } catch (err) {
      console.error("Error al obtener horario asignado del docente:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    horario,
    loading,
    error,
    cargarHorarioAsignado,
  };
};
