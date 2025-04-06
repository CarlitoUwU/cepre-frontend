import React from "react";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Tabla } from "@/components/ui/Tabla";
import supervisoresData from "@/data/supervisores.json"; // Importamos los supervisores

export const AsignarSalonSup = ({ idSupervisor, setVista }) => {
  // Obtener datos del supervisor por su ID
  const supervisor = supervisoresData.find((sup) => sup.id === idSupervisor);
  const supervisorNombre = supervisor ? supervisor.supervisor : "Desconocido";

  // Obtener los salones asignados directamente del supervisor
  const getSalonesAsignados = () => {
    return supervisor?.salones_asignados?.map((salon, index) => [
      index + 1,
      salon,
      "-", // Monitor no disponible desde supervisores.json
      "-", // Enlace no disponible desde supervisores.json
      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
        Eliminar
      </button>,
    ]) || [];
  };

  return (
    <div className="overflow-x-auto w-full text-center p-6">
      <div className="relative flex justify-center items-center py-2">
        <h2 className="text-2xl font-bold">
          Asignación de salones - {supervisorNombre}
        </h2>
      </div>

      {supervisor?.salones_asignados?.length > 0 ? (
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
