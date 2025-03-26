// src/pages/Admin/AgregarCurso.jsx
import React, { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { ButtonNegative } from "../../../components/ui/ButtonNegative";

export const AgregarCurso = ({ onAgregarCurso, setVistaActual }) => {
  const [nuevoCurso, setNuevoCurso] = useState({
    nombre: "",
    color: "#000000",
  });

  const handleChange = (e) => {
    setNuevoCurso({ ...nuevoCurso, [e.target.name]: e.target.value });
  };

  const handleCrearCurso = () => {
    if (nuevoCurso.nombre.trim() === "") {
      alert("El nombre del curso no puede estar vacío.");
      return;
    }
    onAgregarCurso(nuevoCurso);
  };

  return (
    <div className="bg-gray-200 w-screen h-screen flex items-center justify-center">
  <div className="bg-white p-6 rounded-lg shadow-lg w-96">
    <h2 className="text-2xl font-bold mb-4 text-center">
      Agregar Nuevo Curso
    </h2>

    {/* Campo Curso */}
    <label className="block font-semibold">Curso:</label>
    <input
      type="text"
      name="nombre"
      value={nuevoCurso.nombre}
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
      <ButtonNegative onClick={() => setVistaActual("lista")} > Atrás </ButtonNegative>
      <Button onClick={handleCrearCurso}> Crear Curso </Button>
    </div>
  </div>
</div>

  );
};
