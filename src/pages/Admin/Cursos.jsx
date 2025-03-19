// src/pages/Admin/Cursos.jsx
import React, { useState, useEffect } from "react";
import cursosData from "../../data/cursos.json";
import { AgregarCurso } from "./AgregarCurso";

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
  };

  const handleCancelar = () => {
    setEditandoId(null);
  };

  const handleBorrar = (id) => {
    setCursos(cursos.filter((curso) => curso.id !== id));
  };

  const handleAgregarCurso = (nuevoCurso) => {
    setCursos([...cursos, { id: cursos.length + 1, ...nuevoCurso }]);
    setVistaActual("lista"); // Volver a la lista después de agregar
  };

  if (vistaActual === "agregar") {
    return <AgregarCurso onAgregarCurso={handleAgregarCurso} setVistaActual={setVistaActual} />;
  }

  return (
    <div className="bg-gray-200 p-4 mt-18">
      <div className="mx-auto bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">GESTIÓN DE CURSOS</h2>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-[#78211E] text-white font-bold">
              <th className="py-2 px-4 border-b border-gray-300">N°</th>
              <th className="py-2 px-4 border-b border-gray-300">Curso</th>
              <th className="py-2 px-4 border-b border-gray-300">Color</th>
              <th className="py-2 px-4 border-b border-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso, index) => (
              <tr key={curso.id} className={`${index % 2 === 0 ? "bg-[#F4F4F4]" : "bg-[#F6EDD8]"}`}>
                <td className="py-2 px-4 border-b border-gray-300 text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {editandoId === curso.id ? (
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="border p-1 w-full"
                    />
                  ) : (
                    curso.nombre
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-center">
                  {editandoId === curso.id ? (
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-10 h-6"
                    />
                  ) : (
                    <div className="w-6 h-6 mx-auto rounded-full" style={{ backgroundColor: curso.color }}></div>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-center">
                  {editandoId === curso.id ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded mx-1 hover:bg-green-700"
                        onClick={() => handleGuardar(curso.id)}
                      >
                        Guardar
                      </button>
                      <button
                        className="bg-gray-500 text-white px-3 py-1 rounded mx-1 hover:bg-gray-700"
                        onClick={handleCancelar}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded mx-1 hover:bg-blue-700"
                        onClick={() => handleModificar(curso)}
                      >
                        Modificar
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded mx-1 hover:bg-red-700"
                        onClick={() => handleBorrar(curso.id)}
                      >
                        Borrar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
