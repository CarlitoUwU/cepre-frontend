import React, { useEffect, useState, useMemo } from "react";
import { TablaHorarioMonitor } from "@/components/Horarios/indexMonitor";
import { Tabla } from "@/components/ui/Tabla";
import { MonitorsServices } from "@/services/MonitorsServices";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { DIAS_DIC } from "@/constants/dias";
import { formatTimeToHHMM } from "@/utils/formatTime";

export const DetallesMonitor = ({ aula = {}, volver = () => {} }) => {
  const [horario, setHorario] = useState([]);
  const [docentes, setDocentes] = useState([]);

  useEffect(() => {
    if (!aula || !aula.id) return;

    const fetchHorarioData = async (salonId) => {
      try {
        const horarioData = await MonitorsServices.cargarHorario(salonId);
        if (Array.isArray(horarioData)) {
          setHorario(
            horarioData.map((hora) => ({
              dia: DIAS_DIC[hora.weekday] || "Día desconocido",
              hora_ini: formatTimeToHHMM(hora.startTime),
              hora_fin: formatTimeToHHMM(hora.endTime),
              curso: hora.courseName || "Curso desconocido",
            }))
          );
        } else {
          console.error("Respuesta inválida de la API (horario):", horarioData);
        }
      } catch (error) {
        console.error("Error al obtener horarios:", error);
      }
    };

    const fetchDocentesData = async (salonId) => {
      try {
        const docentesData = await MonitorsServices.cargarDocentes(salonId);
        if (Array.isArray(docentesData)) {
          setDocentes(
            docentesData.map((docente, index) => [
              index + 1,
              docente.courseName || "Curso desconocido",
              `${docente.firstName || "Nombre"} ${docente.lastName || "Desconocido"}`,
              docente.email || "Sin correo",
              docente.phoneNumber || "Sin número",
            ])
          );
        } else {
          console.error("Respuesta inválida de la API (docentes):", docentesData);
        }
      } catch (error) {
        console.error("Error al obtener docentes:", error);
      }
    };

    fetchHorarioData(aula.id);
    fetchDocentesData(aula.id);
  }, [aula]);

  const horariosRender = useMemo(() => horario, [horario]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 text-sm">

      {/* Directorio del Aula (Izquierda - menos ancho) */}
      <div className="md:col-span-2 flex flex-col items-center mb-4 md:mb-0">
      <h2 className="text-lg font-semibold text-center mb-4">
          {`Directorio`}
        </h2>
        <div className="w-full max-w-[100%]">
          <Tabla encabezado={["N°", "Curso", "Nombre", "Correo", "Número"]} datos={docentes} />
        </div>
      </div>

      {/* Horario del Aula (Derecha - más ancho) */}
      <div className="md:col-span-3 flex flex-col items-center">
      <h2 className="text-lg font-semibold text-center mb-4">
          {`Horario`}
        </h2>
        <div className="w-full max-w-[95%]">
          <TablaHorarioMonitor horas={horariosRender} />
        </div>

        {/* Botón Volver */}
        <div className="mt-6 text-center">
          <ButtonNegative onClick={volver}>Volver</ButtonNegative>
        </div>
      </div>

    </div>
  );
};
