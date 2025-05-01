import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { SkeletonTabla } from "@/components/skeletons/SkeletonTabla";
import { Tabla } from "@/components/ui/Tabla";
import { useAreas } from "@/hooks/useAreas";
import { useTurnos } from "@/hooks/useTurnos";
import { useListaSalonesDisponibles } from "@/hooks/useListaSalonesDisponibles";
import { toast } from "react-toastify";
import { FaSyncAlt } from "react-icons/fa";

const encabezado = ["Nº", "Aula Disponible", "Área", "Turno", "Acciones"];

export const TablaAsignar = ({
  teacher,
  objApi = {},
  onSalonAsignado,
}) => {
  const { areas, isLoading: loadingAreas } = useAreas();
  const { turnos, isLoading: loadingTurnos } = useTurnos();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [area_id, setAreaId] = useState(null);
  const [shift_id, setShiftId] = useState(null);
  const [selected, setSelected] = useState({});
  const { salones,
    totalPages,
    isLoading: loadingSalones,
    enabled: enabledSalones,
    asignarSalonMutation,
    refetch
  } = useListaSalonesDisponibles({
    objApi, page, limit, area_id, shift_id
  })

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleLimitChange = (e) => setLimit(e.target.value);

  const filtro = useMemo(() => {
    if (!areas?.length) return {};
    if (!turnos?.length) return {};

    return {
      2: {
        options: areas.map((a) => a.name),
        onChange: (area_name) => {
          setTimeout(() => {
            const area = areas.find((a) => a.name === area_name[0]);
            const index = areas.indexOf(area);
            setSelected({ ...selected, 2: index });
            setAreaId(area?.id || null);
          }, 0);
        }
      },
      3: {
        options: turnos.map((a) => a.name),
        onChange: (turno_name) => {
          setTimeout(() => {
            const turno = turnos.find((a) => a.name === turno_name[0]);
            const index = turnos.indexOf(turno);
            setSelected({ ...selected, 3: index });
            setShiftId(turno?.id || null);
          }, 0);
        }
      },
    };
  }, [areas, turnos, selected]);

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
      <div className="flex justify-between items-center ">
        <Button onClick={refetch}>
          <FaSyncAlt />
        </Button>
        <h2 className="text-2xl font-bold">
          Salones Disponibles en el curso de {teacher?.courseName}:
        </h2>
      </div>
      <div className="mt-6 w-full text-center">
        {loadingAreas || loadingTurnos || loadingSalones || !enabledSalones
          ? (<SkeletonTabla numRows={limit} numColums={encabezado.length} />)
          : (<Tabla encabezado={encabezado} datos={datos()} filtroDic={filtro} selected={selected} filtrar={false} />)}
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
