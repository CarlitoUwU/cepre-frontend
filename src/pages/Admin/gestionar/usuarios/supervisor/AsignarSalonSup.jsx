import React, { useState, useMemo } from "react";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Tabla } from "@/components/ui/Tabla";
import { SkeletonTabla } from "@/components/skeletons/SkeletonTabla";
import { Button } from "@/components/ui/Button";
import { useMonitoresSupervisores } from "@/hooks/useMonitoresSupervisores";
import { toast } from "react-toastify";
import { useAreas } from "@/hooks/useAreas";

// Constantes
const AREAS = {
  1: "Biomédicas",
  2: "Ingenierías",
  3: "Sociales"
};

const encabezado = ["N°", "Salón", "Monitor", "Área", "Acciones"];

export const AsignarSalonSup = ({ supervisor, regresar }) => {
  // Estados
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [area_id, setAreaId] = useState(null);
  const [selected, setSelected] = useState({});
  const {
    monitoresAsignados,
    monitoresDisponibles,
    totalPages,
    isLoadingAsignados,
    isLoadingDisponibles,
    asignarMonitorMutation,
    quitarMonitorMutation
  } = useMonitoresSupervisores({ supervisorId: supervisor?.id, shiftId: supervisor?.shiftId, page, limit, area_id })
  const { areas } = useAreas();
  const [asignandoId, setAsignandoId] = useState(null);
  const [quitandoId, setQuitandoId] = useState(null);
  const [error, setError] = useState(null);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleLimitChange = (e) => setLimit(e.target.value);

  const filtro = useMemo(() => {
    if (!areas?.length) return {};

    return {
      3: {
        options: areas.map((a) => a.name),
        onChange: (area_name) => {
          setTimeout(() => {
            const area = areas.find((a) => a.name === area_name[0]);
            const index = areas.indexOf(area);
            setSelected({ 3: index });
            setAreaId(area?.id || null);
          }, 0);
        }
      },
    };
  }, [areas]);

  const handleAsignarMonitor = async (monitorId) => {
    setAsignandoId(monitorId);
    try {
      await asignarMonitorMutation.mutateAsync({ monitorId, supervisorId: supervisor?.id });
      toast.success("Monitor asignado correctamente");
    } catch (err) {
      toast.error("Error al asignar monitor");
      console.error(err);
    }
    setAsignandoId(null);
  };

  // Quitar monitor
  const handleQuitarMonitor = async (monitorId) => {
    setQuitandoId(monitorId)
    try {
      await quitarMonitorMutation.mutateAsync({ monitorId });
      toast.success("Monitor quitado correctamente");
    } catch (err) {
      toast.error("Error al quitar monitor");
      console.error(err);
    }
    setQuitandoId(null)
  };

  const filasAsignados = () => {
    return monitoresAsignados.map((monitor, index) => {
      const isSinAsignar =
        (monitor.firstName?.toLowerCase() === 'no asignado') &&
        (monitor.lastName?.toLowerCase() === 'no asignado');

      const nombre = isSinAsignar
        ? 'Sin nombre'
        : `${monitor.firstName || ''} ${monitor.lastName || ''}`;

      return [
        index + 1,
        monitor.className || 'Sin salón',
        nombre,
        monitor.areaName || 'Sin área',
        <button
          key={`remove-${monitor?.monitorId}`}
          className={`bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition cursor-pointer select-none ${quitandoId === monitor?.monitorId ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handleQuitarMonitor(monitor?.monitorId)}
          disabled={quitandoId === monitor?.monitorId}
        >
          {quitandoId === monitor?.monitorId ? 'Quitando...' : 'Quitar'}
        </button>
      ];
    });
  };


  const filasDisponibles = () => {
    return monitoresDisponibles.map((monitor, index) => {
      const isSinAsignar =
        (monitor.firstName?.toLowerCase() === 'no asignado') &&
        (monitor.lastName?.toLowerCase() === 'no asignado');

      const nombre = isSinAsignar
        ? 'Sin nombre'
        : `${monitor.firstName || ''} ${monitor.lastName || ''}`;

      return [
        index + 1,
        monitor.className || 'Sin salón',
        nombre,
        monitor.areaName || 'Sin área',
        <button
          key={`assign-${monitor?.monitorId}`}
          className={`bg-[#78211E] text-white px-3 py-2 rounded hover:bg-[rgb(90,24,21)] cursor-pointer select-none ${asignandoId === monitor?.monitorId ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handleAsignarMonitor(monitor?.monitorId)}
          disabled={asignandoId === monitor?.monitorId}
        >
          {asignandoId === monitor?.monitorId ? 'Asignando...' : 'Asignar'}
        </button>
      ];
    });
  };

  return (
    <div className="overflow-x-auto w-full text-center p-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}

      <div className="relative flex justify-center items-center py-2">
        <h2 className="text-2xl font-bold">Asignación de monitores a salones</h2>
      </div>

      {/* Tabla de monitores asignados */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Monitores asignados</h3>
        {isLoadingAsignados ? (<SkeletonTabla numRows={6} numColums={encabezado.length} />) : (
          <Tabla encabezado={encabezado} datos={filasAsignados()} />
        )}
      </div>

      {/* Tabla de monitores disponibles */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Monitores disponibles</h3>
        {isLoadingDisponibles ? (<SkeletonTabla numRows={6} numColums={encabezado.length} />) : (
          <Tabla encabezado={encabezado} datos={filasDisponibles()} filtroDic={filtro} selected={selected} filtrar={false} />
        )}
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
      <div className="flex justify-center mt-4">
        <ButtonNegative onClick={regresar}>Atrás</ButtonNegative>
      </div>
    </div >
  );
};