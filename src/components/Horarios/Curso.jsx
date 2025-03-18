import React from 'react';

export const Curso = ({ clase, backgroundColor, gridColumn, gridRow, gridSpan, nombre, setClaseSeleccionada }) => {
  const handleClick = () => {
    setClaseSeleccionada(clase);
  };

  return (
    <div
      className="curso"
      style={{
        backgroundColor: backgroundColor,
        gridColumn: gridColumn,
        gridRow: `${gridRow} / span ${gridSpan}`,
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        textAlign: "center", 
      }}
      onClick={handleClick}
    >
      <div className="curso-nombre">
        <h3 style={{ color: "white", fontWeight: "bold" }}>{nombre}</h3>
      </div>
    </div>
  );
};
