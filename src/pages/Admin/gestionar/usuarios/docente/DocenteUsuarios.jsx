import React, { useState } from "react";
import { Tabla } from "@/components/ui/Tabla";
import { Button } from "@/components/ui/button.tsx";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Input } from "@/components/ui/Input";
import { AgregarUsuarios } from "../AgregarUsuarios";
import { useProfesores } from "@/hooks/useProfesores";
import { SkeletonTabla } from "@/components/skeletons/SkeletonTabla";
import { AsignarSalonDoc } from "./AsignarSalonDoc";

const encabezado = ["N°", "Curso", "Nombres", "Apellidos", "Correo", "Número", "Acciones"];
const VISTA = {
  TABLA: "tabla",
  FORMULARIO: "formulario",
  ASIGNAR_SALON: "asignarSalonDoc"
};

export const DocenteUsuarios = () => {
  const [vista, setVista] = useState(VISTA.TABLA);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const {
    profesores,
    totalPages,
    isLoading,
   // isError,
    crearProfesorMutation,
    actualizarProfesorMutation,
    eliminarProfesorMutation,
  } = useProfesores({ page, limit });
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    numero: "",
    extra: "",
  });

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleLimitChange = (e) => setLimit(e.target.value);

  const handleModificar = (id) => {
    const profesor = profesores.find((profesor) => profesor.id === id);
    if (profesor) {
      setEditingId(id);
      setEditFormData({
        nombres: profesor.firstName || "-",
        apellidos: profesor.lastName || "-",
        correo: profesor.personalEmail || "-",
        numero: profesor.phone || "-",
        extra: profesor.courseName || "-",
      });
    }
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleGuardar = (id) => {
    console.log({ id })
    console.log({ editFormData })
    return
    crearProfesorMutation
    const actualizados = profesores.map((docente) =>
      docente.id === id
        ? {
          ...docente,
          nombres: editFormData.nombres,
          apellidos: editFormData.apellidos,
          correo: editFormData.correo,
          numero: editFormData.numero,
          curso: editFormData.extra,
        }
        : docente
    );
    console.log(actualizados);
    //setDocentes(actualizados);
    setEditingId(null);
  };

  const handleBorrar = (id) => {
    console.log({ id })
    //const nuevos = profesores.filter((d) => d.id !== id);
    //console.log(nuevos);
    //setDocentes(nuevos);
  };

  const handleAgregar = () => {
    setEditFormData({ nombres: "", apellidos: "", correo: "", numero: "", extra: "" });
    setVista(VISTA.FORMULARIO);
  };

  const handleNuevoUsuario = (formData) => {
    console.log({ formData });
    /*     {formData: {…}}
    formData
    : 
    apellidos
    : 
    "asd"
    coordinador
    : 
    true
    correo
    : 
    "asd@cepr.unsa.pe"
    correo_personal
    : 
    "asdsad@gmail.com"
    curso
    : 
    "9"
    disponibilidad
    : 
    "full-time"
    dni
    : 
    "72307538"
    docente
    : 
    "asd"
    extra
    : 
    ""
    nombres
    : 
    ""
    numero
    : 
    "912345678"
    [[Prototype]]
    : 
    Object
    [[Prototype */
  }

  const handleAsignarSalon = (id) => {
    console.log("Asignar salón al docente con ID:", id);
    setVista(VISTA.ASIGNAR_SALON);
  };

  const getDatosProfesor = () => {
    return profesores.map((profesor, index) => {
      const esEdicion = editingId === profesor.id;

      return [
        index + (page - 1) * limit + 1,
        profesor.courseName || "-",
        esEdicion ? (
          <Input type="text" name="nombres" value={editFormData.nombres} onChange={handleEditChange} />
        ) : (
          profesor.firstName || "-"
        ),
        esEdicion ? (
          <Input type="text" name="apellidos" value={editFormData.apellidos} onChange={handleEditChange} />
        ) : (
          profesor.lastName || "-"
        ),
        esEdicion ? (
          <Input type="email" name="correo" value={editFormData.correo} onChange={handleEditChange} />
        ) : (
          profesor.personalEmail || "-"
        ),
        esEdicion ? (
          <Input type="text" name="numero" value={editFormData.numero} onChange={handleEditChange} />
        ) : (
          profesor.phone || "-"
        ),
        esEdicion ? (
          <div className="flex gap-2 justify-center">
            <Button onClick={() => handleGuardar(profesor.id)}>Guardar</Button>
            <ButtonNegative onClick={() => setEditingId(null)}>Cancelar</ButtonNegative>
          </div>
        ) : (
          <div className="flex gap-2 justify-center">
            <Button onClick={() => handleAsignarSalon(profesor.id)}>Asignar Salón</Button>
            <Button onClick={() => handleModificar(profesor.id)}>Modificar</Button>
            <ButtonNegative onClick={() => handleBorrar(profesor.id)}>Borrar</ButtonNegative>
          </div>
        )
      ];
    });
  }

  return vista === "tabla" ? (
    <div className="overflow-x-auto w-full text-center">
      <div className="relative flex justify-center items-center py-2">
        <h2 className="text-2xl font-bold">GESTIÓN DE DOCENTES</h2>
        <div className="absolute right-4">
          <Button onClick={handleAgregar}>Agregar Docente</Button>
        </div>
      </div>
      {isLoading ? <SkeletonTabla numRows={6} /> :
        <Tabla encabezado={encabezado} datos={getDatosProfesor()} />
      }
      <div className="flex justify-between mt-4">
        <Button onClick={handlePrev} disabled={page === 1} >  {/* disabled cambiar estilos */}
          Anterior
        </Button>
        <Button onClick={handleNext} disabled={page >= totalPages} >  {/* disabled cambiar estilos */}
          Siguiente
        </Button>
        <select value={limit} onChange={handleLimitChange} className="border border-gray-300 rounded p-2">
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  ) : vista === "asignarSalonDoc" ? (
    <AsignarSalonDoc
      id={editingId}
      setVista={setVista}
    />
  ) : (
    <AgregarUsuarios
      rol="Docente"
      formData={editFormData}
      handleChange={(e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value })}
      handleGuardarNuevoUsuario={handleNuevoUsuario}
      setVista={setVista}
    />
  );
};
