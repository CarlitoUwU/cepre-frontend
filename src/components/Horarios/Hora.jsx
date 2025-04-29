import React from 'react';

export const Hora = ({ hora, onClick = null }) => {
  return (
    <div
      onClick={onClick}
      className="text-center font-semibold bg-[#F4f4f4] p-2 rounded-md"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: onClick ? "pointer" : "default"
      }}
    >
      {hora}
    </div>
  );
};
