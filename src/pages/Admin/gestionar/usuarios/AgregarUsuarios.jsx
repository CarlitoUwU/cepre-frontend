import React from "react";
import { Input } from "../../../../components/ui/Input";
import { Button } from "../../../../components/ui/Button";
import { ButtonNegative } from "../../../../components/ui/ButtonNegative";

export const AgregarUsuarios = ({ rol, formData, handleChange, handleGuardarNuevoUsuario, setVista }) => {
  return (
    <div className="bg-gray-200 w-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Agregar Nuevo {rol}</h2>

        {/* Campos generales */}
        <label className="block font-semibold">Nombres y Apellidos:</label>
        <Input type="text" name="docente" value={formData.docente || ""} onChange={handleChange} required />

        {/* Campos según el rol */}
        {rol === "Docente" && (
          <>
            <label className="block font-semibold mt-5">Curso:</label>
            <Input type="text" name="curso" value={formData.curso || ""} onChange={handleChange} required />
          </>
        )}
        {rol === "Monitor" && (
          <>
            <label className="block font-semibold mt-5">Aula:</label>
            <Input type="text" name="aula" value={formData.aula || ""} onChange={handleChange} required />

            <label className="block font-semibold mt-5">Carrera:</label>
            <Input type="text" name="carrera" value={formData.carrera || ""} onChange={handleChange} required />
          </>
        )}
        {rol === "Supervisor" && (
          <>
            <label className="block font-semibold mt-5">Carrera:</label>
            <Input type="text" name="carrera" value={formData.carrera || ""} onChange={handleChange} required />
          </>
        )}

        {/* Campos generales */}
        <label className="block font-semibold mt-5">Correo:</label>
        <Input type="email" name="correo" value={formData.correo || ""} onChange={handleChange} required />

        <label className="block font-semibold mt-5">Número:</label>
        <Input type="text" name="numero" value={formData.numero || ""} onChange={handleChange} required />

        {/* Botones */}
        <div className="flex justify-between mt-5">
          <ButtonNegative onClick={() => setVista("tabla")}>Atrás</ButtonNegative>
          <Button type="submit" onClick={handleGuardarNuevoUsuario}>Guardar</Button>
        </div>
      </div>
    </div>
  );
};
