import React, { useState, useEffect, useCallback } from "react";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Button } from "@/components/ui/Button";
import { TablaAsignar } from "./TablaAsignar";
import { useHorarioAsignadoDocente } from "@/hooks/useHorarioAsignadoDocente";
import { TurnosSelector } from "@/components/Horarios/TurnosSelector";
import { TeachersServices } from "@/services/TeachersServices";
import { SchedulesService } from "@/services/SchedulesServices";
import { useHorasABloques } from "@/hooks/useHorasABloques";
import { HorarioCompleto } from "./HorarioCompleto"; // Asegúrate de importar correctamente HorarioCompleto

export const AsignarSalonDoc = ({ idDocente, regresar }) => {
  const [docente, setDocente] = useState({});
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [salonesDisponibles, setSalonesDisponibles] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [loadingSalones, setLoadingSalones] = useState(false);
  const [errorSalones, setErrorSalones] = useState(null);
  const [mostrarHorarioCompleto, setMostrarHorarioCompleto] = useState(false);

  const { mapearABloques, loading: loadingBloques, isReady } = useHorasABloques();

  const {
    horario: horarioAsignado,
    loading: loadingHorario,
    error: errorHorario,
    cargarHorarioAsignado,
  } = useHorarioAsignadoDocente();

  // Carga inicial del docente, disponibilidad y horario asignado
  useEffect(() => {
    const cargarDataInicial = async () => {
      try {
        const docenteData = await TeachersServices.getTeacherById(idDocente);
        setDocente(docenteData);

        const data = localStorage.getItem(`disponibilidad-${idDocente}`);
        const parsed = data ? JSON.parse(data) : [];
        setDisponibilidad(Array.isArray(parsed) ? parsed : []);

        await cargarHorarioAsignado(idDocente);  // Aquí carga el horario asignado
      } catch (error) {
        console.warn("Error cargando datos iniciales", error);
        localStorage.removeItem(`disponibilidad-${idDocente}`);
      }
    };

    if (idDocente) {
      cargarDataInicial();
    }
  }, [idDocente]);

  // Carga salones disponibles
  useEffect(() => {
    const cargarSalones = async () => {
      if (!idDocente || !docente?.courseId || !isReady || disponibilidad.length === 0) return;

      const bloques = mapearABloques(disponibilidad);

      if (!bloques || bloques.length === 0) {
        console.warn("No se pudo mapear disponibilidad a bloques.");
        return;
      }

      const objApi = {
        idCurso: docente.courseId,
        horario: bloques,
        page: 1,
        pageSize: 10,
      };

      setLoadingSalones(true);
      setErrorSalones(null);

      try {
        const response = await SchedulesService.getClasesDisponibles(objApi);
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

  const handleDisponibilidadChange = useCallback((nuevaDisponibilidad) => {
    setDisponibilidad(nuevaDisponibilidad);
    localStorage.setItem(`disponibilidad-${idDocente}`, JSON.stringify(nuevaDisponibilidad));
  }, [idDocente]);

  return (
    <div className="overflow-x-auto w-full text-center p-2">
      {mostrarHorarioCompleto ? (
        <HorarioCompleto idDocente={idDocente} setMostrarHorarioCompleto={setMostrarHorarioCompleto} docente = {docente} />
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-2xl font-bold">
            Asignación de Salones Docente - {docente?.firstName} {docente?.lastName} ({docente?.phone})
          </h2>

          <TurnosSelector
            disponibilidad={disponibilidad}
            docente={docente}
            setDisponibilidadDocentes={handleDisponibilidadChange}
            modoEdicion={modoEdicion}
            horarioAsignado={horarioAsignado}
          />

          <div className="flex space-x-4">
            <Button onClick={() => setMostrarHorarioCompleto(true)}>
              Ver horario completo
            </Button>

            <Button onClick={() => setModoEdicion(!modoEdicion)}>
              {modoEdicion ? "Finalizar edición" : "Modificar disponibilidad"}
            </Button>
          </div>

          <h2 className="text-2xl font-bold">
            Salones Disponibles en el curso de {docente?.courseName}:
          </h2>

          <TablaAsignar
            salones={salonesDisponibles}
            isLoading={loadingSalones}
            isError={!!errorSalones}
            error={errorSalones}
            teacherId={idDocente}                  
          />

          <ButtonNegative onClick={regresar}>Atrás</ButtonNegative>
        </div>
      )}
    </div>
  );
};
