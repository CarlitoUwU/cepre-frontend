import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Tabla } from "@/components/ui/Tabla";
import SupervisorsServices from "@/services/SupervisorsServices";
import { HorarioMonitorPanel } from "./HorarioMonitorPanel";
import { DirectorioMonitorPanel } from "./DirectorioMonitorPanel";

const ESTADO = {
  "INDEX": "INDEX",
  "HORARIO": "HORARIO",
  "DIRECTORIO": "DIRECTORIO",
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
        id: "e4bd595e-9b1b-4c14-ad6e-d98a66dc6ffe", //clase?.id || "Sin ID",
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
        <button
          onClick={() => {
            setSelectedSalon(aula);
            setEstado(ESTADO.HORARIO);
          }}
          className="bg-[#78211E] text-white px-4 py-2 rounded hover:bg-[#5a1815]"
        >
          Visualizar Horario
        </button>

        <button
          onClick={() => {
            setEstado(ESTADO.DIRECTORIO);
            setSelectedSalon(aula);
          }}
          className="bg-[#78211E] text-white px-4 py-2 rounded hover:bg-[#5a1815]"
        >
          Ver Directorio
        </button>
      </div>,
    ]);
  }, [aulasData]);

  if (loading) return <p className="text-center text-gray-500">Cargando datos...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      <h1 className="text-2xl font-bold text-center mb-6">Panel de Supervisor</h1>

      {estado === ESTADO.INDEX &&
        <Tabla encabezado={["N°", "Aula", "Monitor", "Enlace", "Acciones"]} datos={datosAulas} index_key={0} />}

      {estado === ESTADO.HORARIO &&
        <HorarioMonitorPanel aula={selectedSalon} cambiarVista={cambiarVistaDirectorio} volver={volverAlIndex} />}

      {estado === ESTADO.DIRECTORIO &&
        <DirectorioMonitorPanel aula={selectedSalon} cambiarVista={cambiarVistaHorario} volver={volverAlIndex} />}
    </div>
  );
};