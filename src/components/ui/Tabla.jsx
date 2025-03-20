import React from "react";

export const Tabla = ({ encabezado, datos }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr className="bg-[#78211E] text-white font-[Calibri] font-extrabold">
            {encabezado.map((item) => (
              <th key={item} className="py-2 px-4 border-b border-gray-300">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((fila, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-[#F4F4F4]" : "bg-[#F6EDD8]"} font-[Calibri] font-medium`}
            >
              {fila.map((item) => (
                <td key={item} className="py-2 px-4 border-b border-gray-300" >
                  {item}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}