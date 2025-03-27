import React, { useState, useEffect } from "react";
import { AgregarCurso } from "./AgregarCurso";
import { Tabla } from "../../../components/ui/Tabla";
import { Button } from "../../../components/ui/Button";
import { ButtonNegative } from "../../../components/ui/ButtonNegative";
import { Input } from "../../../components/ui/Input";
import CursoService from "../../../services/cursoServices";

const encabezadoCursos = ["N°", "Curso", "Color", "Acciones"];

export const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({ name: "", color: "" });
  const [vistaActual, setVistaActual] = useState("lista"); // "lista" o "agregar"

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const data = await CursoService.getCursos();
        if (Array.isArray(data)) {
          setCursos(data);
        }
      } catch (error) {
        console.error("Error al obtener las áreas:", error);
      }
    };

    fetchAreas();
  }, []);

  const handleModificar = (curso) => {
    setEditandoId(curso.id);
    setFormData({ name: curso.name, color: curso.color });
  };

  const handleGuardar = async (id) => {
    try {
      const cursoActualizado = await CursoService.updateCurso({
        id,
        name: formData.name,
        color: formData.color,
      });

      if (cursoActualizado) {
        setCursos(
          cursos.map((curso) =>
            curso.id === id ? cursoActualizado : curso
          )
        );
        setEditandoId(null);
        setFormData({ name: "", color: "" });
      }
    } catch (error) {
      console.error("Error al actualizar el curso:", error);
    }
  };

  const handleCancelar = () => { setEditandoId(null); setFormData({ name: "", color: "" }); };
  const handleBorrar = async (id) => {
    try {
      const eliminado = await CursoService.deleteCurso(id);
      if (eliminado) {
        setCursos(cursos.filter((curso) => curso.id !== id));
      }
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
    }
  };


  const handleAgregarCurso = async (nuevoCurso) => {
    try {
      const cursoCreado = await CursoService.createCurso(nuevoCurso);
      if (cursoCreado) {
        setCursos([...cursos, cursoCreado]); // Agrega el curso devuelto por el backend
        setVistaActual("lista");
      }
    } catch (error) {
      console.error("Error al agregar el curso:", error);
    }
  };

  // Generar los datos de la tabla
  const getDatosCursos = () => {
    const data = cursos?.map((curso) => [
      curso.id,
      editandoId === curso.id ? (
        <Input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      ) : (
        curso.name
      ),
      editandoId === curso.id ? (
        <Input type="color" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className="w-10 h-6" />
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
      <div className="inline-flex gap-10">
        <Button onClick={() => handleGuardar(curso.id)}>Guardar</Button>
        <ButtonNegative onClick={handleCancelar}>Cancelar</ButtonNegative>
      </div>
    ) : (
      <div className="inline-flex gap-10">
        <Button onClick={() => handleModificar(curso)}> Modificar </Button>
        <ButtonNegative onClick={() => handleBorrar(curso.id)}>Borrar  </ButtonNegative>
      </div>
    );
  };

  if (vistaActual === "agregar") {
    return <AgregarCurso onAgregarCurso={handleAgregarCurso} setVistaActual={setVistaActual} />;
  }

  return (
    <div className="overflow-x-auto w-full text-center">
      <h2 className="text-2xl font-bold mb-4 text-center">GESTIÓN DE CURSOS</h2>
      <Tabla encabezado={encabezadoCursos} datos={getDatosCursos()} />
      
      {/* Botón fijo centrado sin que el div sea más grande de lo necesario */}
      <div className="fixed bottom-12 left-5/9 w-fit">
        <Button onClick={() => setVistaActual("agregar")}>Agregar Curso</Button>
      </div>
    </div>
  );
  
  
};