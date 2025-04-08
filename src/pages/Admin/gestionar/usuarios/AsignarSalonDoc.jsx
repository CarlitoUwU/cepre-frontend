import React from "react";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import docentesData from "@/data/docentes.json";
import TurnosSelector from "@/components/Horarios/TurnosSelector.jsx";

function AsignarSalonDoc({ idDocente, setVista }) {
  const docente = docentesData.find((doc) => doc.id === idDocente);
  const nombreDocente = docente ? docente.docente : "Desconocido";

  // Lista de salones simulada (debería ser reemplazada por datos reales)
  const listaSalones = [];

  return (
    <div className="overflow-x-auto w-full text-center p-6">
      <div className="flex flex-col items-center space-y-6">
        <h2 className="text-2xl font-bold">
          Asignación de Salones Docente - {nombreDocente}
        </h2>

        <TurnosSelector
          listaSalones={listaSalones}
          setClaseSeleccionada={(clase) => {
            console.log("Clase seleccionada:", clase);
          }}
        />

        <ButtonNegative onClick={() => setVista("tabla")}>
          Atrás
        </ButtonNegative>
      </div>
    </div>
  );
}

export default AsignarSalonDoc;
