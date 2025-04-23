import React from "react";
import { Button } from "@/components/ui/Button";
import { SkeletonTabla } from "@/components/skeletons/SkeletonTabla";
import { Tabla } from "@/components/ui/Tabla";
import { useAreas} from "@/hooks/useAreas";

const encabezado = ["Nº", "Aula Disponible", "Área", "Turno", "Acciones"];

export const TablaAsignar = ({
  isLoading = false,
  isError = false,
  error = {},
  salones = [], 
}) => {
  console.log("Salones Recibidos:", salones);

const { areas, isLoading: loadingAreas } = useAreas();
console.log("Áreas:", areas);

    if (isLoading) return <SkeletonTabla numRows={5} numColums={4} />;

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error al cargar los datos: {error.message}
      </div>
    );
  }

  const datos = salones.map((salon, index) => [
    index + 1, // Nº
    salon.name || "Sin nombre", // Aula Disponible
    areas.find((a) => {return a.id == salon.areaId}).name || "Sin área", // Área
    salon.shift.name || "Sin turno", // Turno
    <Button key={salon.id} onClick={() => console.log("Asignar", salon)}>
      Asignar
    </Button>, // Acciones
  ]);

  return (
    <div className="overflow-x-auto w-full mt-6">
      <div className="w-full text-center">
        <Tabla encabezado={encabezado} datos={datos} />
      </div>
    </div>
  );
};
