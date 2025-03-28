// src/pages/Admin/AgregarCurso.jsx
import React, { useState } from "react";
import { Button } from "../../../../components/ui/Button";
import { ButtonNegative } from "../../../../components/ui/ButtonNegative";
import { Input } from "../../../../components/ui/Input";

export const AgregarCurso = ({ onAgregarCurso, setVistaActual }) => {
  const [nuevoCurso, setNuevoCurso] = useState({
    name: "",
    color: "#000000",
  });

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
    <div className="bg-gray-200 w-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Agregar Nuevo Curso
        </h2>

        {/* Campo Curso */}
        <label className="block font-semibold">Curso:</label>
        <Input name="name" value={nuevoCurso.name} onChange={handleChange} required/>

        {/* Campo Color */}
        <label className="block font-semibold mt-5">Color:</label>
        <Input type="color" name="color" value={nuevoCurso.color} onChange={handleChange} />

        {/* Botones */}
        <div className="flex justify-between mt-5">
          <ButtonNegative onClick={() => setVistaActual("lista")} > Atrás </ButtonNegative>
          <Button onClick={handleCrearCurso}> Crear Curso </Button>
        </div>
      </div>
    </div>
  );
};
