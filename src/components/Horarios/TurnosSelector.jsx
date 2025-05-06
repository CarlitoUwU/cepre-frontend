import React, { useState } from "react";
import { HORAS_INI, HORAS_FIN } from "@/constants/horas";
import { DIAS } from "@/constants/dias";
import { Horarios } from "./Horarios.jsx";

export const TurnosSelector = ({
  disponibilidad,
  docente,
  setDisponibilidadDocentes,
  modoEdicion = false,
  horarioAsignado = [],
}) => {
  const [turnoSeleccionado, setTurnoSeleccionado] = useState("Turno 1");

  const turnos = {
    "Turno 1": "07:00 - 12:10",
    "Turno 2": "11:30 - 16:40",
    "Turno 3": "16:00 - 21:10",
  };

  const handleTurnoChange = (turno) => {
    setTurnoSeleccionado(turno);
  };

  const handleCeldaClick = (nuevaCelda) => {
    console.log({ nuevaCelda, disponibilidad });
    const yaMarcada = disponibilidad.some(
      (d) =>
        d.dia === nuevaCelda.dia &&
        d.hora_ini === nuevaCelda.hora_ini &&
        d.hora_fin === nuevaCelda.hora_fin
    );

    const nuevaDisponibilidad = yaMarcada
      ? disponibilidad.filter(
        (d) =>
          !(
            d.dia === nuevaCelda.dia &&
            d.hora_ini === nuevaCelda.hora_ini &&
            d.hora_fin === nuevaCelda.hora_fin
          )
      )
      : [...disponibilidad, nuevaCelda];

    setDisponibilidadDocentes(nuevaDisponibilidad);
  };

  const handleClickDia = (dia) => {
    const celdasDelDia = HORAS_INI.map((hora_ini, i) => ({
      dia,
      hora_ini,
      hora_fin: HORAS_FIN[i],
      idDocente: docente?.id,
    }));
  
    const celdasSeleccionables = celdasDelDia.filter(
      (celda) =>
        !horarioAsignado.some(
          (h) =>
            h.dia === celda.dia &&
            h.hora_ini === celda.hora_ini &&
            h.hora_fin === celda.hora_fin
        )
    );
  
    const todasSeleccionablesMarcadas = celdasSeleccionables.every((celda) =>
      disponibilidad.some(
        (d) =>
          d.dia === celda.dia &&
          d.hora_ini === celda.hora_ini &&
          d.hora_fin === celda.hora_fin
      )
    );
  
    const nuevaDisponibilidad = todasSeleccionablesMarcadas
      ? disponibilidad.filter(
          (d) =>
            !celdasSeleccionables.some(
              (celda) =>
                celda.dia === d.dia &&
                celda.hora_ini === d.hora_ini &&
                celda.hora_fin === d.hora_fin
            )
        )
      : [
          ...disponibilidad,
          ...celdasSeleccionables.filter(
            (celda) =>
              !disponibilidad.some(
                (d) =>
                  d.dia === celda.dia &&
                  d.hora_ini === celda.hora_ini &&
                  d.hora_fin === celda.hora_fin
              )
          ),
        ];
  
    setDisponibilidadDocentes(nuevaDisponibilidad);
  };

  const handleClickHora = (hora_ini, hora_fin) => {
    const celdasDeLaHora = DIAS.map((dia) => ({
      dia,
      hora_ini,
      hora_fin,
      idDocente: docente?.id,
    }));
  
    const celdasSeleccionables = celdasDeLaHora.filter(
      (celda) =>
        !horarioAsignado.some(
          (h) =>
            h.dia === celda.dia &&
            h.hora_ini === celda.hora_ini &&
            h.hora_fin === celda.hora_fin
        )
    );
  
    const todasSeleccionablesMarcadas = celdasSeleccionables.every((celda) =>
      disponibilidad.some(
        (d) =>
          d.dia === celda.dia &&
          d.hora_ini === celda.hora_ini &&
          d.hora_fin === celda.hora_fin
      )
    );
  
    const nuevaDisponibilidad = todasSeleccionablesMarcadas
      ? disponibilidad.filter(
          (d) =>
            !celdasSeleccionables.some(
              (celda) =>
                celda.dia === d.dia &&
                celda.hora_ini === d.hora_ini &&
                celda.hora_fin === d.hora_fin
            )
        )
      : [
          ...disponibilidad,
          ...celdasSeleccionables.filter(
            (celda) =>
              !disponibilidad.some(
                (d) =>
                  d.dia === celda.dia &&
                  d.hora_ini === celda.hora_ini &&
                  d.hora_fin === celda.hora_fin
              )
          ),
        ];
  
    setDisponibilidadDocentes(nuevaDisponibilidad);
  };  

  return (
    <div className="">
      <div className="flex w-full mb-4 gap-2 flex-row justify-center">
        {Object.entries(turnos).map(([turno, horario]) => (
          <button
            key={turno}
            onClick={() => handleTurnoChange(turno)}
            className={`px-4 py-2 rounded-md cursor-pointer select-none transition-all duration-200 shadow 
              ${turnoSeleccionado === turno
                ? "bg-gray-300 text-black font-bold shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {turno}: {horario}
          </button>
        ))}
      </div>

      <Horarios
        turno={turnoSeleccionado}
        disponibilidad={disponibilidad}
        horarioAsignado={horarioAsignado}
        handleCeldaClick={modoEdicion ? handleCeldaClick : null}
        handleClickDia={modoEdicion ? handleClickDia : null}
        handleClickHora={modoEdicion ? handleClickHora : null}
      />
    </div>
  );
};
