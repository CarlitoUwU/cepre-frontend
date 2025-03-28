import React, { useState } from "react";
import { Input } from "../../../../components/ui/Input";
import { Button } from "../../../../components/ui/Button";
import { ButtonNegative } from "../../../../components/ui/ButtonNegative";
import { LabelForm } from "../../../../components/ui/LabelForm";

export const AgregarUsuarios = ({ rol, formData, handleChange, handleGuardarNuevoUsuario, setVista }) => {
  const [error, setError] = useState("");

  const validarYGuardar = () => {
    // Verifica si algún campo está vacío
    const camposRequeridos = ["docente", "correo", "numero"];
    if (rol === "Docente") camposRequeridos.push("curso");
    if (rol === "Monitor") camposRequeridos.push("aula", "carrera");
    if (rol === "Supervisor") camposRequeridos.push("carrera");

    const camposVacios = camposRequeridos.filter((campo) => !formData[campo]?.trim());

    if (camposVacios.length > 0) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setError(""); // Limpiar error si todo está bien
    handleGuardarNuevoUsuario();
  };

  return (
    <div className="bg-gray-200 w-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Agregar Nuevo {rol}</h2>

        {/* Mostrar mensaje de error */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Campos generales */}
        <LabelForm text="Nombres y Apellidos:" />
        <Input type="text" name="docente" value={formData.docente || ""} onChange={handleChange} required />

        {/* Campos según el rol */}
        {rol === "Docente" && (
          <>
            <LabelForm text="Curso:" />
            <Input type="text" name="curso" value={formData.curso || ""} onChange={handleChange} required />
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

        {/* Campos generales */}
        <LabelForm text="Correo:" />
        <Input type="email" name="correo" value={formData.correo || ""} onChange={handleChange} required />
        
        <LabelForm text="Número:" />
        <Input type="text" name="numero" value={formData.numero || ""} onChange={handleChange} required />

        {/* Botones */}
        <div className="flex justify-between mt-5">
          <ButtonNegative onClick={() => setVista("tabla")}>Atrás</ButtonNegative>
          <Button type="button" onClick={validarYGuardar}>Guardar</Button>
        </div>
      </div>
    </div>
  );
};
