import React, { useState, useEffect } from "react";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Button } from "@/components/ui/Button";
import { TablaAsignar } from "./TablaAsignar";
import { TurnosSelector } from "@/components/Horarios/TurnosSelector.jsx";
import { TeachersServices } from "@/services/TeachersServices.js";
import { SchedulesService } from "@/services/schedulesServices.js";
import { useHorasABloques } from "@/hooks/useHorasABloques";

export const AsignarSalonDoc = ({ idDocente, regresar }) => {
  const [docente, setDocente] = useState({});
  const [disponibilidadDocentes, setDisponibilidadDocentes] = useState({});
  const [modoEdicionDisponibilidad, setModoEdicionDisponibilidad] = useState(false);

  const [salonesDisponibles, setSalonesDisponibles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const { 
    mapearABloques, 
    loading: loadingBloques, 
    isReady,
    error: errorHook 
  } = useHorasABloques();

  const disponibilidad = disponibilidadDocentes[idDocente] || [];

  const fetchSalones = async () => {
    if (!idDocente || !docente?.courseId || disponibilidad.length === 0 || loadingBloques || !isReady) {
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const bloques = mapearABloques(disponibilidad) || [];
      
      const objApi = {
        idCurso: docente.courseId,
        horario: Array.isArray(bloques) ? bloques : [],
        page: 1,
        pageSize: 10,
      };

      const response = await SchedulesService.getClasesDisponibles(objApi);
      setSalonesDisponibles(response.data || []);
    } catch (err) {
      console.error("Error al obtener salones disponibles", err);
      setIsError(true);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = localStorage.getItem(`disponibilidad-${idDocente}`);

      try {
        const dataDocente = await TeachersServices.getTeacherById(idDocente);
        setDocente(dataDocente || {});

        const parsed = data ? JSON.parse(data) : null;
        if (parsed && typeof parsed === "object") {
          setDisponibilidadDocentes((prev) => ({
            ...prev,
            [idDocente]: Array.isArray(parsed) ? parsed : [],
          }));
        }
      } catch (e) {
        console.warn(`Error al parsear disponibilidad de ${idDocente}`, e);
        localStorage.removeItem(`disponibilidad-${idDocente}`);
      }
    };

    fetchData();
  }, [idDocente]);

  useEffect(() => {
    if (isReady && docente?.courseId && disponibilidad.length > 0) {
      fetchSalones();
    }
  }, [disponibilidad, docente?.courseId, isReady]);

  const handleDisponibilidadChange = (nuevaDisponibilidad) => {
    setDisponibilidadDocentes((prev) => {
      const updated = {
        ...prev,
        [idDocente]: nuevaDisponibilidad,
      };
      localStorage.setItem(`disponibilidad-${idDocente}`, JSON.stringify(nuevaDisponibilidad));
      return updated;
    });
  };

  return (
    <div className="overflow-x-auto w-full text-center p-2">
      <div className="flex flex-col items-center space-y-6">
        <h2 className="text-2xl font-bold">
          Asignación de Salones Docente - {docente?.firstName} {docente?.lastName} ({docente?.phone})
        </h2>

        <TurnosSelector
          disponibilidad={disponibilidad}
          idDocente={idDocente}
          setDisponibilidadDocentes={handleDisponibilidadChange}
          modoEdicion={modoEdicionDisponibilidad}
        />

        <Button onClick={() => setModoEdicionDisponibilidad(!modoEdicionDisponibilidad)}>
          {modoEdicionDisponibilidad ? "Finalizar edición" : "Modificar disponibilidad"}
        </Button>

        <TablaAsignar
          salones={salonesDisponibles}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />

        <ButtonNegative onClick={regresar}>Atrás</ButtonNegative>
      </div>
    </div>
  );
};
