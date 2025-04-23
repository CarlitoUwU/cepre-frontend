import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Tabla } from "@/components/ui/Tabla";
import { useClases } from "@/hooks/useClases";
import { SupervisorsServices } from "@/services/SupervisorsServices";

export const AsignarSalonSup = ({ idSupervisor, regresar }) => {
  // Estados
  const { clases: todosMonitores = [], isLoading: loadingMonitores } = useClases();
  const [monitoresAsignados, setMonitoresAsignados] = useState([]);
  const [monitoresDisponibles, setMonitoresDisponibles] = useState([]);
  const [loadingAsignados, setLoadingAsignados] = useState(true);
  const [filtroArea, setFiltroArea] = useState("Todos");
  const [error, setError] = useState(null);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [asignandoId, setAsignandoId] = useState(null);
  const [quitandoId, setQuitandoId] = useState(null);

  // Constantes
  const AREAS = {
    1: "Biomédicas",
    2: "Ingenierías",
    3: "Sociales"
  };

  // Normalización de datos
  const normalizeMonitor = useCallback((monitor) => {
    if (!monitor) return null;
    
    return {
      id: monitor.id?.toString(),
      name: monitor.name?.toString() || '',
      code: monitor.code?.toString() || '',
      dni: monitor.dni?.toString() || '',
      area: AREAS[monitor.areaId] || 'Sin área',
      classroom: monitor.classroom?.toString() || 'Sin asignar'
    };
  }, []);

  // Carga inicial de datos
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [assignedResponse, allMonitors] = await Promise.all([
          SupervisorsServices.getMonitors(idSupervisor),
          Promise.resolve(todosMonitores)
        ]);

        const assigned = Array.isArray(assignedResponse) 
          ? assignedResponse.map(normalizeMonitor).filter(Boolean)
          : [];

        const available = allMonitors
          .map(normalizeMonitor)
          .filter(Boolean)
          .filter(m => !assigned.some(a => a.id === m.id));

        setMonitoresAsignados(assigned);
        setMonitoresDisponibles(available);
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Error al cargar datos");
      } finally {
        setLoadingAsignados(false);
      }
    };

    loadInitialData();
  }, [idSupervisor, todosMonitores, normalizeMonitor]);

  // Filtrado de monitores
  const monitoresFiltrados = useMemo(() => {
    return filtroArea === "Todos" 
      ? monitoresDisponibles 
      : monitoresDisponibles.filter(m => m.area === filtroArea);
  }, [monitoresDisponibles, filtroArea]);

  // Asignar monitor
  const handleAsignarMonitor = useCallback(async (monitorId) => {
    try {
      setError(null);
      setAsignandoId(monitorId);
      
      // Validación básica de IDs
      if (!monitorId || !idSupervisor) {
        throw new Error("IDs no válidos");
      }

      // Buscar el monitor
      const monitor = todosMonitores
        .map(normalizeMonitor)
        .find(m => m.id === monitorId);

      if (!monitor) {
        throw new Error("Monitor no encontrado");
      }

      // Verificar si ya está asignado
      if (monitoresAsignados.some(m => m.id === monitorId)) {
        throw new Error("El monitor ya está asignado");
      }

      // Llamar al servicio
      const response = await SupervisorsServices.asignarMonitor(
        idSupervisor,
        monitorId
      );

      if (!response?.success) {
        throw new Error(response?.message || "Error en la asignación");
      }

      // Actualización optimista
      setMonitoresDisponibles(prev => prev.filter(m => m.id !== monitorId));
      setMonitoresAsignados(prev => [...prev, { ...monitor, classroom: 'Asignado' }]);
      
    } catch (error) {
      console.error("Error en asignación:", error);
      setError(error.message);
      
      // Recargar datos para mantener consistencia
      const freshData = await SupervisorsServices.getMonitors(idSupervisor);
      setMonitoresAsignados(freshData.map(normalizeMonitor).filter(Boolean));
    } finally {
      setAsignandoId(null);
    }
  }, [idSupervisor, todosMonitores, monitoresAsignados, normalizeMonitor]);

  // Quitar monitor
  const handleQuitarMonitor = useCallback(async (monitorId) => {
    try {
      setError(null);
      setQuitandoId(monitorId);
      
      await SupervisorsServices.quitarMonitor(monitorId);
      
      // Actualizar con datos frescos
      const [freshAssigned, freshAvailable] = await Promise.all([
        SupervisorsServices.getMonitors(idSupervisor),
        Promise.resolve(todosMonitores)
      ]);

      setMonitoresAsignados(freshAssigned.map(normalizeMonitor).filter(Boolean));
      setMonitoresDisponibles(
        freshAvailable
          .map(normalizeMonitor)
          .filter(Boolean)
          .filter(m => !freshAssigned.some(a => a.id === m.id))
      );

    } catch (error) {
      console.error("Removal error:", error);
      setError("Error al quitar monitor");
    } finally {
      setQuitandoId(null);
    }
  }, [idSupervisor, todosMonitores, normalizeMonitor]);

  // Renderizado de filas
  const formatMonitorRow = useCallback((monitor, index, withAction) => {
    const rowData = [
      index + 1,
      monitor.name || 'Sin nombre',
      "", // Columna Monitor vacía
      monitor.area
    ];

    rowData.push(
      withAction ? (
        <button
          key={`remove-${monitor.id}`}
          className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 ${quitandoId === monitor.id ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handleQuitarMonitor(monitor.id)}
          disabled={quitandoId === monitor.id}
        >
          {quitandoId === monitor.id ? 'Quitando...' : 'Quitar'}
        </button>
      ) : (
        <button
          key={`assign-${monitor.id}`}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${asignandoId === monitor.id ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handleAsignarMonitor(monitor.id)}
          disabled={asignandoId === monitor.id}
        >
          {asignandoId === monitor.id ? 'Asignando...' : 'Asignar'}
        </button>
      )
    );

    return rowData;
  }, [asignandoId, quitandoId, handleAsignarMonitor, handleQuitarMonitor]);

  // Renderizado del encabezado de área
  const renderAreaHeader = useCallback(() => (
    <div className="flex items-center justify-center">
      <span>Área</span>
      <div className="relative ml-2">
        <img 
          src="/flecha-abajo.png" 
          alt="Filtrar áreas"
          className="w-4 h-4 cursor-pointer transition-transform"
          onClick={(e) => {
            e.stopPropagation();
            setShowAreaDropdown(prev => !prev);
          }}
          style={{ transform: showAreaDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
        {showAreaDropdown && (
          <div className="absolute left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 w-32">
            <div 
              className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-sm text-black"
              onClick={() => {
                setFiltroArea("Todos");
                setShowAreaDropdown(false);
              }}
            >
              Todos
            </div>
            {Object.entries(AREAS).map(([id, nombre]) => (
              <div 
                key={id}
                className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-sm text-black"
                onClick={() => {
                  setFiltroArea(nombre);
                  setShowAreaDropdown(false);
                }}
              >
                {nombre}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  ), [showAreaDropdown]);

  // Estados de carga
  if (loadingMonitores || loadingAsignados) {
    return <div className="text-center p-6">Cargando datos...</div>;
  }

  return (
    <div className="overflow-x-auto w-full text-center p-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </span>
        </div>
      )}

      <div className="relative flex justify-center items-center py-2">
        <h2 className="text-2xl font-bold">Asignación de monitores a salones</h2>
      </div>

      {/* Tabla de monitores disponibles */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Monitores disponibles</h3>
        {monitoresFiltrados.length > 0 ? (
          <Tabla
            encabezado={["N°", "Salón", "Monitor", renderAreaHeader(), "Acciones"]}
            datos={monitoresFiltrados.map((m, i) => formatMonitorRow(m, i, false))}
          />
        ) : (
          <p className="text-center text-gray-500">No hay monitores disponibles.</p>
        )}
      </div>

      {/* Tabla de monitores asignados */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Monitores asignados</h3>
        {monitoresAsignados.length > 0 ? (
          <Tabla
            encabezado={["N°", "Salón", "Monitor", "Área", "Acciones"]}
            datos={monitoresAsignados.map((m, i) => formatMonitorRow(m, i, true))}
          />
        ) : (
          <p className="text-center text-gray-500">No hay monitores asignados.</p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <ButtonNegative onClick={regresar}>Atrás</ButtonNegative>
      </div>
    </div>
  );
};