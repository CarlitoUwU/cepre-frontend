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
  const { horario: horarioAsignado, refetch } = useHorarioAsignadoDocente({ idDocente: docente?.id });

  // Carga inicial del docente, disponibilidad y horario asignado
  useEffect(() => {
    const cargarDataInicial = async () => {
      try {
        const data = localStorage.getItem(`disponibilidad-${docente?.id}`);
        let parsed = data ? JSON.parse(data) : [];

        if (!Array.isArray(parsed)) parsed = [];

        // Limpiar bloques ya asignados del horario
        if (horarioAsignado && horarioAsignado.length > 0) {
          const bloquesAsignados = new Set(
            horarioAsignado.flatMap((dia) =>
              (dia.bloques || []).map((b) => `${dia.dia}-${b}`)
            )
          );

          parsed = parsed.filter(
            (bloque) => !bloquesAsignados.has(`${bloque.dia}-${bloque.bloque}`)
          );
        }

        setDisponibilidad(parsed);
        localStorage.setItem(`disponibilidad-${docente?.id}`, JSON.stringify(parsed));
      } catch (error) {
        console.warn("Error cargando datos iniciales", error);
        localStorage.removeItem(`disponibilidad-${docente?.id}`);
      }
    };

    if (docente?.id) {
      cargarDataInicial();
    }
  }, [docente, horarioAsignado]);


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

  // Sincroniza la disponibilidad eliminando bloques ya asignados
  useEffect(() => {
    if (!docente?.id || horarioAsignado.length === 0 || disponibilidad.length === 0) return;

    const nuevaDisponibilidad = disponibilidad.filter((d) =>
      !horarioAsignado.some(
        (h) =>
          h.dia === d.dia &&
          h.hora_ini === d.hora_ini &&
          h.hora_fin === d.hora_fin
      )
    );

    // Solo actualiza si hubo cambios reales
    if (nuevaDisponibilidad.length !== disponibilidad.length) {
      setDisponibilidad(nuevaDisponibilidad);
      localStorage.setItem(`disponibilidad-${docente?.id}`, JSON.stringify(nuevaDisponibilidad));
    }
  }, [horarioAsignado, disponibilidad, docente?.id]);

  const handleDisponibilidadChange = useCallback((nuevaDisponibilidad) => {
    setDisponibilidad(nuevaDisponibilidad);
    localStorage.setItem(`disponibilidad-${docente?.id}`, JSON.stringify(nuevaDisponibilidad));
  }, [docente]);

  return (
    <div className="overflow-x-auto w-full text-center p-2 max-w-4xl mx-auto">
      {mostrarHorarioCompleto ? (
        <HorarioCompleto idDocente={docente?.id} setMostrarHorarioCompleto={setMostrarHorarioCompleto} docente={docente} />
      ) : (
        <div className="flex flex-col items-center space-y-2">
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

          <div className="flex justify-end gap-4 w-full font-bold">
            <p>Horas Asignadas: {horarioAsignado?.length || 0}</p>
            <p>Max Horas: {docente?.maxHours}</p>
          </div>

          <div className="flex space-x-4">
            <Button onClick={() => setMostrarHorarioCompleto(true)}>
              Ver horario completo
            </Button>

            <Button onClick={() => setModoEdicion(!modoEdicion)}>
              {modoEdicion ? "Finalizar edición" : "Modificar disponibilidad"}
            </Button>
          </div>

          {horarioAsignado?.length < docente?.maxHours ?
            <TablaAsignar teacher={docente} objApi={objApi} onSalonAsignado={async () => { await refetch(); }} />
            : null
          }

          <ButtonNegative onClick={regresar}>Atrás</ButtonNegative>
        </div>
      )}
    </div>
  );
};
