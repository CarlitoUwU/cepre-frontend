import React, { useState, useEffect } from "react";
import { Tabla } from "../../components/ui/Tabla";
import aulasData from "../../data/todasAulas.json";

// Definimos el encabezado de la tabla fuera del componente
const encabezadoCursos = ["N° de Aula", "Área", "Turno", "Estado", "Acciones"];
const filtro = {
  1: ["Biomédicas", "Ingenierías", "Sociales"],
  2: ["Mañana", "Tarde", "Noche"],
  3: ["Listo", "Faltan Docentes"]
};

export const Salones = () => {
  const [aulas, setAulas] = useState([]);
  const [vistaActual, setVistaActual] = useState("lista"); // "lista" o "agregar"

  useEffect(() => {
    setAulas(aulasData);
  }, []);

  const handleBorrar = (id) => setAulas(aulas.filter((curso) => curso.id !== id));

  const handleAgregarCurso = (nuevoCurso) => {
    setAulas([...aulas, { id: aulas.length + 1, ...nuevoCurso }]);
    setVistaActual("lista"); // Volver a la lista después de agregar
  };

  // Generar los datos de la tabla
  const getDatosAulas = () => {
    const data = aulas.map((aula) => [
      aula.aula,
      aula.area,
      aula.turno,
      aula.estado,
      getAcciones(aula),
    ]);

    return data;
  };

  // Generar las acciones para cada fila
  const getAcciones = (curso) => {
    return (
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

        <Tabla encabezado={encabezadoCursos} datos={getDatosAulas()} filtroDic={filtro} />

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
