import React from 'react';

export const Hora = ({ hora , onClick = ()=>  {} }) => {
    return (
        <div
          onClick={onClick}
          className="text-center font-semibold bg-[#F4f4f4] p-2 rounded-md"
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {hora}
        </div>
    );
};
