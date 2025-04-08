import React, { useState, useMemo } from "react";
import { Tabla } from "@/components/ui/Tabla";
import { Button } from "@/components/ui/button.tsx";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Select } from "@/components/ui/Select";
import { AgregarSalon } from "./AgregarSalon"; // Importa el componente de agregar salón
import { toast } from "react-toastify";
import { useClases } from "@/hooks/useClases";
import { useAreas } from "@/hooks/useAreas";
import { useTurnos } from "@/hooks/useTurnos";
import { SkeletonTabla } from "@/components/skeletons/SkeletonTabla";

const encabezadoCursos = ["N° de Aula", "Área", "Turno", "Estado", "Acciones"];

export const Salones = () => {
  const {
    clases,
    isLoading: isLoadingClases,
    isError: isErrorClases,
    eliminarClaseMutation,
    crearClaseMutation,
  } = useClases();
  const { areas, isLoading: isLoadingAreas, isError: isErrorAreas } = useAreas();
  const { turnos, isLoading: isLoadingTurnos, isError: isErrorTurnos } = useTurnos();

  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({ name: "", areaId: 0, turnoId: 0 });
  const [vistaActual, setVistaActual] = useState("lista"); // Estado para cambiar entre lista y agregar

  const filtro = useMemo(() => {
    if (!areas.length || !turnos.length) return {};
    return {
      1: areas.map((a) => a.name),
      2: turnos.map((t) => t.name),
      3: ["Listo", "Falta Docentes"]
    };
  }, [areas, turnos]);


  const handleModificar = (aula) => {
    setEditandoId(aula.id);
    setFormData({ name: aula.name, areaId: areas.find(a => a.name === aula.area)?.id, turnoId: turnos.find(t => t.name === aula.turno)?.id });
  };

  const handleGuardar = async () => {
    /* const area = areas.find(a => a.id === parseInt(formData.areaId));

    const dataClase = {
      id: editandoId,
      name: `${area.name[0]}-${formData.name.slice(2)}`,
      areaId: area.id,
      shiftId: parseInt(formData.turnoId),
    }

    let claseActualizada = await ClassesServices.updateClass(dataClase);
    claseActualizada = {
      ...claseActualizada,
      area: claseActualizada.area.name,
      turno: claseActualizada.shift.name,
      estado: "Listo",
    }

    //setAulas(aulas.map(a => (a.id === editandoId ? { ...claseActualizada } : a)));
    setEditandoId(null);
    setFormData({ name: "", areaId: 0, turnoId: 0 }); */
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setFormData({ name: "", areaId: 0, turnoId: 0 });
  };

  const handleBorrar = async (id) => {
    console.log("ID a eliminar:", id);

    try {
      const claseEliminada = await eliminarClaseMutation.mutateAsync(id);  // retornara "" si se elimino correctamente

      if (claseEliminada) {
        console.log("Clase eliminada:", claseEliminada);
      }
    } catch (error) {
      console.error("Error al eliminar el aula:", error);
    }
  };

  const handleAgregarSalon = async (nuevoSalon) => {
    try {
      const claseCreada = await crearClaseMutation.mutateAsync(nuevoSalon);

      if (claseCreada) {
        toast.success(`Curso "${claseCreada.name}" creado correctamente`);
        setVistaActual("lista");
      }
    } catch (error) {
      toast.error("Error al crear el curso");
      console.error("Error al agregar el curso:", error);
    }
  };

  const getAcciones = (aula) =>
    editandoId === aula.id ? (
      <div className="inline-flex gap-10">
        <Button onClick={handleGuardar}>Guardar</Button>
        <ButtonNegative onClick={handleCancelar}>Cancelar</ButtonNegative>
      </div>
    ) : (
      <div className="inline-flex gap-10">
        <Button onClick={() => handleModificar(aula)}>Modificar</Button>
        <ButtonNegative onClick={() => handleBorrar(aula.id)}>Borrar</ButtonNegative>
      </div>
    );

  const getDatosAulas = () => {
    return clases.map((aula) => [
      aula.name,
      editandoId === aula.id ? (
        <Select
          name="areaId"
          value={formData.areaId}
          onChange={(e) => setFormData({ ...formData, areaId: e.target.value })}
          options={areas}
        />
      ) : (
        aula.area.name
      ),
      editandoId === aula.id ? (
        <Select
          name="turnoId"
          value={formData.turnoId}
          onChange={(e) => setFormData({ ...formData, turnoId: e.target.value })}
          options={turnos}
        />
      ) : (
        aula.shift.name
      ),
      aula.estado || "Sin estado",
      getAcciones(aula),
    ]);
  };

  // Si la vista es "agregar", mostrar el formulario de AgregarSalon
  if (vistaActual === "agregar") {
    return <AgregarSalon onAgregarSalon={handleAgregarSalon} setVistaActual={setVistaActual} areas={areas} turnos={turnos} />;
  }

  return (
    <div className="overflow-x-auto w-full text-center">
      {/* Contenedor para el título y el botón */}
      <div className="flex justify-between items-center mt-1 mb-6 px-4">
        <h2 className="text-2xl font-bold text-center flex-1">GESTIÓN DE SALONES</h2>
        <Button onClick={() => setVistaActual("agregar")}>Agregar Salón</Button>
      </div>

      {/* Tabla reutilizable */}
      {isLoadingAreas || isLoadingTurnos || isLoadingClases ? (
        <SkeletonTabla />
      ) : isErrorClases || isErrorAreas || isErrorTurnos ? (
        <div>Error al cargar los salones</div>
      ) : (
        <Tabla encabezado={encabezadoCursos} datos={getDatosAulas()} filtroDic={filtro} />
      )}
    </div>
  );
};