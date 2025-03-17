import React from 'react';

export const Curso = ({ clase, backgroundColor, gridColumn, gridRow, gridSpan, nombre, setClaseSeleccionada }) => {
  return (
    <div
      className="curso cursor-pointer text-center text-white font-semibold p-2 rounded-md shadow-md flex items-center justify-center"
      style={{
        backgroundColor,
        gridColumn,
        gridRow: `${gridRow} / span ${gridSpan}`,
      }}
      onClick={() => setClaseSeleccionada(clase)}
    >
      <h3 className="text-lg">{nombre}</h3>
    </div>

  );
};
