import React, { useState } from "react";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import docentesData from "@/data/docentes.json";
import TurnosSelector from "@/components/Horarios/TurnosSelector.jsx";
import DisponibilidadModal from "@/components/Horarios/DisponibilidadModal";

export const AsignarSalonDoc = ({ idDocente, setVista }) => {
  const docente = docentesData.find((doc) => doc.id === idDocente);
  const nombreDocente = docente ? docente.docente : "Desconocido";

  const listaSalones = [];

  const [disponibilidadDocentes, setDisponibilidadDocentes] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleGuardarDisponibilidad = (nuevaDisponibilidad) => {
    setDisponibilidadDocentes((prev) => ({
      ...prev,
      [idDocente]: [
        ...(prev[idDocente] || []),
        ...nuevaDisponibilidad,
      ],
    }));
    setMostrarModal(false);
  };

  return (
    <div className="overflow-x-auto w-full text-center p-2">
      <div className="flex flex-col items-center space-y-6">
        <h2 className="text-2xl font-bold">
          Asignación de Salones Docente - {nombreDocente}
        </h2>

        <div className="flex justify-center">
          <button
            onClick={() => setMostrarModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow"
          >
            Ingresar Disponibilidad
          </button>
        </div>

        <TurnosSelector
          listaSalones={listaSalones}
          disponibilidad={disponibilidadDocentes[idDocente] || []}
          setClaseSeleccionada={(clase) => {
            console.log("Clase seleccionada:", clase);
          }}
        />

        <ButtonNegative onClick={() => setVista("tabla")}>Atrás</ButtonNegative>
      </div>

      {mostrarModal && (
        <DisponibilidadModal
          onClose={() => setMostrarModal(false)}
          onSave={handleGuardarDisponibilidad}
        />
      )}
    </div>
  );
}