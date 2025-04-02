import React, { useState, useEffect, useCallback } from "react";
import { Tabla } from "@/components/ui/Tabla";
import { TablaHorarioMonitor } from "@/components/Horarios/indexMonitor";
import docentesData from "@/data/docentes.json";
import horarioData from "@/data/horario.json";
import SupervisorsServices from "@/services/SupervisorsServices";

export const SupervisorPanel = () => {
  const [aulasData, setAulasData] = useState([]);
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [mostrarHorario, setMostrarHorario] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMonitorData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await SupervisorsServices.getMonitors();
      if (!Array.isArray(response)) {
        throw new Error("La respuesta de la API no es válida");
      }

      const data = response.map((clase) => ({
        aula: clase?.classes?.name || "Sin nombre",
        monitor: `${clase?.user?.firstName || "Desconocido"} ${clase?.user?.lastName || ""}`.trim(),
        enlace: clase?.classes?.urlMeet || "Sin enlace",
      }));

      setAulasData(data);
    } catch (err) {
      console.error("Error al obtener monitores:", err);
      setError("No se pudieron cargar los datos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMonitorData();
  }, [fetchMonitorData]);

  const getDatosAulas = () =>
    aulasData.map((aula, index) => [
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
            setSelectedSalon(aula.aula);
            setMostrarHorario(true);
          }}
          className="bg-[#78211E] text-white px-4 py-2 rounded hover:bg-[#5a1815]"
        >
          Visualizar Horario
        </button>
        <button
          onClick={() => {
            setSelectedSalon(aula.aula);
            setMostrarHorario(false);
          }}
          className="bg-[#78211E] text-white px-4 py-2 rounded hover:bg-[#5a1815]"
        >
          Ver Directorio
        </button>
      </div>,
    ]);

  const getDirectorioDocentes = () => {
    // obtener el directorio de docentes asignados al salón seleccionado
    if (!selectedSalon) return [];
    return docentesData
      .filter((docente) => docente.salones_asignados.includes(selectedSalon))
      .map((docente, index) => [
        index + 1,
        docente.curso,
        docente.docente,
        docente.correo,
        docente.numero,
      ]);
  };

  const getHorariosPorSalon = () =>
    // obtiene el horario del salón seleccionado
    selectedSalon ? horarioData.filter((curso) => curso.id_salon === selectedSalon) : [];

  if (loading) return <p className="text-center text-gray-500">Cargando datos...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Panel de Supervisor</h1>

      {selectedSalon === null ? (
        <Tabla encabezado={["N°", "Aula", "Monitor", "Enlace", "Acciones"]} datos={getDatosAulas()} index_key={0} />
      ) : (
        <div>
          <h2 className="text-xl font-semibold text-center mb-4">
            {mostrarHorario ? `Horario del Aula ${selectedSalon}` : `Directorio del Aula ${selectedSalon}`}
          </h2>

          {mostrarHorario ? (
            getHorariosPorSalon().length > 0 ? (
              <TablaHorarioMonitor listaCursos={getHorariosPorSalon()} />
            ) : (
              <p className="text-center py-4 text-red-600">No hay horario disponible para este aula.</p>
            )
          ) : getDirectorioDocentes().length > 0 ? (
            <Tabla encabezado={["#", "Curso", "Nombre", "Correo", "Número"]} datos={getDirectorioDocentes()} />
          ) : (
            <p className="text-center py-4 text-red-600">No hay docentes asignados a este aula.</p>
          )}

          <div className="text-center mt-4 flex gap-4 justify-center">
            <button
              onClick={() => setMostrarHorario(!mostrarHorario)}
              className="bg-[#78211E] text-white px-4 py-2 rounded hover:bg-[#5a1815]"
            >
              {mostrarHorario ? "Ver Directorio" : "Visualizar Horario"}
            </button>
            <button onClick={() => setSelectedSalon(null)} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800">
              Volver
            </button>
          </div>
        </div>
      )}
    </div>
  );
};