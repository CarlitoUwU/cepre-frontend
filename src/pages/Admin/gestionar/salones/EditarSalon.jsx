import React, { useEffect, useState } from "react";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { useClases } from "@/hooks/useClases";
import { useInfoClases } from "@/hooks/useInfoClases";
import { Horarios } from "@/components/Horarios/Horarios";

export const EditarSalon = ({ idSalon, regresar }) => {
  const { clases } = useClases();
  const { schedules: infoClases, teachers, loading } = useInfoClases(idSalon);


  const salon = clases ? clases.find((a) => a.id === idSalon) : null;
  const nombreAula = salon ? salon.name : "Aula no encontrada";
  const turno = salon?.shift;
  const turnoOriginal = turno?.name ? turno.name : "Turno no disponible";
  const turnoNormalizado = turnoOriginal.replace(/0?([1-3])$/, "$1");

  const turnos = {
    "Turno 1": { inicio: "07:00", fin: "12:10" },
    "Turno 2": { inicio: "11:30", fin: "16:40" },
    "Turno 3": { inicio: "16:00", fin: "21:10" },
  };

  const rango = turnos[turnoNormalizado];
  const [horariosSalon, setHorariosSalon] = useState([]);

  useEffect(() => {
    if (!loading) {
      console.log("📅 Horarios del salón:", infoClases);
      console.log("👨‍🏫 Docentes asignados:", teachers);
    }
  }, [infoClases, teachers, loading]);

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  return (
    <div className="p-4 space-y-2 flex flex-col items-center justify-center max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Modificación de Aula: {nombreAula}</h2>
        <h3 className="text-xl font-semibold">Turno del Aula: {turnoOriginal}</h3>
        {rango && <p>Horario: {rango.inicio} - {rango.fin}</p>}
      </div>

      {rango ? (
        <Horarios
          listaSalones={[
            {
              aula: nombreAula,
              horas: horariosSalon,
              monitor: null,
              area: "General",
              numHoras: horariosSalon.length,
              enlace: "",
            },
          ]}
          setClaseSeleccionada={() => {}}
          turno={turnoNormalizado}
        />
      ) : (
        <p className="text-center text-red-500">Turno inválido o no definido.</p>
      )}

      <div className="mt-4 flex justify-center">
        <ButtonNegative onClick={regresar}>Atrás</ButtonNegative>
      </div>
    </div>
  );
};
