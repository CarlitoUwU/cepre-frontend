import React from 'react';

export const AulaInfo = ({ aula, monitor, area, numHoras, enlace }) => {
  return (
    <div>
      <h2>Aula: {aula}</h2>
      <p>Monitor: {monitor}</p>
      <p>Área: {area}</p>
      <p>Horas Académicas: {numHoras}</p>
      <p>Enlace: <a href={enlace}>{enlace}</a></p>
    </div>
  );
}