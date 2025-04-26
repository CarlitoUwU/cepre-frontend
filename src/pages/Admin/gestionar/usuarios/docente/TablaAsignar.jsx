import React from "react";
import { Button } from "@/components/ui/Button";
import { SkeletonTabla } from "@/components/skeletons/SkeletonTabla";
import { Tabla } from "@/components/ui/Tabla";
import { useAreas } from "@/hooks/useAreas";
import { useListaSalonesDisponibles } from "@/hooks/useListaSalonesDisponibles";
import { useState } from "react";
import { toast } from "react-toastify";

const encabezado = ["Nº", "Aula Disponible", "Área", "Turno", "Acciones"];

export const TablaAsignar = ({
  teacherId,
  objApi = {},
}) => {
  const { 
    areas, 
    isLoading: loadingAreas, 
    isError: errorAreas, 
    error: errorAreasObj 
  } = useAreas();
  
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    salones = [],
    total,
    totalPages,
    isLoading: loadingSalones,
    isError: errorSalones,
    error: errorSalonesObj,
    asignarSalonMutation
  } = useListaSalonesDisponibles({ objApi });

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleLimitChange = (e) => setLimit(e.target.value);

  if (loadingAreas || loadingSalones) return <SkeletonTabla numRows={5} numColums={4} />;

  if (errorAreas || errorSalones) {
    return (
      <div className="text-center text-red-500">
        Error al cargar los datos: {errorAreasObj?.message || errorSalonesObj?.message}
      </div>
    );
  }

  const handleAsignar = async (idProfesor, idSalon) => {
    try {
      const response = await asignarSalonMutation.mutateAsync({
        teacherId: idProfesor,
        classId: idSalon
      });
      if (response) {
        toast.success("Profesor asignado correctamente");
      }
    } catch (error) {
      toast.error("Error al asignar el profesor");
      console.error("Asignación fallida:", error);
    }
  };

  const datos = () => salones?.map((salon, index) => [
    index + 1,
    salon.name || "Sin nombre",
    areas.find((a) => a.id == salon.areaId)?.name || "Sin área",
    salon.shift?.name || "Sin turno",
    <Button
      key={salon.id}
      onClick={() => handleAsignar?.(teacherId, salon.id)}
    >
      Asignar
    </Button>,
  ]);

  return (
    <div className="overflow-x-auto w-full mt-6">
      <div className="w-full text-center">
        <Tabla encabezado={encabezado} datos={datos()} />
      </div>
    </div>
  );
};

