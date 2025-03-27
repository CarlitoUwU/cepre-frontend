import React, { useState, useEffect } from "react";
import cursosData from "../../../data/cursos.json";
import { AgregarCurso } from "./AgregarCurso";
import { Tabla } from "../../../components/ui/Tabla";
import { Button } from "../../../components/ui/Button";
import { ButtonNegative } from "../../../components/ui/ButtonNegative";
import { Input } from "../../../components/ui/Input";

const encabezadoCursos = ["N°", "Curso", "Color", "Acciones"];

export const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", color: "" });
  const [vistaActual, setVistaActual] = useState("lista");

  useEffect(() => setCursos(cursosData), []);

  const handleModificar = (curso) => {
    setEditandoId(curso.id);
    setFormData({ nombre: curso.nombre, color: curso.color });
  };

  const handleGuardar = () => {
    setCursos(cursos.map(c => (c.id === editandoId ? { ...c, ...formData } : c)));
    setEditandoId(null);
    setFormData({ nombre: "", color: "" });
  };

  const handleBorrar = (id) => setCursos(cursos.filter(c => c.id !== id));

  const handleAgregarCurso = (nuevoCurso) => {
    setCursos([...cursos, { id: cursos.length + 1, ...nuevoCurso }]);
    setVistaActual("lista");
  };

  const getAcciones = (curso) =>
    editandoId === curso.id ? (
      <div className="inline-flex gap-10">
        <Button onClick={handleGuardar}> Guardar  </Button>  
        <ButtonNegative onClick={() => setEditandoId(null)}> Cancelar </ButtonNegative>
      </div>
    ) : (
      <div className="inline-flex gap-10">
        <Button onClick={() => handleModificar(curso)}> Modificar </Button>
        <ButtonNegative onClick={() => handleBorrar(curso.id)}>Borrar  </ButtonNegative>
      </div>
    );

    const getDatosCursos = () =>
      cursos.map((curso) => [
        curso.id,
        editandoId === curso.id ? (
          <Input type="text" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}/>
        ) : (
          curso.nombre
        ),
        editandoId === curso.id ? (
          <Input type="color" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className="w-10 h-6"/>
        ) : (
          <div className="w-6 h-6 mx-auto rounded-full" style={{ backgroundColor: curso.color }}></div>
        ),
        getAcciones(curso),
      ]);
    

  if (vistaActual === "agregar") {
    return <AgregarCurso onAgregarCurso={handleAgregarCurso} setVistaActual={setVistaActual} />;
  }

  return (
    <div className="overflow-x-auto w-full text-center">
      <h2 className="text-2xl font-bold mb-4 text-center">GESTIÓN DE CURSOS</h2>
      <Tabla encabezado={encabezadoCursos} datos={getDatosCursos()} />
      <div className="flex justify-center mt-4">
        <Button onClick={() => setVistaActual("agregar")}> Agregar Curso </Button>
      </div>
    </div>
  );
};
