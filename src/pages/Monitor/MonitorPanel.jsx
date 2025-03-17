import React from 'react';
import { useState, useEffect } from "react";
import { ListaCursosPorAula } from "../../components/ListaCursosPorAula.jsx";

export const MonitorPanel = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    fetch("/cursos.json")
      .then((response) => response.json())
      .then((data) => setCursos(data))
      .catch((error) => console.error("Error cargando cursos:", error));
  }, []);

  return (
    <div className="bg-white min-h-screen p-6">
      <header className="bg-yellow-600 text-white p-4 flex justify-between items-center rounded-lg">
        <h1 className="text-lg font-semibold">Bienvenido Monitor, José Luis</h1>
        <button className="bg-white text-yellow-600 px-4 py-2 rounded-lg">Salir</button>
      </header>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-lg overflow-auto">
          <ListaCursosPorAula items={cursos} />
        </div>
      </div>
    </div>
  );
};
