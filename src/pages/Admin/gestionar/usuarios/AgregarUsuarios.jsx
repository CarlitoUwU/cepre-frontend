import React, { useState, useEffect } from "react";
import { Input } from "../../../../components/ui/Input";
import { Button } from "../../../../components/ui/Button";
import { ButtonNegative } from "../../../../components/ui/ButtonNegative";
import { LabelForm } from "../../../../components/ui/LabelForm";
import CursoService from "../../../../services/cursoServices";
import { Select } from "../../../../components/ui/Select";

export const AgregarUsuarios = ({ rol, formData, handleChange, handleGuardarNuevoUsuario, setVista }) => {
  const [error, setError] = useState("");
  const [cursos, setCursos] = useState([]); // Inicializar con array vacío

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const data = await CursoService.getCursos();
        setCursos(Array.isArray(data) ? data : []); // Asegurar que siempre sea un array
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
        setCursos([]); // En caso de error, evitar undefined
      }
    };
  
    fetchCursos();
  }, []);

  const validarYGuardar = () => {
    const camposRequeridos = ["docente", "correo", "numero"];
    if (rol === "Docente") camposRequeridos.push("curso");
    if (rol === "Monitor") camposRequeridos.push("aula", "carrera");
    if (rol === "Supervisor") camposRequeridos.push("carrera");

    const camposVacios = camposRequeridos.filter((campo) => !formData[campo]?.trim());

    if (camposVacios.length > 0) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setError("");
    handleGuardarNuevoUsuario();
  };

  return (
    <div className="bg-gray-200 w-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Agregar Nuevo {rol}</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <LabelForm text="Nombres y Apellidos:" />
        <Input type="text" name="docente" value={formData.docente || ""} onChange={handleChange} required />

        {rol === "Docente" && (
          <>
            <LabelForm text="Curso:" />
            <Select name="curso" value={formData.curso || ""} onChange={handleChange} options={cursos.map((curso) => ({ id: curso.id, name: curso.name }))} required/>

            <LabelForm text="Correo Personal:" />
            <Input type="email" name="correo_personal" value={formData.correo_personal || ""} onChange={handleChange} required />

            <LabelForm text="Disponibilidad:" />
            <Input type="text" name="disponibilidad" value={formData.disponibilidad || ""} onChange={handleChange} required />
          </>
        )}
        {rol === "Monitor" && (
          <>
            <LabelForm text="Aula:" />
            <Input type="text" name="aula" value={formData.aula || ""} onChange={handleChange} required />

            <LabelForm text="Carrera:" />
            <Input type="text" name="carrera" value={formData.carrera || ""} onChange={handleChange} required />
          </>
        )}
        {rol === "Supervisor" && (
          <>
            <LabelForm text="Carrera:" />
            <Input type="text" name="carrera" value={formData.carrera || ""} onChange={handleChange} required />
          </>
        )}

        <LabelForm text="Correo Ceprunsa:" />
        <Input type="email" name="correo" value={formData.correo || ""} onChange={handleChange} required />
        
        <LabelForm text="Número:" />
        <Input type="text" name="numero" value={formData.numero || ""} onChange={handleChange} required />

        <div className="flex justify-between mt-5">
          <ButtonNegative onClick={() => setVista("tabla")}>Atrás</ButtonNegative>
          <Button type="button" onClick={validarYGuardar}>Guardar</Button>
        </div>
      </div>
    </div>
  );
};
