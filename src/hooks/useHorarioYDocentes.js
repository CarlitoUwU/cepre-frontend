import { useQuery } from "@tanstack/react-query";
import { MonitorsServices } from "@/services/MonitorsServices";
import { DIAS_DIC } from "@/constants/dias";
import { formatTimeToHHMM } from "@/utils/formatTime";

const fetchHorarioYDocentes = async (salonId) => {
  const [horarioData, docentesData] = await Promise.all([
    MonitorsServices.cargarHorario(salonId),
    MonitorsServices.cargarDocentes(salonId),
  ]);

  const docentes = docentesData.map((docente) => ({
    curso: docente.courseName || "Curso desconocido",
    docente: `${docente.firstName || "Nombre"} ${docente.lastName || "Desconocido"}`,
    correo: docente.email || "Sin correo",
    telefono: docente.phone || "Sin número",
  }));

  const horario = horarioData.map((hora) => {
    const profe = docentes.find((doc) => doc.curso === hora.courseName);
    return {
      dia: DIAS_DIC[hora.weekday] || "Día desconocido",
      hora_ini: formatTimeToHHMM(hora.startTime),
      hora_fin: formatTimeToHHMM(hora.endTime),
      curso: hora.courseName || "Curso desconocido",
      docente: profe?.docente || "Por asignar",
    };
  });

  return { horario, docentes };
};

export const useHorarioYDocentes = (salonId) => {
  return useQuery({
    queryKey: ["horarioDocentes", salonId],
    queryFn: () => fetchHorarioYDocentes(salonId),
    enabled: !!salonId,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
