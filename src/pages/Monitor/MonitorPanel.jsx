import React from 'react';

export const MonitorPanel = () => {
  return (
    <div className="bg-gray-200 p-4">
      <div className="max-w-7xl mx-auto bg-white p-4 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Courses Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-blue-200">
                  <th className="py-2 px-4 border-b border-gray-300">CURSO</th>
                  <th className="py-2 px-4 border-b border-gray-300">DOCENTE</th>
                  <th className="py-2 px-4 border-b border-gray-300">CORREO</th>
                </tr>
              </thead>
              <tbody>
                {/* Reemplaza las filas con datos */}
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300">BIOLOGÍA</td>
                  <td className="py-2 px-4 border-b border-gray-300">GUTIÉRREZ QUISPE JUAN CARLOS</td>
                  <td className="py-2 px-4 border-b border-gray-300">juan.gutierrez@cepr.unsa.pe</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300">CÍVICA</td>
                  <td className="py-2 px-4 border-b border-gray-300">RAMIREZ MAMANI MAYRA</td>
                  <td className="py-2 px-4 border-b border-gray-300">mayra.ramirez@cepr.unsa.pe</td>
                </tr>
                {/* Continúa agregando más filas según los datos */}
              </tbody>
            </table>
          </div>

          {/* Schedule Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="py-2 px-4 border-b border-gray-300">Hrs</th>
                  <th className="py-2 px-4 border-b border-gray-300">LUNES</th>
                  <th className="py-2 px-4 border-b border-gray-300">MARTES</th>
                  <th className="py-2 px-4 border-b border-gray-300">MIÉRCOLES</th>
                  <th className="py-2 px-4 border-b border-gray-300">JUEVES</th>
                  <th className="py-2 px-4 border-b border-gray-300">VIERNES</th>
                  <th className="py-2 px-4 border-b border-gray-300">SÁBADO</th>
                  <th className="py-2 px-4 border-b border-gray-300 bg-blue-200">B - 201</th>
                </tr>
              </thead>
              <tbody>
                {/* Reemplaza las filas con datos del horario */}
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300">11:30 - 12:10</td>
                  <td className="py-2 px-4 border-b border-gray-300 bg-red-500 text-white">RAZ. VERBAL</td>
                  <td className="py-2 px-4 border-b border-gray-300 bg-purple-500 text-white">RAZ. LÓGICO</td>
                  <td className="py-2 px-4 border-b border-gray-300 bg-yellow-500 text-white">INGLÉS</td>
                  <td className="py-2 px-4 border-b border-gray-300 bg-red-500 text-white">RAZ. VERBAL</td>
                  <td className="py-2 px-4 border-b border-gray-300 bg-red-700 text-white">RAZ. MATEMÁTICO</td>
                  <td className="py-2 px-4 border-b border-gray-300 bg-blue-500 text-white">GEOGRAFÍA</td>
                </tr>
                {/* Continúa agregando más filas según el horario */}
              </tbody>
            </table>

            <div className="mt-4">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b border-gray-300">Aula</th>
                    <th className="py-2 px-4 border-b border-gray-300">Monitor</th>
                    <th className="py-2 px-4 border-b border-gray-300">Enlace</th>
                    <th className="py-2 px-4 border-b border-gray-300">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-300">1-101</td>
                    <td className="py-2 px-4 border-b border-gray-300">José Luis</td>
                    <td className="py-2 px-4 border-b border-gray-300 text-blue-500">
                      <a href="#">Ver</a>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      <button className="bg-yellow-500 text-white py-1 px-2 rounded">
                        Modificar enlace Meet
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}