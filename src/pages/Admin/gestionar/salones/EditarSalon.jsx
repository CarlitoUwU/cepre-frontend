import React from "react";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { useClases } from "@/hooks/useClases";
import { Horarios } from "@/components/Horarios/Horarios.jsx";

export const EditarSalon = ({ idSalon, regresar }) => {
  const { clases } = useClases();

  const salon = clases ? clases.find((a) => a.id === idSalon) : null;
  const nombreAula = salon ? salon.name : "Aula no encontrada";
  const turno = salon?.shift;
  const turnoOriginal = turno?.name ?? "Turno no disponible";

  // Normalizamos el turno (ej. "Turno 02" -> "Turno 2")
  const turnoNormalizado = turnoOriginal.replace(/0?([1-3])$/, "$1");

  // Mapeo de turnos y sus horarios
  const turnos = {
    "Turno 1": { inicio: "07:00", fin: "12:10" },
    "Turno 2": { inicio: "11:30", fin: "16:40" },
    "Turno 3": { inicio: "16:00", fin: "21:10" },
  };

  const rango = turnos[turnoNormalizado];

  return (
    <div className="p-4 space-y-2 flex flex-col items-center justify-center max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Modificación de Aula: {nombreAula}</h2>
        <h3 className="text-xl font-semibold">Turno del Aula: {turnoOriginal}</h3>
        {rango && <p>Horario: {rango.inicio} - {rango.fin}</p>}
      </div>

      {/* Tabla de horarios en blanco con el turno correcto */}
      {rango ? (
        <Horarios
          listaSalones={[
            {
              aula: nombreAula,
              horas: [],
              monitor: null,
              area: "General",
              numHoras: 0,
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
