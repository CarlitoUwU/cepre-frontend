import React from "react";
import { Button } from "@/components/ui/Button";
import { SkeletonTabla } from "@/components/skeletons/SkeletonTabla";
import { Tabla } from "@/components/ui/Tabla";

const encabezado = ["Nº", "Aula Disponible", "Área", "Turno", "Acciones"];

export const TablaAsignar = ({
  docentes = [],
  isLoading = false,
  isError = false,
  error = {},
}) => {
  if (isLoading) return <SkeletonTabla numRows={5} numColums={4} />;

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error al cargar los datos: {error.message}
      </div>
    );
  }

  // Por ahora no mostramos ningún dato hasta integrar con el servicio
  const datos = [];

  return (
    <div className="overflow-x-auto w-full mt-6">
      <div className="w-full text-center">
        <Tabla encabezado={encabezado} datos={datos} />
      </div>
    </div>
  );
};
