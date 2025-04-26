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
  teacher,
  objApi = {},
  onSalonAsignado,   // 👈 importante: recibir la función de recarga
}) => {
  const { areas, isLoading: loadingAreas } = useAreas();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { salones,
    totalPages,
    isLoading: loadingSalones,
    enabled: enabledSalones,
    asignarSalonMutation
  } = useListaSalonesDisponibles({
    objApi
  })

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleLimitChange = (e) => setLimit(e.target.value);

  const handleAsignar = async (idProfesor, idSalon) => {
    try {
      const response = await asignarSalonMutation.mutateAsync({
        teacherId: idProfesor,
        classId: idSalon
      });
      if (response) {
        toast.success("Profesor asignado correctamente");

        // 🔥 Una vez asignado, llamamos a la función que recarga el horario
        if (onSalonAsignado) {
          await onSalonAsignado();
        }
      }

    } catch (error) {
      toast.error("Error al asignar el profesor");
      console.error("Asignación fallida:", error);
    }
  }

  const datos = () => {
    if (!salones || salones.length == 0) return []
    return salones?.map((salon, index) => [
      index + 1,
      salon.name || "Sin nombre",
      areas.find((a) => a.id == salon.areaId)?.name || "Sin área",
      salon.shift?.name || "Sin turno",
      <Button
        key={salon.id}
        onClick={() =>
          handleAsignar?.(teacher?.id, salon.id)
        }
      >
        Asignar
      </Button>,
    ])
  };

  return (
    <div className="overflow-x-auto w-full mt-6">
      <h2 className="text-2xl font-bold">
        Salones Disponibles en el curso de {teacher?.courseName}:
      </h2>
      <div className="w-full text-center">
        {loadingAreas || loadingSalones || !enabledSalones ? (<SkeletonTabla />)
          : (<Tabla encabezado={encabezado} datos={datos()} />)}
      </div>
      <div className="flex justify-between mt-4">
        <Button onClick={handlePrev} disabled={page === 1}>
          Anterior
        </Button>
        <Button onClick={handleNext} disabled={page >= totalPages}>
          Siguiente
        </Button>
        <select value={limit} onChange={handleLimitChange} className="border border-gray-300 rounded p-2">
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};
