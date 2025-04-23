import React from "react";
import { Dia } from "./Dia";
import { Hora } from "./Hora";
import { Curso } from "./Curso";
import { useCursos } from "@/hooks/useCursos";
import { HORAS_INI, HORAS_FIN } from "@/constants/horas";
import { DIAS } from "@/constants/dias";

const TURNOS = {
  "Turno 01": { inicio: "07:00", fin: "12:10" },
  "Turno 02": { inicio: "11:30", fin: "16:40" },
  "Turno 03": { inicio: "16:00", fin: "21:10" },
};

const COLOR_SIN_ASIGNAR = "#393b3d"; // Color para asignaciones sin docente

const agruparHoras = (horas) => {
  const horasOrdenadas = [...horas].sort((a, b) => {
    if (a.dia !== b.dia) return DIAS.indexOf(a.dia) - DIAS.indexOf(b.dia);
    return HORAS_INI.indexOf(a.hora_ini) - HORAS_INI.indexOf(b.hora_ini);
  });

  const grupos = [];
  let grupoActual = null;

  horasOrdenadas.forEach((hora) => {
    if (
      grupoActual &&
      grupoActual.dia === hora.dia &&
      grupoActual.curso === hora.curso &&
      HORAS_FIN.indexOf(grupoActual.hora_fin) + 1 === HORAS_INI.indexOf(hora.hora_ini)
    ) {
      // Agrupar si es misma asignatura y hora consecutiva
      grupoActual.hora_fin = hora.hora_fin;
    } else {
      if (grupoActual) grupos.push(grupoActual);
      grupoActual = { ...hora };
    }
  });

  if (grupoActual) grupos.push(grupoActual);
  return grupos;
};

export const HorariosMonitor = ({ aula, cursosConDocente, horas = [], turno = "" }) => {
  const horasAgrupadas = agruparHoras(horas);

  const { cursos } = useCursos();
  const horaInicio = TURNOS[turno]?.inicio || "07:00";
  const horaFin = TURNOS[turno]?.fin || "12:10";
  const minIndex = HORAS_INI.indexOf(horaInicio);
  const maxIndex = HORAS_FIN.indexOf(horaFin);

  const getRow = (horaIni) => HORAS_INI.indexOf(horaIni) - minIndex + 2;
  const getRowSpan = (horaIni, horaFin) => HORAS_FIN.indexOf(horaFin) - HORAS_INI.indexOf(horaIni) + 1;
  const getColumn = (dia) => DIAS.indexOf(dia) + 2;

  //Colores de curso
  const getColor = (curso = []) => {
    return cursos?.find(
      c => c.name.toUpperCase() === curso?.toUpperCase()
    )?.color || "#31A8E3";
  }

  return (
    <div className="mb-12">
      <div className="grid grid-cols-7 gap-1 bg-white shadow-md rounded-lg p-4 relative">
        <div></div>
        {/* Pintar los días de la semana en la parte superior */}
        {DIAS.map((dia, index) => (
          <Dia key={index} nombre={dia} />
        ))}

        {/* Pintar todas las horas */}
        {HORAS_INI.slice(minIndex, maxIndex + 1).map((hora, index) => (
          <Hora key={index} hora={`${hora} - ${HORAS_FIN[minIndex + index]}`} />
        ))}

        {/* Pintar todas las celdas grises claras */}
        {DIAS.flatMap((_, i) =>
          HORAS_INI.slice(minIndex, maxIndex + 1).map((_, k) => (
            <div
              key={`bg-${i}-${k}`}
              className="rounded-lg"
              style={{
                backgroundColor: "#f8fafc",
                gridColumn: i + 2,
                gridRow: k + 2,
              }}
            />
          ))
        )}

        {/* Pintar asignaciones de salones/monitores */}
        {horasAgrupadas?.map((hora) => {
          const tieneDocente = cursosConDocente?.some((curso) => {
            return curso?.toUpperCase() === hora.curso?.toUpperCase();
          });

          const colorFondo = tieneDocente ? getColor(hora?.curso) : COLOR_SIN_ASIGNAR;

          return (
            <Curso
              key={`${aula}-${hora.dia}-${hora.hora_ini}`}
              nombre={hora?.curso?.toUpperCase()}
              backgroundColor={colorFondo}
              gridColumn={getColumn(hora.dia)}
              gridRow={getRow(hora.hora_ini)}
              gridSpan={getRowSpan(hora.hora_ini, hora.hora_fin)}
              style={{ "font-size": "0.8rem" }}
            />
          );
        })}
      </div>
    </div>
  );
};
