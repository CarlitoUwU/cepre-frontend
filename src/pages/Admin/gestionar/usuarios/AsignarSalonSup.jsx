import React from "react";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Tabla } from "@/components/ui/Tabla";
import aulasData from "@/data/aulas.json";
import supervisoresData from "@/data/supervisores.json"; // Importamos los supervisores

export const AsignarSalonSup = ({ idSupervisor, setVista }) => {
  // Obtener datos del supervisor por su ID
  const supervisor = supervisoresData.find((sup) => sup.id === idSupervisor);
  const supervisorNombre = supervisor ? supervisor.supervisor : "Desconocido";

  // Obtener los salones asignados al supervisor
  const getSalonesAsignados = () => {
    return aulasData
      .filter((aula) => aula.supervisorId === idSupervisor)
      .map((aula, index) => [
        index + 1,
        aula.aula,
        aula.monitor,
        <a
          href={aula.enlace}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-700"
        >
          {aula.enlace}
        </a>,
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
          Eliminar
        </button>,
      ]);
  };

  return (
    <div className="overflow-x-auto w-full text-center p-6">
      <div className="relative flex justify-center items-center py-2">
        <h2 className="text-2xl font-bold">
          Asignación de salones - {supervisorNombre}
        </h2>
      </div>

      {aulasData.some((aula) => aula.supervisorId === idSupervisor) ? (
        <Tabla
          encabezado={["N°", "Aula", "Monitor", "Enlace", "Acciones"]}
          datos={getSalonesAsignados()}
        />
      ) : (
        <p className="text-center text-gray-500">No hay salones asignados.</p>
      )}

      <div className="flex justify-center mt-4">
        <ButtonNegative onClick={() => setVista("tabla")}>Atrás</ButtonNegative>
      </div>
    </div>
  );
};

export default AsignarSalonSup;
