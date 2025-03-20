import React from 'react';

export const ListaSalones = ({ items }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr className="bg-[#78211E] text-white font-[Calibri] font-extrabold">
            <th className="py-2 px-4 border-b border-gray-300" >N°</th>
            <th className="py-2 px-4 border-b border-gray-300" >Apellidos y Nombres</th>
            <th className="py-2 px-4 border-b border-gray-300" >Aula</th>
            <th className="py-2 px-4 border-b border-gray-300" >Enlace Meet</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ monitor, aula, enlace }, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-[#F4F4F4]" : "bg-[#F6EDD8]"} font-[Calibri] font-medium`}
            >
              <td className="py-2 px-4 border-b border-gray-300" >{index + 1}</td>
              <td className="py-2 px-4 border-b border-gray-300" >{monitor}</td>
              <td className="py-2 px-4 border-b border-gray-300" >{aula}</td>
              <td className="py-2 px-4 border-b border-gray-300" >
                <a href={enlace} target='_blank' className="text-blue-500 underline hover:text-blue-700">{enlace}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
