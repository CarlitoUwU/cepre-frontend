import React, { useState, useEffect, useMemo } from "react";
import { Tabla } from "@/components/ui/Tabla";
import { Button } from "@/components/ui/Button";
import { useProfesoresDisponibles } from "@/hooks/useListaProfesDisponibles";
import { useHorasABloques } from "@/hooks/useHorasABloques";
import { SchedulesService } from "@/services/SchedulesServices";
import { toast } from "react-toastify";
import { SkeletonTabla } from "@/components/skeletons/SkeletonTabla";

const encabezado = ["N°", "Docente", "Correo", "Teléfono", "Acciones"];

export const BuscarProfesor = ({ curso: { id: courseId, name }, profesor, horario, idSalon, setAsignar }) => {
  const [profesorAsignado, setProfesorAsignado] = useState(profesor);
  const [wasAssigned, setWasAssigned] = useState(false);
  const { mapearABloques } = useHorasABloques();
  const horarioApi = useMemo(() => mapearABloques(horario).map((bloque) => ({
    hourSessionId: bloque.id_hour_session, weekday: bloque.weekday
  })), [horario, mapearABloques]);
  const {
    data,
    profesores,
    isLoading,
    isError,
    error,
    asignarClaseMutation
  } = useProfesoresDisponibles({
    courseId,
    hourSessions: horarioApi
  });

  useEffect(() => {
    if (isError) {
      toast.error("Error al cargar los profesores disponibles");
      console.error("Error al cargar profesores:", error);
      return;
    }

    if (!isLoading && data !== undefined && profesores.length === 0 && !wasAssigned) {
      toast.error("No hay profesores disponibles para este horario");
    }
  }, [isLoading, profesores, isError, error, data, wasAssigned]);


  const handleAsignar = async (idProfesor, idSalon) => {
    try {
      const profesor = profesores.find((prof) => prof.id === idProfesor);
      const response = await asignarClaseMutation.mutateAsync({
        teacherId: idProfesor,
        classId: idSalon
      });
      if (response) {
        setProfesorAsignado(profesor);
        toast.success("Profesor asignado correctamente");
        setWasAssigned(true);
        setAsignar(name);
      }

    } catch (error) {
      toast.error("Error al asignar el profesor");
      console.error("Asignación fallida:", error);
    }
  }

  const getNombreCompleto = (p) => `${p?.firstName || ''} ${p?.lastName || ''}`.trim();

  const mapProfesoresToTabla = () => {
    return profesores.map((profesor, i) =>
      [
        i + 1,
        getNombreCompleto(profesor),
        profesor?.email || "No disponible",
        profesor?.phone || "No disponible",
        <Button onClick={() => { handleAsignar(profesor.id, idSalon) }}>
          Asignar
        </Button>,
      ]
    );
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-center text-lg font-bold mb-4">Seleccionar Profesor - {name}</h2>
        {profesorAsignado && (
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold">Profesor Asignado:</h3>
            <p>{getNombreCompleto(profesorAsignado)}</p>
            <p>{profesorAsignado?.email}</p>
          </div>
        )}
      </div>
      {isLoading || data === undefined ? (<SkeletonTabla />) :
        (< Tabla encabezado={encabezado} datos={mapProfesoresToTabla()} />)
      }
    </div>
  )
}