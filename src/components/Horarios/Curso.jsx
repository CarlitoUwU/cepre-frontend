import React from 'react';

export const Curso = ({ clase, backgroundColor, gridColumn, gridRow, gridSpan, nombre, setClaseSeleccionada }) => {
  const handleClick = () => {
    setClaseSeleccionada(clase);
  }

  return (
    <div
      className={`curso`}
      style={{
        backgroundColor: backgroundColor,
        gridColumn: gridColumn,
        gridRow: `${gridRow} / span ${gridSpan}`,
        display: 'block'
      }}
      onClick={handleClick}
    >
      <div className='div-curso-nombre'>
        <div className='curso-nombre'><h3>{nombre}</h3></div>
      </div>
    </div>
  );
}