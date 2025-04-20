import React from "react";
import { Dia } from "./Dia";
import { Hora } from "./Hora";
import { Curso } from "./Curso";
import { HORAS_INI, HORAS_FIN } from "@/constants/horas";
import { DIAS } from "@/constants/dias";

const TablaTurnoMonitor = ({
  nombreTurno,
  listaSalones,
  setClaseSeleccionada,
  horaInicio,
  horaFin,
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
              backgroundColor: "#e2e8f0",
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

        {/* Pintar los turnos correspondientes */}
        {DIAS.flatMap((dia, i) =>
          HORAS_INI.slice(minIndex, maxIndex + 1).map((hora) =>
            pintarPorTurnos(hora, HORAS_FIN[minIndex + i])
          )
        )}

        {/* Pintar asignaciones de salones/monitores */}
        {listaSalones.flatMap((salon) =>
          agruparHoras(
            salon.horas.filter(
              (h) =>
                HORAS_INI.indexOf(h.hora_ini) >= minIndex &&
                HORAS_FIN.indexOf(h.hora_fin) <= maxIndex
            )
          ).map((hora) => {
              const tieneDocente = !!salon.docente;
              const colorFondo = tieneDocente ? salon.color : "#393b3d";

              return (
                <Curso
                  key={`${salon.aula}-${hora.dia}-${hora.hora_ini}`}
                  clase={{
                    aula: salon.aula,
                    docente: salon.docente,
                    numHoras: salon.numHoras,
                    enlace: salon.enlace,
                  }}
                  nombre={
                    tieneDocente
                      ? hora?.curso?.toUpperCase()
                      : hora?.curso // sin modificar si no hay docente
                  }
                  backgroundColor={colorFondo}
                  gridColumn={getColumn(hora.dia)}
                  gridRow={getRow(hora.hora_ini)}
                  gridSpan={getRowSpan(hora.hora_ini, hora.hora_fin)}
                  setClaseSeleccionada={setClaseSeleccionada}
                />
              );
            })
        )}

      </div>
    </div>
  );
};

export const HorariosMonitor = ({
  listaSalones = [],
  setClaseSeleccionada = () => { },
  turno = "",
}) => {
  return (
    <div className="p-4 space-y-10">
      {turno === "Turno 1" && (
        <TablaTurnoMonitor
          listaSalones={listaSalones}
          setClaseSeleccionada={setClaseSeleccionada}
          horaInicio="07:00"
          horaFin="12:10"
        />
      )}
      {turno === "Turno 2" && (
        <TablaTurnoMonitor
          listaSalones={listaSalones}
          setClaseSeleccionada={setClaseSeleccionada}
          horaInicio="11:30"
          horaFin="16:40"
        />
      )}
      {turno === "Turno 3" && (
        <TablaTurnoMonitor
          listaSalones={listaSalones}
          setClaseSeleccionada={setClaseSeleccionada}
          horaInicio="16:00"
          horaFin="21:10"
        />
      )}
    </div>
  );
};