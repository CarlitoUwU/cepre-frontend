import React, { useState, useEffect } from "react";
import { Tabla } from "@/components/ui/Tabla";
import { Button } from "@/components/ui/Button";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Input } from "@/components/ui/Input";
import { AgregarUsuarios } from "../AgregarUsuarios";
import { AsignarSalonSup } from "./AsignarSalonSup";
import { useSupervisores } from "@/hooks/useSupervisores";
import { toast } from "react-toastify";
import { SkeletonTabla } from "@/components/skeletons/SkeletonTabla";

const encabezado = ["N°", "Nombres", "Apellidos", "Correo", "Número", "Acciones"];
const VISTA = {
  TABLA: "tabla",
  ASIGNAR_SALON: "asignarSalonSup",
}

export const SupervisorUsuarios = () => {
  const [vista, setVista] = useState(VISTA.TABLA);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const {
    supervisores,
    totalPages,
    isLoading,
    isError,
    actualizarSupervisorMutation,
    eliminarSupervisorMutation,
  } = useSupervisores({ page, limit });
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    numero: "",
  });

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleLimitChange = (e) => setLimit(e.target.value);

  useEffect(() => {
    if (isError && (!supervisores || supervisores.length === 0)) {
      toast.error("Error al obtener los supervisores");
    }
  }, [isError, supervisores]);

  const handleModificar = (id) => {
    const supervisor = supervisores.find((supervisor) => supervisor.id === id);
    if (supervisor) {
      setEditingId(id);
      setEditFormData({
        nombres: supervisor.firstName || "-",
        apellidos: supervisor.lastName || "-",
        correo: supervisor.personalEmail || "-",
        numero: supervisor.phone || "-",
      });
    }
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    try {
      const supervisor = {
        userId: editingId,
        firstName: editFormData.nombres,
        lastName: editFormData.apellidos,
        personalEmail: editFormData.correo,
        phone: editFormData.numero,
      };

      const supervisorActualizado = await actualizarSupervisorMutation.mutateAsync(supervisor);
      if (supervisorActualizado) {
        toast.success("Supervisor actualizado correctamente");
        setEditingId(null);
        setEditFormData({
          nombres: "",
          apellidos: "",
          correo: "",
          numero: "",
        });
      }
    } catch (error) {
      toast.error("Error al actualizar supervisor");
      console.error("Error al actualizar supervisor:", error);
    }
  };

  const handleBorrar = async (id) => {
    try {
      const supervisorEliminado = await eliminarSupervisorMutation.mutateAsync(id);
      if (supervisorEliminado) {
        toast.success("Supervisor eliminado correctamente");
      }
    }
    catch (error) {
      toast.error("Error al eliminar el supervisor");
      console.error("Error al eliminar el supervisor:", error);
    }
  };

  const handleAsignarSalonSup = (id) => {
    setEditingId(id);
    setVista(VISTA.ASIGNAR_SALON);
  }

  const handleRegresar = () => {
    setEditingId(null);
    setVista(VISTA.TABLA);
  }

  const getDatosSupervisores = () => {
    if (!supervisores || supervisores.length === 0) return [];

    return supervisores.map((supervisor, index) => {
      const esEdicion = editingId === supervisor.id;

      return [
        index + (page - 1) * limit + 1,
        esEdicion ? (
          <Input type="text" name="nombres" value={editFormData.nombres} onChange={handleEditChange} />
        ) : (
          supervisor.firstName || "-"
        ),
        esEdicion ? (
          <Input type="text" name="apellidos" value={editFormData.apellidos} onChange={handleEditChange} />
        ) : (
          supervisor.lastName || "-"
        ),
        esEdicion ? (
          <Input type="email" name="correo" value={editFormData.correo} onChange={handleEditChange} />
        ) : (
          supervisor.personalEmail || "-"
        ),
        esEdicion ? (
          <Input type="text" name="numero" value={editFormData.numero} onChange={handleEditChange} />
        ) : (
          supervisor.phone || "-"
        ),
        esEdicion ? (
          <div className="flex gap-2 justify-center">
            <Button onClick={() => handleGuardar(supervisor.id)}>Guardar</Button>
            <ButtonNegative onClick={() => setEditingId(null)}>Cancelar</ButtonNegative>
          </div>
        ) : (
          <div className="flex gap-2 justify-center">
            <Button onClick={() => handleAsignarSalonSup(supervisor.id)}>Asignar Salón</Button>
            <Button onClick={() => handleModificar(supervisor.id)}>Modificar</Button>
            <ButtonNegative onClick={() => handleBorrar(supervisor.id)}>Borrar</ButtonNegative>
          </div>
        )
      ];
    });
  }

  if (vista === VISTA.ASIGNAR_SALON) {
    return (
      <AsignarSalonSup
        regresar={handleRegresar}
        idSupervisor={editingId}
      />
    )
  }

  return (
    <div className="overflow-x-auto w-full text-center">
      <div className="relative flex justify-center items-center py-2">
        <h2 className="text-2xl font-bold">GESTIÓN DE SUPERVISORES</h2>
      </div>
      {isLoading ? <SkeletonTabla numRows={6} /> :
        <Tabla encabezado={encabezado} datos={getDatosSupervisores()} />
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
