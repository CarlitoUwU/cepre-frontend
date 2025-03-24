import React, { useState, useEffect } from "react";
import cursosData from "../../data/cursos.json";
import { AgregarCurso } from "./AgregarCurso";
import { Tabla } from "../../components/ui/Tabla";
import { Button } from "../../components/ui/button";

// Definimos el encabezado de la tabla fuera del componente
const encabezadoCursos = ["N°", "Curso", "Color", "Acciones"];

export const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", color: "" });
  const [vistaActual, setVistaActual] = useState("lista"); // "lista" o "agregar"

  useEffect(() => {
    setCursos(cursosData);
  }, []);

  const handleModificar = (curso) => {
    setEditandoId(curso.id);
    setFormData({ nombre: curso.nombre, color: curso.color });
  };

  const handleGuardar = (id) => {
    setCursos(
      cursos.map((curso) =>
        curso.id === id ? { ...curso, nombre: formData.nombre, color: formData.color } : curso
      )
    );
    setEditandoId(null);
    setFormData({ nombre: "", color: "" });
  };

  const handleCancelar = () => { setEditandoId(null); setFormData({ nombre: "", color: "" }); };
  const handleBorrar = (id) => setCursos(cursos.filter((curso) => curso.id !== id));

  const handleAgregarCurso = (nuevoCurso) => {
    setCursos([...cursos, { id: cursos.length + 1, ...nuevoCurso }]);
    setVistaActual("lista"); // Volver a la lista después de agregar
  };

  // Generar los datos de la tabla
  const getDatosCursos = () => {
    const data = cursos.map((curso) => [
      curso.id,
      editandoId === curso.id ? (
        <input
          type="text"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className="border p-1 w-full"
        />
      ) : (
        curso.nombre
      ),
      editandoId === curso.id ? (
        <input
          type="color"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          className="w-10 h-6"
        />
      ) : (
        <div className="w-6 h-6 mx-auto rounded-full" style={{ backgroundColor: curso.color }}></div>
      ),
      getAcciones(curso),
    ]);

    return data;
  };

  // Generar las acciones para cada fila
  const getAcciones = (curso) => {
    return editandoId === curso.id ? (
      <>
        <Button onClick={() => handleGuardar(curso.id)}>Guardar</Button>
        <Button onClick={handleCancelar}>Cancelar</Button>
      </>
    ) : (
      <div className="inline-flex gap-4">
        <Button onClick={() => handleModificar(curso)}>Modificar</Button>
        <Button onClick={() => handleBorrar(curso.id)}>Borrar</Button>
      </div>
    );
  };

  if (vistaActual === "agregar") {
    return <AgregarCurso onAgregarCurso={handleAgregarCurso} setVistaActual={setVistaActual} />;
  }

  return (
    <div className="overflow-x-auto bg-gray-200 p-4">
      <div className="mx-auto bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">GESTIÓN DE CURSOS</h2>

        {/* Tabla reutilizable */}

        <Tabla encabezado={encabezadoCursos} datos={getDatosCursos()} />

        {/* Botón Agregar Curso */}
        <div className="flex justify-center mt-4">
          <Button onClick={() => setVistaActual("agregar")}>Agregar Cursos</Button>
        </div>
      </div>
    </div>
  );
};
