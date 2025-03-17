import React from 'react';

export const AulaInfo = ({ aula, monitor, area, numHoras, enlace }) => {
  if (!aula) return (
    <div className="flex justify-center items-center h-full">
      <h2 className="text-3xl font-bold text-center">Aula no seleccionada</h2>
    </div>

  )
  return (
    <div className="border border-gray-400 p-6 bg-white rounded-lg shadow-md text-left">
      <h2 className="text-xl font-bold mb-4 text-center">Aula: {aula}</h2>
      <p className="text-base"><strong>Monitor:</strong> {monitor}</p>
      <p className="text-base"><strong>Área:</strong> {area}</p>
      <p className="text-base"><strong>Horas Académicas:</strong> {numHoras}</p>
      <p className="text-base"><strong>Enlace Meet:</strong> <a href={enlace} className="text-blue-600 underline">{enlace}</a></p>
    </div>

  );


}