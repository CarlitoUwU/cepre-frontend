import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TablaHorarioMonitor } from "../../components/Horarios/indexMonitor";

export const HorarioMonitorPanel = () => {
  const { salon } = useParams(); // Obtener el parámetro del salón
  const navigate = useNavigate();
  const [horario, setHorario] = useState([]);

  useEffect(() => {
    // Simulación de consulta a una API o base de datos
    fetch(`/api/horarios?salon=${salon}`)
      .then((res) => res.json())
      .then((data) => setHorario(data))
      .catch((error) => console.error("Error al obtener el horario:", error));
  }, [salon]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Horario del Monitor - {salon}</h1>

      {horario.length > 0 ? (
        <TablaHorarioMonitor listaCursos={horario} />
      ) : (
        <p className="text-center text-red-600">No hay horario disponible para este salón.</p>
      )}

      <button 
        onClick={() => navigate('/supervisor')} 
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Regresar
      </button>
    </div>
  );
};
