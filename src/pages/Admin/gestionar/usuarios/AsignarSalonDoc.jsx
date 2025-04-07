import React from "react";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import docentesData from "@/data/docentes.json"; // Asegúrate de importar los datos correctamente

function AsignarSalonDoc({ idDocente, setVista }) {
  // Obtener datos del docente por su ID
  const docente = docentesData.find((doc) => doc.id === idDocente);
  const nombreDocente = docente ? docente.docente : "Desconocido"; // Usar la propiedad 'docente'

  return (
    <div className="overflow-x-auto w-full text-center p-6">
      <div className="relative flex justify-center items-center py-2">
        <h2 className="text-2xl font-bold">
          Asignación de Salones Docente - {nombreDocente}
        </h2>
      </div>

      <div className="mt-4">
        <ButtonNegative onClick={() => setVista("tabla")}>Atrás</ButtonNegative>
      </div> 
    </div>
  );
}

export default AsignarSalonDoc;
