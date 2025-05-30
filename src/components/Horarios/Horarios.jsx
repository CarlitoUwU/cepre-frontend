import React from "react";
import { Dia } from "./Dia";
import { Hora } from "./Hora";
import { Curso } from "./Curso";
import { HORAS_INI, HORAS_FIN } from "@/constants/horas";
import { AREA_COLORS } from "@/constants/areaColors";
import { DIAS } from "@/constants/dias";

const COLORS_CELDAS = {
  "PERTENECE": "#b5e6b5",
  "NO_PERTENECE": "#f4f4f4",
}

// Función para verificar cruce de horas entre clase y turno
const hayCruceDeHoras = (horaIniClase, horaFinClase, horaIniTurno, horaFinTurno) => {
  const iniClase = HORAS_INI.indexOf(horaIniClase);
  const finClase = HORAS_FIN.indexOf(horaFinClase);
  const iniTurno = HORAS_INI.indexOf(horaIniTurno);
  const finTurno = HORAS_FIN.indexOf(horaFinTurno);
  return finClase >= iniTurno && iniClase <= finTurno;
};

function esHora2AntesQueHora1(hora1, hora2) {
  const [h1, m1] = hora1.split(":").map(Number);
  const [h2, m2] = hora2.split(":").map(Number);

  const minutos1 = h1 * 60 + m1;
  const minutos2 = h2 * 60 + m2;

  return minutos2 < minutos1;
}

function compararTurnoYSalon(turno, salon) {
  const turnoDigito = turno.substring(turno.length - 1); // último carácter
  const salonDigito = salon.substring(2, 3); // primer dígito después de "I-"

  return turnoDigito === salonDigito;
}

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
      grupoActual.clase === hora.clase &&
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


const TablaTurno = ({
  nombreTurno,
  horarioAsignado = [],
  horaInicio,
  horaFin,
  disponibilidad = [],
  handleCeldaClick,
  handleClickDia,
  handleClickHora,
}) => {
  const minIndex = HORAS_INI.indexOf(horaInicio);
  const maxIndex = HORAS_FIN.indexOf(horaFin);

  const horasTurno = horarioAsignado.filter(
    (hora) => esHora2AntesQueHora1(horaFin, hora.hora_ini) &&
      esHora2AntesQueHora1(hora.hora_fin, horaInicio) && compararTurnoYSalon(nombreTurno, hora.clase));

  const horasAgrupadas = agruparHoras(horasTurno);

  const getRow = (horaIni) => HORAS_INI.indexOf(horaIni) - minIndex + 2;
  const getRowSpan = (horaIni, horaFin) =>
    HORAS_FIN.indexOf(horaFin) - HORAS_INI.indexOf(horaIni) + 1;
  const getColumn = (dia) => DIAS.indexOf(dia) + 2;

  return (
    <div className="grid grid-cols-7 gap-1 bg-white shadow-md rounded-lg p-4 relative w-full">
      <div></div>
      {DIAS.map((dia, index) => (
        <Dia key={index} nombre={dia} onClick={handleClickDia ? () => handleClickDia(dia) : null} clickable={handleClickDia ? true : false} />
      ))}

      {HORAS_INI.slice(minIndex, maxIndex + 1).map((hora, index) => (
        <Hora
          key={index}
          hora={`${hora} - ${HORAS_FIN[minIndex + index]}`}
          onClick={handleClickHora ? () =>
            handleClickHora?.(hora, HORAS_FIN[minIndex + index]) : null
          }
        />
      ))}

      {DIAS.flatMap((dia, i) =>
        HORAS_INI.slice(minIndex, maxIndex + 1).map((hora, k) => {
          const horaIndex = HORAS_INI.indexOf(hora);
          const horaFin = HORAS_FIN[horaIndex];

          const estaDisponible = disponibilidad.some(
            (d) => d.dia === dia && d.hora_ini === hora && d.hora_fin === horaFin
          );

          return (
            <div
              key={`bg-${dia}-${hora}`}
              className={`rounded-lg ${handleCeldaClick ? 'cursor-pointer' : ''}`}
              onClick={() => {
                if (hayCruceDeHoras(hora, horaFin, horaInicio, horaFin)) {
                  handleCeldaClick?.({
                    dia,
                    hora_ini: hora,
                    hora_fin: horaFin,
                  });
                } else {
                  alert("Este horario no pertenece al turno actual.");
                }
              }}
              style={{
                backgroundColor: estaDisponible ? COLORS_CELDAS.PERTENECE : COLORS_CELDAS.NO_PERTENECE,
                gridColumn: i + 2,
                gridRow: k + 2,
              }}
            />
          );
        })
      )}

      {horasAgrupadas?.map((hora) => {
        return (
          <Curso
            key={`${hora.dia}-${hora.hora_ini}-${hora.hora_fin}`}
            nombre={hora.clase}
            backgroundColor={AREA_COLORS[hora.area] || "#f4351c"} // Asegúrate de que `area` es el correcto
            gridColumn={getColumn(hora.dia)}
            gridRow={getRow(hora.hora_ini)}
            gridSpan={getRowSpan(hora.hora_ini, hora.hora_fin)}
          />
        );
      })}
    </div>
  );
};

export const Horarios = ({
  turno = "",
  disponibilidad = [],
  horarioAsignado = [],
  handleCeldaClick,
  handleClickDia,
  handleClickHora,
}) => {
  return (
    <div className="p-4 space-y-10">
      {turno === "Turno 1" && (
        <TablaTurno
          nombreTurno="Turno 01"
          horaInicio="07:00"
          horaFin="12:10"
          horarioAsignado={horarioAsignado}
          disponibilidad={disponibilidad}
          handleCeldaClick={handleCeldaClick}
          handleClickDia={handleClickDia}
          handleClickHora={handleClickHora}
        />
      )}
      {turno === "Turno 2" && (
        <TablaTurno
          nombreTurno="Turno 02"
          horaInicio="11:30"
          horaFin="16:40"
          horarioAsignado={horarioAsignado}
          disponibilidad={disponibilidad}
          handleCeldaClick={handleCeldaClick}
          handleClickDia={handleClickDia}
          handleClickHora={handleClickHora}
        />
      )}
      {turno === "Turno 3" && (
        <TablaTurno
          nombreTurno="Turno 03"
          horaInicio="16:00"
          horaFin="21:10"
          horarioAsignado={horarioAsignado}
          disponibilidad={disponibilidad}
          handleCeldaClick={handleCeldaClick}
          handleClickDia={handleClickDia}
          handleClickHora={handleClickHora}
        />
      )}
    </div>
  );
};