import { Dia } from "./Dia";
import { Hora } from "./Hora";
import { Curso } from "./Curso";
import React from "react";
import { useIsMobile } from '@/hooks/useIsMobile';
import { HORAS_INI, HORAS_FIN } from '@/constants/horas';
import { DIAS } from "@/constants/dias";
import { useCursos } from "@/hooks/useCursos";

export const TablaHorarioMonitor = ({ horas = [] }) => {
  const { cursos } = useCursos();
  const isMobile = useIsMobile(1024);

  const dias = DIAS;
  const diasHeader = isMobile ? DIAS.map(dia => dia.charAt(0)) : dias;

  const agruparCursosConsecutivos = (horas) => {
    const horasOrdenadas = [...horas].sort((a, b) => {
      if (a.dia !== b.dia) return dias.indexOf(a.dia) - dias.indexOf(b.dia);
      return HORAS_INI.indexOf(a.hora_ini) - HORAS_INI.indexOf(b.hora_ini);
    });

    const grupos = [];
    let grupoActual = null;

    horasOrdenadas.forEach((hora) => {
      const esAsignado = !hora.curso.toUpperCase().includes("SIN ASIGNAR"); // ⚡ Solo agrupa si NO es "SIN ASIGNAR"

      if (!grupoActual) {
        grupoActual = { ...hora };
      } else if (
        grupoActual.dia === hora.dia &&
        (grupoActual.curso.toUpperCase() === hora.curso.toUpperCase()) && // Mismo curso
        esAsignado && // ⚡ Solo si es un curso asignado (no "SIN ASIGNAR")
        HORAS_FIN.indexOf(grupoActual.hora_fin) + 1 === HORAS_INI.indexOf(hora.hora_ini) // Horas consecutivas
      ) {
        // Son consecutivos y mismo curso (y no es "SIN ASIGNAR") → expandir el grupo
        grupoActual.hora_fin = hora.hora_fin;
      } else {
        // No cumple las condiciones → cerrar grupo actual y empezar nuevo
        grupos.push(grupoActual);
        grupoActual = { ...hora };
      }
    });

    if (grupoActual) {
      grupos.push(grupoActual);
    }

    return grupos;
  };

  const horasAgrupadas = agruparCursosConsecutivos(horas);

  const horaMinima = horas.length ? horas.map((h) => h.hora_ini).sort()[0] : "07:00";
  const horaMaxima = horas.length ? horas.map((h) => h.hora_fin).sort().at(-1) : "12:10";

  const minIndex = HORAS_INI.indexOf(horaMinima);
  const maxIndex = HORAS_FIN.indexOf(horaMaxima);

  const getRow = (horaIni) => HORAS_INI.indexOf(horaIni) - minIndex + 2;
  const getRowSpan = (horaIni, horaFin) => HORAS_FIN.indexOf(horaFin) - HORAS_INI.indexOf(horaIni) + 1;
  const getColumn = (dia) => dias.indexOf(dia) + 2;

  const getColor = (curso) => {
    return cursos.find(
      c => c.name.toUpperCase() === curso.toUpperCase()
    )?.color || "#31A8E3";
  }

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
              backgroundColor: "#f4f0fb",
              borderRadius: ".2vw",
              gridColumn: i + 2,
              gridRow: k + 2,
              color: "#000",
              minHeight: "3rem",
            }}
          ></div>
        ))
      )}

      {horasAgrupadas.map((hora) => (
        <Curso
          key={`${hora.dia}-${hora.hora_ini}-${hora.hora_fin}`}
          nombre={acortarNombreCurso(hora.curso)}
          backgroundColor={getColor(hora.curso)}
          gridColumn={getColumn(hora.dia)}
          gridRow={getRow(hora.hora_ini)}
          gridSpan={getRowSpan(hora.hora_ini, hora.hora_fin)}
          style={{ minHeight: "6rem" }}
        />
      ))}
    </div>
  );
};