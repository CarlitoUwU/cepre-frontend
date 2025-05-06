import React, { useState, useEffect, useCallback } from "react";
import { DIAS_DIC } from "@/constants/dias";
import { TeachersServices } from "@/services/TeachersServices";
import { formatTimeToHHMM } from "@/utils/formatTime";
import { SchedulesService } from "@/services/SchedulesServices";

export const useHorarioAsignadoDocente = ({ idDocente }) => {
  const [horario, setHorario] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para recargar el horario
  const refetch = useCallback(async () => {
    if (!idDocente) return;
    try {
      setLoading(true);
      const data = await TeachersServices.getHorario(idDocente);

      const horarioFormateado = Array.isArray(data)
        ? data.flatMap((clase) =>
          Array.isArray(clase.schedules)
            ? clase.schedules.map((item) => ({
              id: clase.classId,
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
  }, [idDocente]);


  const desasignarClaseMutation = async ({ teacherId, classId }) => {
    try {
      const request = await SchedulesService.desasignarSchedulesByTeacherClass({ teacherId, classId });
      if (request) {
        await refetch(); // Actualiza el horario desde el servidor
      }
    } catch (err) {
      console.error("Error al desasignar clase:", err);
    }
  };

  // Llama automáticamente cuando el idDocente cambia
  useEffect(() => {
    refetch();
  }, [idDocente, refetch]);

  return {
    horario,
    loading,
    error,
    desasignarClaseMutation,
    refetch, // Agrega refetch al retorno
  };
};
