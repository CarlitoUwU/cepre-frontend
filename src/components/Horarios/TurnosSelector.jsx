import React, { useState } from "react";
import { HORAS_INI, HORAS_FIN } from "@/constants/horas";
import { DIAS } from "@/constants/dias"
import { Horarios } from "./Horarios.jsx";

export const TurnosSelector = ({
  listaSalones,
  setClaseSeleccionada,
  disponibilidad,
  idDocente,
  setDisponibilidadDocentes,
  modoEdicion = false, // recibimos el flag
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
    console.log({nuevaCelda, disponibilidad})
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
    // Generar todas las celdas del día
    const celdasDelDia = HORAS_INI.map((hora_ini, i) => ({
      dia,
      hora_ini,
      hora_fin: HORAS_FIN[i],
      idDocente,
    }));
  
    // Verificar si todas las celdas del día ya están marcadas
    const todasMarcadas = celdasDelDia.every((celda) =>
      disponibilidad.some(
        (d) =>
          d.dia === celda.dia &&
          d.hora_ini === celda.hora_ini &&
          d.hora_fin === celda.hora_fin
      )
    );
  
    // Nueva disponibilidad dependiendo de si estaban todas o no
    const nuevaDisponibilidad = todasMarcadas
      ? disponibilidad.filter(
          (d) => d.dia !== dia
        )
      : [...disponibilidad, ...celdasDelDia.filter(celda =>
          !disponibilidad.some(
            (d) =>
              d.dia === celda.dia &&
              d.hora_ini === celda.hora_ini &&
              d.hora_fin === celda.hora_fin
          )
        )];
  
    setDisponibilidadDocentes(nuevaDisponibilidad);
    console.log("Click en día:", dia);
  };

  const handleClickHora = (hora_ini, hora_fin) => {
    // Generar todas las celdas de esa hora para todos los días
    const celdasDeLaHora = DIAS.map((dia) => ({
      dia,
      hora_ini,
      hora_fin,
      idDocente,
    }));
  
    // Verificar si todas las celdas ya están marcadas
    const todasMarcadas = celdasDeLaHora.every((celda) =>
      disponibilidad.some(
        (d) =>
          d.dia === celda.dia &&
          d.hora_ini === celda.hora_ini &&
          d.hora_fin === celda.hora_fin
      )
    );
  
    // Nueva disponibilidad dependiendo de si estaban todas o no
    const nuevaDisponibilidad = todasMarcadas
      ? disponibilidad.filter(
          (d) => !(d.hora_ini === hora_ini && d.hora_fin === hora_fin)
        )
      : [
          ...disponibilidad,
          ...celdasDeLaHora.filter(
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
    console.log("Click en hora:", hora_ini, hora_fin);
  };

  return (
    <div className="p-4 space-y-10">
      <div className="flex w-full mb-4 gap-2 flex-row justify-center">
        {Object.entries(turnos).map(([turno, horario]) => (
          <button
            key={turno}
            onClick={() => handleTurnoChange(turno)}
            className={`px-4 py-2 rounded-md cursor-pointer select-none transition-all duration-200 shadow 
              ${
                turnoSeleccionado === turno
                  ? "bg-gray-300 text-black font-bold shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {turno}: {horario}
          </button>
        ))}
      </div>

      <Horarios
        listaSalones={listaSalones}
        setClaseSeleccionada={setClaseSeleccionada}
        turno={turnoSeleccionado}
        disponibilidad={disponibilidad}
        idDocente={idDocente}
        setDisponibilidadDocentes={setDisponibilidadDocentes}
        handleCeldaClick={modoEdicion ? handleCeldaClick : undefined}
        handleClickDia={modoEdicion ? handleClickDia : undefined}
        handleClickHora={modoEdicion ? handleClickHora : undefined}
      />
    </div>
  );
};


