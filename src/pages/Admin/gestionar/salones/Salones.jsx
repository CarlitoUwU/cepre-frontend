import React, { useState, useMemo } from "react";
import { Tabla } from "@/components/ui/Tabla";
import { Button } from "@/components/ui/Button";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { AgregarSalon } from "./AgregarSalon";
import { toast } from "react-toastify";
import { useClases } from "@/hooks/useClases";
import { useAreas } from "@/hooks/useAreas";
import { useTurnos } from "@/hooks/useTurnos";
import { SkeletonTabla } from "@/components/skeletons/SkeletonTabla";
import { EditarSalon } from "./EditarSalon";
import { FaSyncAlt } from "react-icons/fa";

const encabezadoCursos = ["N° de Aula", "Área", "Turno", "Estado", "Acciones"];
const VISTAS = {
  LISTA: "lista",
  AGREGAR: "agregar",
  EDITAR: "editar"
};

export const Salones = () => {
  const {
    clases,
    isLoading: isLoadingClases,
    eliminarClaseMutation,
    crearClaseMutation,
    refetch
  } = useClases();

  const { areas, isLoading: isLoadingAreas } = useAreas();
  const { turnos, isLoading: isLoadingTurnos } = useTurnos();

  const [salonAEditar, setSalonAEditar] = useState(null);
  const [vistaActual, setVistaActual] = useState(VISTAS.LISTA);

  // 🔄 Paginación
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1); // resetear a la primera página al cambiar el límite
  };

  const filtro = useMemo(() => {
    if (!areas?.length || !turnos?.length) return {};
    return {
      1: areas.map((a) => a.name),
      2: turnos.map((t) => t.name),
      3: ["Listo", "Falta Docentes"]
    };
  }, [areas, turnos]);

  const handleBorrar = async (id) => {
    try {
      await eliminarClaseMutation.mutateAsync(id);
      toast.success("Salón eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el aula:", error);
      toast.error("Error al eliminar el salón");
    }
  };

  const handleAgregarSalon = async (nuevoSalon) => {
    try {
      const claseCreada = await crearClaseMutation.mutateAsync(nuevoSalon);
      toast.success(`Curso "${claseCreada.name}" creado correctamente`);
      setVistaActual(VISTAS.LISTA);
    } catch (error) {
      console.error("Error al agregar el curso:", error);
      toast.error("Error al crear el curso");
    }
  };

  const handleAgregar = () => {
    setVistaActual(VISTAS.AGREGAR);
  };

  const handleEditar = (aula) => {
    setSalonAEditar(aula?.id);
    setVistaActual(VISTAS.EDITAR);
  };

  const handleRegresar = () => {
    setVistaActual(VISTAS.LISTA);
  };

  const getAcciones = (aula) => (
    <div className="inline-flex gap-10">
      <Button onClick={() => handleEditar(aula)}>Editar</Button>
      <ButtonNegative onClick={() => handleBorrar(aula.id)}>Borrar</ButtonNegative>
    </div>
  );

  const getDatosAulas = () => {
    if (!clases || !Array.isArray(clases)) return [];

    const start = (page - 1) * limit;
    const end = start + limit;

    return clases.slice(start, end).map((aula) => [
      aula.name || "Sin nombre",
      aula.area?.name || "Sin área",
      aula.shift?.name || "Sin turno",
      aula.estado || "Sin estado",
      getAcciones(aula),
    ]);
  };

  const totalPages = Math.ceil((clases?.length || 0) / limit);

  if (vistaActual === VISTAS.AGREGAR) {
    return <AgregarSalon onAgregarSalon={handleAgregarSalon} regresar={handleRegresar} areas={areas} turnos={turnos} />;
  }

  if (vistaActual === VISTAS.EDITAR) {
    return <EditarSalon idSalon={salonAEditar} regresar={handleRegresar} />;
  }

  return (
    <div className="overflow-x-auto w-full text-center">
      <div className="flex justify-between items-center mt-1 mb-6 px-4">
        <Button onClick={refetch}>
          <FaSyncAlt />
        </Button>
        <h2 className="text-2xl font-bold text-center flex-1">GESTIÓN DE SALONES</h2>
        <Button onClick={handleAgregar}>Agregar Salón</Button>
      </div>

      {isLoadingAreas || isLoadingTurnos || isLoadingClases ? (
        <SkeletonTabla numRows={6} />
      ) : (
        <>
          <Tabla encabezado={encabezadoCursos} datos={getDatosAulas()} filtroDic={filtro} />
          <div className="flex justify-between mt-4 px-4">
            <Button onClick={handlePrev} disabled={page === 1}>
              Anterior
            </Button>
            <Button onClick={handleNext} disabled={page >= totalPages}>
              Siguiente
            </Button>
            <select value={limit} onChange={handleLimitChange} className="border border-gray-300 rounded p-2">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};
