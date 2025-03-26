// src/pages/Admin/AgregarCurso.jsx
import React, { useState } from "react";

export const AgregarCurso = ({ onAgregarCurso, setVistaActual }) => {
  const [nuevoCurso, setNuevoCurso] = useState({ name: "", color: "#000000" });

  const handleChange = (e) => {
    setNuevoCurso({ ...nuevoCurso, [e.target.name]: e.target.value });
  };

  const handleCrearCurso = () => {
    if (nuevoCurso.name.trim() === "") {
      alert("El nombre del curso no puede estar vacío.");
      return;
    }
    onAgregarCurso(nuevoCurso);
  };

  return (
    <div className="bg-gray-200 p-4 mt-18 flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Agregar Nuevo Curso</h2>

        {/* Campo Curso */}
        <label className="block font-semibold">Curso:</label>
        <input
          type="text"
          name="name"
          value={nuevoCurso.name}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />

        {/* Campo Color */}
        <label className="block font-semibold">Color:</label>
        <input
          type="color"
          name="color"
          value={nuevoCurso.color}
          onChange={handleChange}
          className="w-full h-10 mb-4 cursor-pointer"
        />

        {/* Botones */}
        <div className="flex justify-between">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={() => setVistaActual("lista")}
          >
            Atrás
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleCrearCurso}
          >
            Crear Curso
          </button>
        </div>
      </div>
    </div>
  );
};
