import React from "react";
import { Dia } from "./Dia";
import { Hora } from "./Hora";
import { Curso } from "./Curso";
import { HORAS_INI, HORAS_FIN } from "@/constants/horas";
import { AREA_COLORS } from "@/constants/areaColors";
import { DIAS } from "@/constants/dias";

const TablaTurno = ({
  nombreTurno,
  listaSalones,
  setClaseSeleccionada,
  horaInicio,
  horaFin,
  disponibilidad = [],
}) => {
  const minIndex = HORAS_INI.indexOf(horaInicio);
  const maxIndex = HORAS_FIN.indexOf(horaFin);

  const getRow = (horaIni) => HORAS_INI.indexOf(horaIni) - minIndex + 2;
  const getRowSpan = (horaIni, horaFin) =>
    HORAS_FIN.indexOf(horaFin) - HORAS_INI.indexOf(horaIni) + 1;
  const getColumn = (dia) => DIAS.indexOf(dia) + 2;

  // Función para pintar las celdas según el turno
  const pintarPorTurnos = (horaIni, horaFin) => {
    const turnos = [
      { nombre: "Turno 1", inicio: "07:00", fin: "12:10" },
      { nombre: "Turno 2", inicio: "11:30", fin: "16:40" },
      { nombre: "Turno 3", inicio: "16:00", fin: "21:10" },
    ];

    const celdasPintadas = [];

    turnos.forEach((turno) => {
      const inicioTurno = Math.max(horaIni, turno.inicio);
      const finTurno = Math.min(horaFin, turno.fin);

      if (inicioTurno < finTurno) {
        celdasPintadas.push(
          <div
            key={turno.nombre}
            className="rounded-lg"
            style={{
              backgroundColor: "#b5e6b5", // verde claro
              gridColumn: getColumn(dia),
              gridRow: getRow(inicioTurno),
              gridRowEnd: `span ${getRowSpan(inicioTurno, finTurno)}`,
            }}
          />
        );
      }
    });

    return celdasPintadas;
  };

  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{nombreTurno}</h2>
      <div className="grid grid-cols-7 gap-1 bg-white shadow-md rounded-lg p-4 relative">
        <div></div>
        {DIAS.map((dia, index) => (
          <Dia key={index} nombre={dia} />
        ))}

        {HORAS_INI.slice(minIndex, maxIndex + 1).map((hora, index) => (
          <Hora key={index} hora={`${hora} - ${HORAS_FIN[minIndex + index]}`} />
        ))}

        {/* Pintar todas las celdas grises */}
        {DIAS.flatMap((_, i) =>
          HORAS_INI.slice(minIndex, maxIndex + 1).map((_, k) => (
            <div
              key={`bg-${i}-${k}`}
              className="rounded-lg"
              style={{
                backgroundColor: "#f4f4f4",
                gridColumn: i + 2,
                gridRow: k + 2,
              }}
            />
          ))
        )}

        {/* Pintar disponibilidad del docente */}
        {disponibilidad
          .filter(
            (disp) =>
              HORAS_INI.indexOf(disp.hora_ini) >= minIndex &&
              HORAS_FIN.indexOf(disp.hora_fin) <= maxIndex &&
              DIAS.includes(disp.dia)
          )
          .map((disp, index) => (
            <div
              key={`disp-${index}`}
              className="rounded-lg"
              style={{
                backgroundColor: "#b5e6b5", // verde claro
                gridColumn: getColumn(disp.dia),
                gridRow: getRow(disp.hora_ini),
                gridRowEnd: `span ${getRowSpan(disp.hora_ini, disp.hora_fin)}`,
              }}
            />
          ))}

        {/* Pintar los turnos correspondientes */}
        {DIAS.flatMap((dia, i) =>
          HORAS_INI.slice(minIndex, maxIndex + 1).map((hora) =>
            pintarPorTurnos(hora, HORAS_FIN[minIndex + i])
          )
        )}

        {/* Pintar clases reales */}
        {listaSalones.flatMap((salon) =>
          salon.horas
            .filter(
              (h) =>
                HORAS_INI.indexOf(h.hora_ini) >= minIndex &&
                HORAS_FIN.indexOf(h.hora_fin) <= maxIndex
            )
            .map((hora) => (
              <Curso
                key={`${salon.aula}-${hora.dia}-${hora.hora_ini}`}
                clase={{
                  aula: salon.aula,
                  monitor: salon.monitor,
                  area: salon.area,
                  numHoras: salon.numHoras,
                  enlace: salon.enlace,
                }}
                nombre={salon.aula}
                backgroundColor={AREA_COLORS[salon.area] || "#f4351c"}
                gridColumn={getColumn(hora.dia)}
                gridRow={getRow(hora.hora_ini)}
                gridSpan={getRowSpan(hora.hora_ini, hora.hora_fin)}
                setClaseSeleccionada={setClaseSeleccionada}
              />
            ))
        )}
      </div>
    </div>
  );
};

export const Horarios = ({
  listaSalones = [],
  setClaseSeleccionada = () => { },
  turno = "",
  disponibilidad = [],
}) => {
  return (
    <div className="p-4 space-y-10">
      {turno === "Turno 1" && (
        <TablaTurno
          listaSalones={listaSalones}
          setClaseSeleccionada={setClaseSeleccionada}
          horaInicio="07:00"
          horaFin="12:10"
          disponibilidad={disponibilidad}
        />
      )}
      {turno === "Turno 2" && (
        <TablaTurno
          listaSalones={listaSalones}
          setClaseSeleccionada={setClaseSeleccionada}
          horaInicio="11:30"
          horaFin="16:40"
          disponibilidad={disponibilidad}
        />
      )}
      {turno === "Turno 3" && (
        <TablaTurno
          listaSalones={listaSalones}
          setClaseSeleccionada={setClaseSeleccionada}
          horaInicio="16:00"
          horaFin="21:10"
          disponibilidad={disponibilidad}
        />
      )}
    </div>
  );
};
