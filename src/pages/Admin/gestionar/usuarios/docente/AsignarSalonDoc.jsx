import React, { useState, useEffect, useCallback } from "react";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Button } from "@/components/ui/Button";
import { TablaAsignar } from "./TablaAsignar";
import { TurnosSelector } from "@/components/Horarios/TurnosSelector.jsx";
import { TeachersServices } from "@/services/TeachersServices.js";
import { SchedulesService } from "@/services/schedulesServices.js";
import { useHorasABloques } from "@/hooks/useHorasABloques";

export const AsignarSalonDoc = ({ idDocente, regresar }) => {
  const [docente, setDocente] = useState({});
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [salonesDisponibles, setSalonesDisponibles] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [loadingSalones, setLoadingSalones] = useState(false);
  const [errorSalones, setErrorSalones] = useState(null);

  const { mapearABloques, loading: loadingBloques, isReady } = useHorasABloques();

  // Carga inicial del docente y disponibilidad desde localStorage
  useEffect(() => {
    const cargarData = async () => {
      try {
        const docenteData = await TeachersServices.getTeacherById(idDocente);
        setDocente(docenteData);

        const data = localStorage.getItem(`disponibilidad-${idDocente}`);
        const parsed = data ? JSON.parse(data) : [];

        setDisponibilidad(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.warn("Error cargando datos iniciales", error);
        localStorage.removeItem(`disponibilidad-${idDocente}`);
      }
    };

    if (idDocente) cargarData();
  }, [idDocente]);

  // Carga salones cuando esté lista la disponibilidad y bloques
  // Carga salones cuando esté lista la disponibilidad y bloques
  useEffect(() => {
    const cargarSalones = async () => {
      if (!idDocente || !docente?.courseId || !isReady || disponibilidad.length === 0) return;
  
      const bloques = mapearABloques(disponibilidad);
  
      console.log("Bloques a enviar a la API:", bloques); // Verificar bloques
  
      if (!bloques || bloques.length === 0) {
        console.warn("No se pudo mapear disponibilidad a bloques.");
        return;
      }
  
      const objApi = {
        idCurso: docente.courseId,  // Asegúrate de que esto esté incluido
        horario: bloques,  // Los bloques generados
        page: 1,
        pageSize: 10,
      };
  
      console.log("Objeto enviado a la API:", objApi); // Verificar el objeto
  
      setLoadingSalones(true);
      setErrorSalones(null);
  
      try {
        const response = await SchedulesService.getClasesDisponibles(objApi);
        console.log("Respuesta de la API:", response); // Verificar respuesta
        setSalonesDisponibles(response || []);
        
      } catch (error) {
        setErrorSalones(error);
        console.error("Error al obtener salones:", error);
      } finally {
        setLoadingSalones(false);
      }
    };
  
    cargarSalones();
  }, [idDocente, docente?.courseId, disponibilidad, isReady]);

  console.log("Salones Disponibles:", salonesDisponibles); // Verificar salones disponibles
  

  // Cuando se edita disponibilidad
  const handleDisponibilidadChange = useCallback((nuevaDisponibilidad) => {
    setDisponibilidad(nuevaDisponibilidad);
    localStorage.setItem(`disponibilidad-${idDocente}`, JSON.stringify(nuevaDisponibilidad));
  }, [idDocente]);

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
          modoEdicion={modoEdicion}
        />

        <Button onClick={() => setModoEdicion(!modoEdicion)}>
          {modoEdicion ? "Finalizar edición" : "Modificar disponibilidad"}
        </Button>

        <TablaAsignar
          salones={salonesDisponibles}
          isLoading={loadingSalones}
          isError={!!errorSalones}
          error={errorSalones}
        />

        <ButtonNegative onClick={regresar}>Atrás</ButtonNegative>
      </div>
    </div>
  );
};
