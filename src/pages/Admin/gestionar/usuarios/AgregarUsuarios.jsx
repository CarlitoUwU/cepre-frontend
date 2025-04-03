import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button.tsx";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { LabelForm } from "@/components/ui/LabelForm";
import CursoService from "@/services/cursoServices";
import { Select } from "@/components/ui/Select";

export const AgregarUsuarios = ({ rol, formData, handleChange, handleGuardarNuevoUsuario, setVista }) => {
  const [error, setError] = useState("");
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const data = await CursoService.getCursos();
        setCursos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
        setCursos([]);
      }
    };

    fetchCursos();
  }, []);

  const handleDniChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,8}$/.test(value)) {
      handleChange(e);
    }
  };

  const handleCelularChange = (e) => {
    const value = e.target.value;
    if (/^9\d{0,8}$/.test(value)) {
      handleChange(e);
    }
  };

  const handleNombreApellidoChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
      handleChange(e);
    }
  };

  const validarYGuardar = () => {
    const camposRequeridos = ["dni", "docente", "apellidos", "correo", "numero"];
    if (rol === "Docente") camposRequeridos.push("curso");
    if (rol === "Monitor") camposRequeridos.push("aula", "carrera");
    if (rol === "Supervisor") camposRequeridos.push("carrera");

    const camposVacios = camposRequeridos.filter((campo) => !formData[campo]?.trim());

    if (camposVacios.length > 0) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (formData.dni.length !== 8) {
      setError("El DNI debe tener 8 dígitos.");
      return;
    }

    if (!/^9\d{8}$/.test(formData.numero)) {
      setError("El celular debe tener 9 dígitos y empezar con 9.");
      return;
    }

    if (formData.celular_adicional && !/^9\d{8}$/.test(formData.celular_adicional)) {
      setError("El celular adicional debe tener 9 dígitos y empezar con 9.");
      return;
    }

    if (!formData.correo.endsWith("@cepr.unsa.pe")) {
      setError("El correo institucional debe terminar en @cepr.unsa.pe.");
      return;
    }

    setError("");
    handleGuardarNuevoUsuario();
  };

  return (
    <div className="bg-gray-200 w-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Agregar Nuevo {rol}</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {rol === "Docente" && (
          <div className="grid grid-cols-2 gap-4">
            {/* Columna Izquierda */}
            <div>
              <LabelForm text="DNI:" />
              <Input type="text" name="dni" value={formData.dni || ""} onChange={handleDniChange} required />

              <LabelForm text="Nombres:" />
              <Input type="text" name="docente" value={formData.docente || ""} onChange={handleNombreApellidoChange} required />

              <LabelForm text="Apellidos:" />
              <Input type="text" name="apellidos" value={formData.apellidos || ""} onChange={handleNombreApellidoChange} required />

              <LabelForm text="Correo Institucional:" />
              <Input type="email" name="correo" value={formData.correo || ""} onChange={handleChange} required />

              <LabelForm text="Correo Personal:" />
              <Input type="email" name="correo_personal" value={formData.correo_personal || ""} onChange={handleChange} required />
            </div>

            {/* Columna Derecha */}
            <div>
              <LabelForm text="Celular:" />
              <Input type="text" name="numero" value={formData.numero || ""} onChange={handleCelularChange} required />

              <LabelForm text="Celular Adicional (Opcional):" />
              <Input type="text" name="celular_adicional" value={formData.celular_adicional || ""} onChange={handleCelularChange} />

              <LabelForm text="Curso:" />
              <Select name="curso" value={formData.curso || ""} onChange={handleChange} options={cursos.map((curso) => ({ id: curso.id, name: curso.name }))} required />

              <LabelForm text="Disponibilidad:" />
              <Select
                name="disponibilidad"
                value={formData.disponibilidad || ""}
                onChange={handleChange}
                options={[
                  { id: "full-time", name: "Full Time" },
                  { id: "part-time", name: "Part Time" },
                  { id: "free-time", name: "Free Time" }
                ]}
                required
              />

              {/* Checkbox "¿Es coordinador?" */}
              <div className="mt-3 flex items-center">
                <input
                  type="checkbox"
                  id="coordinador"
                  name="coordinador"
                  checked={formData.coordinador || false}
                  onChange={(e) => handleChange({ target: { name: "coordinador", value: e.target.checked } })}
                  className="mr-2"
                />
                <label htmlFor="coordinador" className="text-gray-700">¿Es coordinador?</label>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-5">
          <ButtonNegative onClick={() => setVista("tabla")}>Atrás</ButtonNegative>
          <Button type="button" onClick={validarYGuardar}>Guardar</Button>
        </div>
      </div>
    </div>
  );
};
