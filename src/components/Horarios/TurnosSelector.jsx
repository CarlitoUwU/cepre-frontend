import React, { useState } from "react";
import { Horarios } from "./Horarios.jsx";

const TurnosSelector = ({ listaSalones, setClaseSeleccionada }) => {
  const [turnoSeleccionado, setTurnoSeleccionado] = useState("Turno 1");

  // Los datos de los turnos
  const turnos = {
    "Turno 1": "07:00 - 12:10",
    "Turno 2": "11:30 - 16:40",
    "Turno 3": "16:00 - 21:10"
  };

  // Función para manejar el cambio de turno
  const handleTurnoChange = (turno) => {
    setTurnoSeleccionado(turno);
  };

  return (
    <div className="p-4 space-y-10">
      {/* Botones para seleccionar el turno */}
      <div className="flex w-full mb-4 gap-2 flex-row justify-center">
  {Object.keys(turnos).map((turno) => (
    <button
      key={turno}
      onClick={() => handleTurnoChange(turno)}
      className={`px-4 py-2 rounded-md cursor-pointer select-none transition-all duration-200 shadow 
        ${turnoSeleccionado === turno 
          ? 'bg-gray-300 text-black font-bold shadow-md' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
    >
      {turno}: {turnos[turno]}
    </button>
  ))}
</div>


      {/* Renderizar solo el horario correspondiente al turno seleccionado */}
      {turnoSeleccionado === "Turno 1" && (
        <div>
          
          <Horarios
            listaSalones={listaSalones}
            setClaseSeleccionada={setClaseSeleccionada}
            turno="Turno 1"
            horaInicio="07:00"
            horaFin="12:10"
          />
        </div>
      )}
      {turnoSeleccionado === "Turno 2" && (
        <div>
          
          <Horarios
            listaSalones={listaSalones}
            setClaseSeleccionada={setClaseSeleccionada}
            turno="Turno 2"
            horaInicio="11:30"
            horaFin="16:40"
          />
        </div>
      )}
      {turnoSeleccionado === "Turno 3" && (
        <div>
          
          <Horarios
            listaSalones={listaSalones}
            setClaseSeleccionada={setClaseSeleccionada}
            turno="Turno 3"
            horaInicio="16:00"
            horaFin="21:10"
          />
        </div>
      )}
    </div>
  );
};

export default TurnosSelector;
