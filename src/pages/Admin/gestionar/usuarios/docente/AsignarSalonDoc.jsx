import React, { useState, useEffect, useCallback } from "react";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Button } from "@/components/ui/Button";
import { TablaAsignar } from "./TablaAsignar";
import { useHorarioAsignadoDocente } from "@/hooks/useHorarioAsignadoDocente";
import { TurnosSelector } from "@/components/Horarios/TurnosSelector";
import { useHorasABloques } from "@/hooks/useHorasABloques";
import { HorarioCompleto } from "./HorarioCompleto";
import { useCursos } from "@/hooks/useCursos";

export const AsignarSalonDoc = ({ docente, regresar }) => {
  const { cursos } = useCursos()
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [mostrarHorarioCompleto, setMostrarHorarioCompleto] = useState(false);
  const [objApi, setObjApi] = useState({})
  const { mapearABloques, isReady } = useHorasABloques();
  const {
    horario: horarioAsignado,
  } = useHorarioAsignadoDocente({ idDocente: docente?.id });

  // Carga inicial del docente, disponibilidad y horario asignado
  useEffect(() => {
    const cargarDataInicial = async () => {
      try {
        const data = localStorage.getItem(`disponibilidad-${docente?.id}`);
        const parsed = data ? JSON.parse(data) : [];
        setDisponibilidad(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.warn("Error cargando datos iniciales", error);
        localStorage.removeItem(`disponibilidad-${docente?.id}`);
      }
    };

    if (docente?.id) {
      cargarDataInicial();
    }
  }, [docente]);

  // Carga salones disponibles
  useEffect(() => {
    const cargarSalones = async () => {
      if (!docente || !isReady || disponibilidad.length === 0) return;

      const bloques = mapearABloques(disponibilidad);

      if (!bloques || bloques.length === 0) {
        console.warn("No se pudo mapear disponibilidad a bloques.");
        return;
      }

      const curso = cursos.find((curso) => { return curso?.name?.toLowerCase() === docente?.courseName?.toLowerCase() })

      const objApi = {
        idDocente: docente?.id,
        idCurso: curso?.id,
        horario: bloques,
        page: 1,
        pageSize: 10,
      };

      setObjApi(objApi);
    };

    cargarSalones();
  }, [cursos, disponibilidad, docente, isReady, mapearABloques]);

  const handleDisponibilidadChange = useCallback((nuevaDisponibilidad) => {
    setDisponibilidad(nuevaDisponibilidad);
    localStorage.setItem(`disponibilidad-${docente?.id}`, JSON.stringify(nuevaDisponibilidad));
  }, [docente]);

  return (
    <div className="overflow-x-auto w-full text-center p-2">
      {mostrarHorarioCompleto ? (
        <HorarioCompleto idDocente={docente?.id} setMostrarHorarioCompleto={setMostrarHorarioCompleto} docente={docente} />
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

          <TablaAsignar
            teacher={docente}
            objApi={objApi}
          />

          <ButtonNegative onClick={regresar}>Atrás</ButtonNegative>
        </div>
      )}
    </div>
  );
};
