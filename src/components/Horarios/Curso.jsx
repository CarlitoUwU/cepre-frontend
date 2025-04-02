import React from 'react';

export const Curso = ({ clase = null, backgroundColor, gridColumn, gridRow, gridSpan, nombre, setClaseSeleccionada = null }) => {
  const handleClick = () => {
    setClaseSeleccionada(clase);
  };

  const isClickable = Boolean(setClaseSeleccionada);

  return (
    <div
      className={`${isClickable ? 'cursor-pointer' : ''} text-center text-white font-semibold p-2 rounded-md shadow-md flex items-center justify-center`}
      style={{
        backgroundColor,
        gridColumn,
        gridRow: `${gridRow} / span ${gridSpan}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }
      }
      {... (isClickable ? { onClick: handleClick } : {})}
    >
      <div className="curso-nombre">
        <h3 style={{ color: "white", fontWeight: "bold" }}>{nombre}</h3>
      </div>
    </div >

  );

}