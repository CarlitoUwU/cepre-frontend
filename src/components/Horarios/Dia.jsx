import React from 'react';

export const Dia = ({ nombre }) => {
    return (
      <div
        className="text-center font-semibold bg-[#F4F4F4] p-2 rounded-md"
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {nombre}
      </div>
    );
  };
