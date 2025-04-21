import React, { useState } from "react";
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
    // Aquí podrías implementar lógica para seleccionar por día completo si deseas
    console.log("Click en día:", dia);
  };

  const handleClickHora = (hora_ini, hora_fin) => {
    // Aquí podrías implementar lógica para seleccionar por hora específica
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


