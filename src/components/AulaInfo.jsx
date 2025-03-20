import React from 'react';

export const AulaInfo = ({ aula, monitor, area, numHoras, enlace }) => {
  if (!aula) return (
    <div className="flex justify-center items-center h-full">
      <h2 className="text-3xl font-bold text-center">Aula no seleccionada</h2>
    </div>

  )
  return (
    <div className="p-6 rounded-lg text-left w-full">
      <h2 className="text-4xl font-bold mb-4 text-center">Aula: {aula}</h2>
      <p className="text-2xl p-2"><strong>Monitor:</strong> {monitor}</p>
      <p className="text-2xl p-2"><strong>Área:</strong> {area}</p>
      <p className="text-2xl p-2"><strong>Horas Académicas:</strong> {numHoras}</p>
      <p className="text-2xl p-2"><strong>Enlace Meet:</strong> <a href={enlace} target="_blank" className="text-blue-600 hover:underline">{enlace}</a></p>
    </div>

  );


}