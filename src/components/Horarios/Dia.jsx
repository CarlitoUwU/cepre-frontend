import React from 'react';

export const Dia = ({ nombre, isCurrent = false, onClick, clickable = false }) => {
    return (
      <div
        className={`text-center font-semibold p-2 rounded-md ${
          isCurrent ? 'bg-blue-500 text-white' : 'bg-[#F4F4F4]'
        } ${
          clickable ? 'cursor-pointer hover:bg-blue-100 transition-colors' : ''
        }`}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        onClick={onClick}
      >
        {nombre}
      </div>
    );
};