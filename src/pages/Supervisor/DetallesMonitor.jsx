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
    <div>
      {/* Sección Horario */}
      <h2 className="text-xl font-semibold text-center mb-4">
        {`Horario del Aula ${aula.aula || "Desconocida"}`}
      </h2>
      <TablaHorarioMonitor horas={horariosRender} />

      {/* Separador */}
      <hr className="my-8 border-t-2 border-gray-300" />

      {/* Sección Directorio */}
      <h2 className="text-xl font-semibold text-center mb-4">
        {`Directorio del Aula ${aula.aula || "Desconocida"}`}
      </h2>
      <Tabla encabezado={["N°", "Curso", "Nombre", "Correo", "Número"]} datos={docentes} />

      {/* Botón Volver */}
      <div className="text-center mt-6">
        <ButtonNegative onClick={volver}>Volver</ButtonNegative>
      </div>
    </div>
  );
};
