import React from "react";
import { Dia } from "./Dia";
import { Hora } from "./Hora";
import { Curso } from "./Curso";
import { HORAS_INI, HORAS_FIN } from "@/constants/horas";
import { AREA_COLORS } from "@/constants/areaColors";
import { DIAS } from "@/constants/dias";

// Función para verificar cruce de horas entre clase y turno
const hayCruceDeHoras = (horaIniClase, horaFinClase, horaIniTurno, horaFinTurno) => {
  const iniClase = HORAS_INI.indexOf(horaIniClase);
  const finClase = HORAS_FIN.indexOf(horaFinClase);
  const iniTurno = HORAS_INI.indexOf(horaIniTurno);
  const finTurno = HORAS_FIN.indexOf(horaFinTurno);
  return finClase >= iniTurno && iniClase <= finTurno;
};

const TablaTurno = ({
  nombreTurno,
  listaSalones,
  horaInicio,
  horaFin,
  disponibilidad = [],
  handleCeldaClick,
  handleClickDia,
  handleClickHora,
}) => {
  const minIndex = HORAS_INI.indexOf(horaInicio);
  const maxIndex = HORAS_FIN.indexOf(horaFin);

  const getRow = (horaIni) => HORAS_INI.indexOf(horaIni) - minIndex + 2;
  const getRowSpan = (horaIni, horaFin) =>
    HORAS_FIN.indexOf(horaFin) - HORAS_INI.indexOf(horaIni) + 1;
  const getColumn = (dia) => DIAS.indexOf(dia) + 2;

  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{nombreTurno}</h2>
      <div className="grid grid-cols-7 gap-1 bg-white shadow-md rounded-lg p-4 relative">
        <div></div>
        {DIAS.map((dia, index) => (
          <Dia key={index} nombre={dia} onClick={() => handleClickDia(dia)} />
        ))}

        {HORAS_INI.slice(minIndex, maxIndex + 1).map((hora, index) => (
          <Hora
            key={index}
            hora={`${hora} - ${HORAS_FIN[minIndex + index]}`}
            onClick={() =>
              handleClickHora(hora, HORAS_FIN[minIndex + index])
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
                className="rounded-lg cursor-pointer"
                onClick={() => {
                  if (hayCruceDeHoras(hora, horaFin, horaInicio, horaFin)) {
                    handleCeldaClick({
                      dia,
                      hora_ini: hora,
                      hora_fin: horaFin,
                    });
                  } else {
                    alert("Este horario no pertenece al turno actual.");
                  }
                }}
                style={{
                  backgroundColor: estaDisponible ? "#b5e6b5" : "#f4f4f4",
                  gridColumn: i + 2,
                  gridRow: k + 2,
                }}
              />
            );
          })
        )}

        {listaSalones.flatMap((salon) =>
          salon.horas
            .filter((h) =>
              hayCruceDeHoras(h.hora_ini, h.hora_fin, horaInicio, horaFin)
            )
            .map((hora) => (
              <Curso
                key={`${salon.aula}-${hora.dia}-${hora.hora_ini}`}
                clase={{ aula: salon.aula }}
                nombre={salon.aula}
                backgroundColor={AREA_COLORS[salon.area] || "#f4351c"}
                gridColumn={getColumn(hora.dia)}
                gridRow={getRow(hora.hora_ini)}
                gridSpan={getRowSpan(hora.hora_ini, hora.hora_fin)}
              />
            ))
        )}
      </div>
    </div>
  );
};

export const Horarios = ({
  listaSalones = [],
  turno = "",
  disponibilidad = [],
  handleCeldaClick,
  handleClickDia,
  handleClickHora,
}) => {
  return (
    <div className="p-4 space-y-10">
      {turno === "Turno 1" && (
        <TablaTurno
          nombreTurno="Turno 1"
          listaSalones={listaSalones}
          horaInicio="07:00"
          horaFin="12:10"
          disponibilidad={disponibilidad}
          handleCeldaClick={handleCeldaClick}
          handleClickDia={handleClickDia}
          handleClickHora={handleClickHora}
        />
      )}
      {turno === "Turno 2" && (
        <TablaTurno
          nombreTurno="Turno 2"
          listaSalones={listaSalones}
          horaInicio="11:30"
          horaFin="16:40"
          disponibilidad={disponibilidad}
          handleCeldaClick={handleCeldaClick}
          handleClickDia={handleClickDia}
          handleClickHora={handleClickHora}
        />
      )}
      {turno === "Turno 3" && (
        <TablaTurno
          nombreTurno="Turno 3"
          listaSalones={listaSalones}
          horaInicio="16:00"
          horaFin="21:10"
          disponibilidad={disponibilidad}
          handleCeldaClick={handleCeldaClick}
          handleClickDia={handleClickDia}
          handleClickHora={handleClickHora}
        />
      )}
    </div>
  );
};
