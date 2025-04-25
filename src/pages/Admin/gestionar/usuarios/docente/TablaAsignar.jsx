import React from "react";
import { Button } from "@/components/ui/Button";
import { SkeletonTabla } from "@/components/skeletons/SkeletonTabla";
import { Tabla } from "@/components/ui/Tabla";
import { useAreas } from "@/hooks/useAreas";

const encabezado = ["Nº", "Aula Disponible", "Área", "Turno", "Acciones"];

export const TablaAsignar = ({
  isLoading = false,
  isError = false,
  error = {},
  salones = [],
  teacherId
}) => {
  const { areas, isLoading: loadingAreas } = useAreas();

  if (isLoading) return <SkeletonTabla numRows={5} numColums={4} />;

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error al cargar los datos: {error.message}
      </div>
    );
  }

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

  const datos = salones.map((salon, index) => [
    index + 1,
    salon.name || "Sin nombre",
    areas.find((a) => a.id == salon.areaId)?.name || "Sin área",
    salon.shift?.name || "Sin turno",
    <Button
      key={salon.id}
      onClick={() =>
        onAsignar?.({ teacherId, classId: salon.id })
      }
    >
      Asignar
    </Button>,
  ]);

  return (
    <div className="overflow-x-auto w-full mt-6">
      <div className="w-full text-center">
        <Tabla encabezado={encabezado} datos={datos} />
      </div>
    </div>
  );
};
