import React from 'react';

export const ListaSalones = ({ items }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-center">
            <th className="border border-gray-300 px-4 py-2">N°</th>
            <th className="border border-gray-300 px-4 py-2">Apellidos y Nombres</th>
            <th className="border border-gray-300 px-4 py-2">Aula</th>
            <th className="border border-gray-300 px-4 py-2">Enlace Meet</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ monitor, aula, enlace }, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{monitor}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{aula}</td>
              <td className="border border-gray-300 px-4 py-2">
                <a href={enlace} className="text-blue-500 underline hover:text-blue-700">{enlace}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
