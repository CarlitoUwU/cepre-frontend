import React, { useState, useEffect } from "react";
import { Tabla } from "@/components/ui/Tabla";
import { Button } from "@/components/ui/Button";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Input } from "@/components/ui/Input";
import { AgregarUsuarios } from "../AgregarUsuarios";
import { useMonitores } from "@/hooks/useMonitores";
import { SkeletonTabla } from "@/components/skeletons/SkeletonTabla";
import { toast } from "react-toastify";

const encabezado = ["N°", "Salón", "Nombres", "Apellidos", "Correo", "Número", "Acciones"];
const VISTA = {
  TABLA: "tabla",
  FORMULARIO: "formulario",
}

export const MonitorUsuarios = () => {
  const [vista, setVista] = useState(VISTA.TABLA);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const {
    monitores,
    totalPages,
    isLoading,
    isError,
    actualizarMonitorMutation,
    eliminarMonitorMutation,
  } = useMonitores({ page, limit });
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
    if (isError && (!monitores || monitores.length === 0)) {
      toast.error("Error al obtener los docentes");
    }
  }, [isError, monitores]);

  const handleModificar = (id) => {
    const monitor = monitores.find((monitor) => monitor.id === id);
    if (monitor) {
      setEditingId(id);
      setEditFormData({
        nombres: monitor.firstName || "-",
        apellidos: monitor.lastName || "-",
        correo: monitor.personalEmail || "-",
        numero: monitor.phone || "-",
      });
    }
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    try {
      const monitor = {
        userId: editingId,
        firstName: editFormData.nombres,
        lastName: editFormData.apellidos,
        personalEmail: editFormData.correo,
        phone: editFormData.numero,
      };

      const monitorActualizado = await actualizarMonitorMutation.mutateAsync(monitor);
      if (monitorActualizado) {
        toast.success("Monitor actualizado correctamente");
        setEditingId(null);
        setEditFormData({
          nombres: "",
          apellidos: "",
          correo: "",
          numero: "",
        });
      }
    } catch (error) {
      toast.error("Error al actualizar monitor");
      console.error("Error al actualizar monitor:", error);
    }
  };

  const handleBorrar = (id) => {
    try {
      const monitorEliminado = eliminarMonitorMutation.mutateAsync(id);
      if (monitorEliminado) {
        toast.success("Monitor eliminado correctamente");
      }
    }
    catch (error) {
      toast.error("Error al eliminar el monitor");
      console.error("Error al eliminar el monitor:", error);
    }
  };

  const getDatosMonitores = () => {
    if (!monitores || monitores.length === 0) return [];

    return monitores.map((monitor, index) => {
      const esEdicion = editingId === monitor.id;

      return [
        index + (page - 1) * limit + 1,
        monitor.salon || "-",
        esEdicion ? (
          <Input type="text" name="nombres" value={editFormData.nombres} onChange={handleEditChange} />
        ) : (
          monitor.firstName || "-"
        ),
        esEdicion ? (
          <Input type="text" name="apellidos" value={editFormData.apellidos} onChange={handleEditChange} />
        ) : (
          monitor.lastName || "-"
        ),
        esEdicion ? (
          <Input type="email" name="correo" value={editFormData.correo} onChange={handleEditChange} />
        ) : (
          monitor.personalEmail || "-"
        ),
        esEdicion ? (
          <Input type="text" name="numero" value={editFormData.numero} onChange={handleEditChange} />
        ) : (
          monitor.phone || "-"
        ),
        esEdicion ? (
          <div className="flex gap-2 justify-center">
            <Button onClick={() => handleGuardar(monitor.id)}>Guardar</Button>
            <ButtonNegative onClick={() => setEditingId(null)}>Cancelar</ButtonNegative>
          </div>
        ) : (
          <div className="flex gap-2 justify-center">
            <Button onClick={() => handleModificar(monitor.id)}>Modificar</Button>
            <ButtonNegative onClick={() => handleBorrar(monitor.id)}>Borrar</ButtonNegative>
          </div>
        )
      ];
    });
  }

  if (vista === VISTA.FORMULARIO) {
    return (
      <AgregarUsuarios
        rol="Monitor"
        formData={editFormData}
        handleChange={(e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value })}
        handleGuardarNuevoUsuario={() => { }}
        setVista={setVista}
      />
    );
  }

  return (
    <div className="overflow-x-auto w-full text-center">
      <div className="relative flex justify-center items-center py-2">
        <h2 className="text-2xl font-bold">GESTIÓN DE MONITORES</h2>
      </div>
      {isLoading ? <SkeletonTabla numRows={6} /> :
        <Tabla encabezado={encabezado} datos={getDatosMonitores()} />
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