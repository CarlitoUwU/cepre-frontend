import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Tabla } from "@/components/ui/Tabla";
import { SupervisorsServices } from "@/services/SupervisorsServices";
import { DetallesMonitor } from "./DetallesMonitor";
import { Button } from "@/components/ui/Button";

const ESTADO = {
  "INDEX": "INDEX",
  "DETALLES": "DETALLES",
}

export const SupervisorPanel = () => {
  const [aulasData, setAulasData] = useState([]);
  const [estado, setEstado] = useState(ESTADO.INDEX);
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const cambiarVistaHorario = useCallback(() => setEstado(ESTADO.HORARIO), []);
  const cambiarVistaDirectorio = useCallback(() => setEstado(ESTADO.DIRECTORIO), []);
  const volverAlIndex = useCallback(() => setEstado(ESTADO.INDEX), []);

  const fetchMonitorData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await SupervisorsServices.getMonitors();
      if (!Array.isArray(response)) {
        throw new Error("La respuesta de la API no es válida");
      }

      const data = response.map((clase) => ({
        id: clase?.user_id || "Sin ID",
        aula: clase?.classes?.name || "Sin clase",
        monitor: `${clase?.profile?.firstName || "Desconocido"} ${clase?.profile?.lastName || ""}`.trim(),
        enlace: clase?.classes?.urlMeet || "",
      }));

      setAulasData(data);
    } catch (err) {
      console.error("Error al obtener monitores:", err);
      setError("No se pudieron cargar los datos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonitorData();
  }, []);

  const datosAulas = useMemo(() => {
    return aulasData.map((aula, index) => [
      index + 1,
      aula.aula,
      aula.monitor,
      <a
        href={aula.enlace}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline hover:text-blue-700"
      >
        {aula.enlace}
      </a>,
      <div className="inline-flex gap-4">
        <Button onClick={() => { setSelectedSalon(aula); setEstado(ESTADO.DETALLE); }}>
          <span className="block sm:hidden">Ver Detalles</span> {/* Texto para celular */}
          <span className="hidden sm:block">Ver Detalles del Salón</span> {/* Texto para pantallas más grandes */}
        </Button>
    </div>
    ]);
  }, [aulasData]);

  if (loading) return <p className="text-center text-gray-500">Cargando datos...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-0 sm:p-5 text-sm sm:text-base">
      <div className="bg-gray-100 p-3 sm:p-5 rounded-none sm:rounded-md shadow-md overflow-x-auto text-center">
      <h1 className="text-2xl font-bold text-center mb-6">
        {estado === ESTADO.DETALLE && selectedSalon
          ? `Aula ${selectedSalon.aula || "Desconocida"}`
          : "Panel de Supervisor"}
      </h1>

  
        {estado === ESTADO.INDEX && (
          <Tabla encabezado={["N°", "Aula", "Monitor", "Enlace", "Acciones"]} datos={datosAulas} index_key={0} />
        )}

        {estado === ESTADO.DETALLE && (
          <DetallesMonitor aula={selectedSalon} volver={volverAlIndex} />
        )}
      </div>
    </div>
  );
  
};
