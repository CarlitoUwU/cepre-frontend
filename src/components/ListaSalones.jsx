import React from 'react';

export const ListaSalones = ({ items }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>N°</th>
          <th>Apellidos y Nombres</th>
          <th>Aula</th>
          <th>Enlace Meet</th>
        </tr>
      </thead>
      <tbody>
        {items.map(({ monitor, aula, enlace }, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{monitor}</td>
            <td>{aula}</td>
            <td><a href={enlace}>{enlace}</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}