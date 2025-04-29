import React, { useEffect, useState } from "react";
import { TablaHorarioMonitor } from "@/components/Horarios/indexMonitor";
import { Tabla } from "@/components/ui/Tabla";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { useHorarioYDocentes } from "@/hooks/useHorarioYDocentes";
import { SkeletonTabla } from "@/components/skeletons/SkeletonTabla";

export const DetallesMonitor = ({ aula = {}, volver = () => { } }) => {
  const [horario, setHorario] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const { data, isLoading } = useHorarioYDocentes(aula?.id);

  useEffect(() => {
    const docentesTabla = data?.docentes?.map((doc, i) => [
      i + 1,
      doc.curso,
      doc.docente,
      doc.correo,
      doc.telefono,
    ]);

    setDocentes(docentesTabla);
    setHorario(data?.horario);
  }, [aula, data]);


  return (
    <div className="grid grid-cols-1 md:grid-cols-5 text-sm">

      {/* Directorio del Aula (Izquierda - menos ancho) */}
      <div className="md:col-span-2 flex flex-col items-center mb-4 md:mb-0">
        <h2 className="text-lg font-semibold text-center mb-4">
          {`Directorio`}
        </h2>
        <div className="w-full max-w-[100%]">
          {isLoading ? <SkeletonTabla />
            : <Tabla encabezado={["N°", "Curso", "Nombre", "Correo", "Número"]} datos={docentes} />}
        </div>
      </div>

      {/* Horario del Aula (Derecha - más ancho) */}
      <div className="md:col-span-3 flex flex-col items-center">
        <h2 className="text-lg font-semibold text-center mb-4">
          {`Horario`}
        </h2>
        <div className="w-full max-w-[95%]">
          <TablaHorarioMonitor horas={horario} />
        </div>

        {/* Botón Volver */}
        <div className="mt-6 text-center">
          <ButtonNegative onClick={volver}>Volver</ButtonNegative>
        </div>
      </div>
    </div>
  );
};
