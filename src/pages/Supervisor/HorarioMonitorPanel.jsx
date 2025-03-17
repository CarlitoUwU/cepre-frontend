import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HorarioMonitorPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Horario del Monitor</h1>
      <p>Aquí se mostrará el horario del monitor.</p>

      {/* Botón para regresar */}
      <button 
        onClick={() => navigate('/supervisor')} 
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Regresar
      </button>
    </div>
  );
};
