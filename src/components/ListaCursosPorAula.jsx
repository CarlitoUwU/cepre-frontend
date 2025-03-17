import React from "react";

export const ListaCursosPorAula = ({ items }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Curso</th>
            <th>Docente</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ curso, docente, correo }, index) => (
            <tr key={index}>
              <td>{curso}</td>
              <td>{docente}</td>
              <td>{correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  