import React, { useState, useEffect } from "react";
import cursosData from "../../../data/cursos.json";
import { AgregarCurso } from "./AgregarCurso";
import { Tabla } from "../../../components/ui/Tabla";
import { fetchCourses } from "../../../services/cursoServices";

// Definimos el encabezado de la tabla fuera del componente
const encabezadoCursos = ["N°", "Curso", "Color", "Acciones"];

export const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", color: "" });
  const [vistaActual, setVistaActual] = useState("lista"); // "lista" o "agregar"

  useEffect(() => {
    fetchCourses().then((data) => setCursos(data)).catch((error) => console.error(error));
    //setCursos(cursosData);
  }, []);

  const handleModificar = (curso) => {
    setEditandoId(curso.id);
    setFormData({ nombre: curso.nombre, color: curso.color });
  };

  const handleGuardar = (id) => {
    setCursos(
      cursos?.map((curso) =>
        curso.id === id ? { ...curso, nombre: formData.nombre, color: formData.color } : curso
      )
    );
    setEditandoId(null);
    setFormData({ nombre: "", color: "" });
  };

  const handleCancelar = () => { setEditandoId(null); setFormData({ nombre: "", color: "" }); };
  const handleBorrar = (id) => setCursos(cursos?.filter((curso) => curso.id !== id));

  const handleAgregarCurso = (nuevoCurso) => {
    setCursos([...cursos, { id: cursos.length + 1, ...nuevoCurso }]);
    setVistaActual("lista"); // Volver a la lista después de agregar
  };

  // Generar los datos de la tabla
  const getDatosCursos = () => {
    const data = cursos?.map((curso) => [
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
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
          onClick={() => handleGuardar(curso.id)}
        >
          Guardar
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800 ml-4"
          onClick={handleCancelar}
        >
          Cancelar
        </button>
      </>
    ) : (
      <div className="inline-flex gap-4">
        <button
          className="bg-[#78211E] text-white px-4 py-2 rounded hover:bg-[#5a1815]"
          onClick={() => handleModificar(curso)}
        >
          Modificar
        </button>
        <button
          className="bg-[#78211E] text-white px-4 py-2 rounded hover:bg-[#5a1815]"
          onClick={() => handleBorrar(curso.id)}
        >
          Borrar
        </button>
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
          <button
            className="bg-[#78211E] text-white px-6 py-2 rounded hover:bg-[#5a1815] transition"
            onClick={() => setVistaActual("agregar")}
          >
            Agregar Cursos
          </button>
        </div>
      </div>
    </div>
  );
};
