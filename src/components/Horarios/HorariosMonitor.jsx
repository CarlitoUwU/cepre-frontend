import React from "react";
import { Dia } from "./Dia";
import { Hora } from "./Hora";
import { Curso } from "./Curso";
import { useIsMobile } from "@/hooks/useIsMobile";
import { HORAS_INI, HORAS_FIN } from "@/constants/horas";
import { DIAS } from "@/constants/dias";
import { useCursos } from "@/hooks/useCursos";

// Este es el nuevo componente basado en la API que mencionaste.
export const HorariosMonitor = ({ horarios = [] }) => {
  const { cursos } = useCursos();
  const isMobile = useIsMobile(1024);

  const dias = DIAS;
  const diasHeader = isMobile ? DIAS.map(dia => dia.charAt(0)) : dias;

  // Agrupar cursos consecutivos, al igual que en el componente anterior
  const agruparCursosConsecutivos = (horarios) => {
    const horariosOrdenados = [...horarios].sort((a, b) => {
      if (a.weekDay !== b.weekDay) return dias.indexOf(a.weekDay) - dias.indexOf(b.weekDay);
      return HORAS_INI.indexOf(a.startTime) - HORAS_INI.indexOf(b.startTime);
    });

    const grupos = [];
    let grupoActual = null;

    horariosOrdenados.forEach((hora) => {
      const esAsignado = !hora.courseName.toUpperCase().includes("SIN ASIGNAR");

      if (!grupoActual) {
        grupoActual = { ...hora };
      } else if (
        grupoActual.weekDay === hora.weekDay &&
        grupoActual.courseName.toUpperCase() === hora.courseName.toUpperCase() &&
        esAsignado &&
        HORAS_FIN.indexOf(grupoActual.endTime) + 1 === HORAS_INI.indexOf(hora.startTime)
      ) {
        // Agrupamos si son consecutivos y son del mismo curso
        grupoActual.endTime = hora.endTime;
      } else {
        grupos.push(grupoActual);
        grupoActual = { ...hora };
      }
    });

    if (grupoActual) {
      grupos.push(grupoActual);
    }

    return grupos;
  };

  const horariosAgrupados = agruparCursosConsecutivos(horarios);

  const horaMinima = horarios.length ? horarios.map((h) => h.startTime).sort()[0] : "07:00";
  const horaMaxima = horarios.length ? horarios.map((h) => h.endTime).sort().at(-1) : "12:10";

  const minIndex = HORAS_INI.indexOf(horaMinima);
  const maxIndex = HORAS_FIN.indexOf(horaMaxima);

  const getRow = (horaIni) => HORAS_INI.indexOf(horaIni) - minIndex + 2;
  const getRowSpan = (horaIni, horaFin) => HORAS_FIN.indexOf(horaFin) - HORAS_INI.indexOf(horaIni) + 1;
  const getColumn = (dia) => dias.indexOf(dia) + 2;

  // Modificación aquí: solo se muestra el color del curso si tiene docente asignado
  const getColor = (curso) => {
    const cursoEncontrado = cursos.find(
      c => c.name.toUpperCase() === curso.toUpperCase()
    );

    if (cursoEncontrado && !curso.toUpperCase().includes("SIN ASIGNAR")) {
      return cursoEncontrado.color; // Si tiene docente asignado, usamos su color
    }

    return "#f4f0f0"; // Gris para "sin asignar"
  };

  const acortarNombreCurso = (nombre) => {
    if (!isMobile) return nombre;

    const nombreSinTildes = nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const palabras = nombreSinTildes.trim().split(" ");

    if (palabras.length === 1) {
      return palabras[0].slice(0, 3).toUpperCase().split("").join("\n");
    }

    return palabras.map(p => p[0]?.toUpperCase()).join("\n");
  };

  return (
    <div className="grid grid-cols-7 gap-1 bg-white shadow-md rounded-lg p-4">
      <div></div>

      {diasHeader.map((dia, index) => (
        <Dia key={index} nombre={dia} />
      ))}

      {HORAS_INI.slice(minIndex, maxIndex + 1).map((hora, index) => (
        <Hora key={index} hora={`${hora} - ${HORAS_FIN[minIndex + index]}`} />
      ))}

      {dias.flatMap((_, i) =>
        HORAS_INI.slice(minIndex, maxIndex + 1).map((_, k) => (
          <div
            key={`${i}-${k}`}
            className="rounded-lg"
            style={{
              backgroundColor: "#f4f0fb", // Fondo general
              borderRadius: ".2vw",
              gridColumn: i + 2,
              gridRow: k + 2,
              color: "#000",
              minHeight: "3rem",
            }}
          ></div>
        ))
      )}

      {horariosAgrupados.map((hora) => (
        <Curso
          key={`${hora.weekDay}-${hora.startTime}-${hora.endTime}`}
          nombre={acortarNombreCurso(hora.courseName)}
          backgroundColor={getColor(hora.courseName)} // Aquí usamos la función getColor modificada
          gridColumn={getColumn(hora.weekDay)}
          gridRow={getRow(hora.startTime)}
          gridSpan={getRowSpan(hora.startTime, hora.endTime)}
          style={{ minHeight: "6rem" }}
        />
      ))}
    </div>
  );
};
