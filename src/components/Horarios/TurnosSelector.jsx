import React, { useState } from "react";
import { Horarios } from "./Horarios.jsx";

const TurnosSelector = ({ listaSalones, setClaseSeleccionada, disponibilidad, idDocente, setDisponibilidadDocentes }) => {
  const [turnoSeleccionado, setTurnoSeleccionado] = useState("Turno 1");

  const turnos = {
    "Turno 1": "07:00 - 12:10",
    "Turno 2": "11:30 - 16:40",
    "Turno 3": "16:00 - 21:10",
  };

  const handleTurnoChange = (turno) => {
    setTurnoSeleccionado(turno);
  };

  return (
    <div className="p-4 space-y-10">
      <div className="flex w-full mb-4 gap-2 flex-row justify-center">
        {Object.entries(turnos).map(([turno, horario]) => (
          <button
          key={turno}
          onClick={() => handleTurnoChange(turno)}
          className={`px-4 py-2 rounded-md cursor-pointer select-none transition-all duration-200 shadow 
            ${turnoSeleccionado === turno
            ? "bg-gray-300 text-black font-bold shadow-md"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          {turno}: {horario}
        </button>
        ))}
      </div>

      {/* Pasamos el idDocente y la disponibilidad correcta al componente Horarios */}
      <Horarios
        listaSalones={listaSalones}
        setClaseSeleccionada={setClaseSeleccionada}
        turno={turnoSeleccionado}
        disponibilidad={disponibilidad}
        idDocente={idDocente}  // Aseguramos que cada docente tenga su disponibilidad
        setDisponibilidadDocentes={setDisponibilidadDocentes} // Para manejar la actualización de disponibilidad
      />
    </div>
  );
};

export default TurnosSelector;