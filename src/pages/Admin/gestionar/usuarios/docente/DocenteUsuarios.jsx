import React, { useState, useEffect } from "react";
import { Tabla } from "@/components/ui/Tabla";
import { Button } from "@/components/ui/Button";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { EditableCell } from "@/components/ui/EditableCell";
import { AgregarUsuarios } from "../AgregarUsuarios";
import { useProfesores } from "@/hooks/useProfesores";
import { SkeletonTabla } from "@/components/skeletons/SkeletonTabla";
import { AsignarSalonDoc } from "./AsignarSalonDoc";
import { toast } from "react-toastify";
import { FaSyncAlt } from "react-icons/fa";

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
    isError,
    crearProfesorMutation,
    actualizarProfesorMutation,
    eliminarProfesorMutation,
    refetch,
  } = useProfesores({ page, limit });
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    numero: "",
    extra: "",
  });

  useEffect(() => {
    if (isError && (!profesores || profesores.length === 0)) {
      toast.error("Error al obtener los docentes");
    }
  }, [isError, profesores]);

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
        correo: profesor.email || "-",
        numero: profesor.phone || "-",
        extra: profesor.courseName || "-",
      });
    }
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    try {
      const profesor =
      {
        userId: editingId,
        firstName: editFormData.nombres,
        lastName: editFormData.apellidos,
        email: editFormData.correo,
        phone: editFormData.numero
      }

      const profeActualizado = await actualizarProfesorMutation.mutateAsync(profesor);

      if (profeActualizado) {
        toast.success(`Profesor "${profeActualizado.firstName}" actualizado correctamente`);
        setEditingId(null);
        setEditFormData({
          nombres: "",
          apellidos: "",
          correo: "",
          numero: "",
          extra: "",
        });
      }
    } catch (error) {
      toast.error("Error al actualizar el docente");
      console.error("Error al actualizar el docente:", error);
    }
  };

  const handleBorrar = async (id) => {
    try {
      const profesorEliminado = await eliminarProfesorMutation.mutateAsync(id);
      if (profesorEliminado || profesorEliminado === '') {
        toast.success(`Profesor eliminado correctamente`);
      }
    }
    catch (error) {
      toast.error("Error al eliminar el docente");
      console.error("Error al eliminar el docente:", error);
    }
  };

  const handleAgregar = () => {
    setEditFormData({ nombres: "", apellidos: "", correo: "", numero: "", extra: "" });
    setVista(VISTA.FORMULARIO);
  };

  const handleNuevoUsuario = async (formData) => {
    try {
      const nuevoProfesor = {
        email: formData.correo,
        personalEmail: formData.correo_personal,
        jobStatus: formData.disponibilidad,
        courseId: parseInt(formData.curso),
        dni: formData.dni,
        firstName: formData.docente,
        lastName: formData.apellidos,
        phone: formData.numero,
        phonesAdditional: formData.celular_adicional?.split(',') || [],
        isCoordinator: formData.coordinador || false,
      }

      const profesorCreado = await crearProfesorMutation.mutateAsync(nuevoProfesor);

      toast.success(`Profesor "${profesorCreado?.userProfile?.firstName || ""}" creado correctamente`);
      setEditFormData({
        nombres: "",
        apellidos: "",
        correo: "",
        numero: "",
        extra: "",
      });
    }
    catch (error) {
      toast.error("Error al crear el profesor");
      console.error("Error al agregar el profesor:", error);
    }
  }

  const handleAsignarSalon = (id) => {
    setEditingId(id);
    setVista(VISTA.ASIGNAR_SALON);
  };

  const handleRegresar = () => {
    setEditingId(null);
    setVista(VISTA.TABLA)
  }

  const getDatosProfesor = () => {
    if (!profesores || profesores.length === 0) return [];

    return profesores.map((profesor, index) => {
      const esEdicion = editingId === profesor.id;

      return [
        index + (page - 1) * limit + 1,
        profesor.courseName || "-",
        <EditableCell
          editable={esEdicion}
          name="nombres"
          value={esEdicion ? editFormData.nombres : profesor.firstName}
          onChange={handleEditChange}
        />,
        <EditableCell
          editable={esEdicion}
          name="apellidos"
          value={esEdicion ? editFormData.apellidos : profesor.lastName}
          onChange={handleEditChange}
        />,
        <EditableCell
          editable={esEdicion}
          name="correo"
          value={esEdicion ? editFormData.correo : profesor.email}
          onChange={handleEditChange}
          type="email"
        />,
        <EditableCell
          editable={esEdicion}
          name="numero"
          value={esEdicion ? editFormData.numero : profesor.phone}
          onChange={handleEditChange}
        />,
        esEdicion ? (
          <div className="flex gap-2 justify-center min-w-[300px]">
            <Button onClick={() => handleGuardar(profesor.id)}>Guardar</Button>
            <ButtonNegative onClick={() => setEditingId(null)}>Cancelar</ButtonNegative>
          </div>
        ) : (
          <div className="flex gap-2 justify-center min-w-[300px]">
            <Button onClick={() => handleAsignarSalon(profesor.id)}>Asignar Salón</Button>
            <Button onClick={() => handleModificar(profesor.id)}>Editar</Button>
            <ButtonNegative onClick={() => handleBorrar(profesor.id)}>Borrar</ButtonNegative>
          </div>
        )
      ];
    });
  }

  if (vista === VISTA.ASIGNAR_SALON) {
    return (
      <AsignarSalonDoc
        idDocente={editingId}
        regresar={handleRegresar}
      />
    )
  }

  if (vista === VISTA.FORMULARIO) {
    return (
      <AgregarUsuarios
        rol="Docente"
        formData={editFormData}
        handleChange={(e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value })}
        handleGuardarNuevoUsuario={handleNuevoUsuario}
        setVista={setVista}
      />
    );
  }

  return (
    <div className="overflow-x-auto w-full text-center">
      <div className="relative flex justify-center items-center py-2">
        <Button onClick={refetch}>
          <FaSyncAlt />
        </Button>
        <h2 className="text-2xl font-bold">GESTIÓN DE DOCENTES</h2>
        <Button onClick={handleAgregar}>Agregar Docente</Button>
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
  )
};
