import React from 'react';

export const Dia = ({ nombre, isCurrent = false, onClick, clickable = false }) => {
  const styleCurrent = isCurrent ? 'bg-blue-500 text-white' : 'bg-[#F4F4F4]';
  const styleClickable = clickable ? 'cursor-pointer hover:bg-blue-100 transition-colors' : '';

  return (
    <div
      onClick={onClick ? onClick : undefined}
      className={`text-center font-semibold p-2 rounded-md ${styleCurrent} ${styleClickable}`}

      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {nombre}
    </div>
  );
};