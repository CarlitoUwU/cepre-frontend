import React, { useState, useEffect } from "react";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Button } from "@/components/ui/Button"; // Asegúrate de tener este botón base
import docentesData from "@/data/docentes.json";
import { TurnosSelector } from "@/components/Horarios/TurnosSelector.jsx";

export const AsignarSalonDoc = ({ idDocente, setVista }) => {
  const docente = docentesData.find((doc) => doc.id === idDocente);
  const nombreDocente = docente ? docente.docente : "Desconocido";

  const listaSalones = [];

  const [disponibilidadDocentes, setDisponibilidadDocentes] = useState({});
  const [modoEdicionDisponibilidad, setModoEdicionDisponibilidad] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem(`disponibilidad-${idDocente}`);
    if (data) {
      setDisponibilidadDocentes((prev) => ({
        ...prev,
        [idDocente]: JSON.parse(data),
      }));
    }
  }, [idDocente]);

  const handleDisponibilidadChange = (nuevaDisponibilidad) => {
    setDisponibilidadDocentes((prev) => {
      const updatedDisponibilidad = {
        ...prev,
        [idDocente]: nuevaDisponibilidad,
      };

      localStorage.setItem(
        `disponibilidad-${idDocente}`,
        JSON.stringify(nuevaDisponibilidad)
      );

      return updatedDisponibilidad;
    });
  };

  return (
    <div className="overflow-x-auto w-full text-center p-2">
      <div className="flex flex-col items-center space-y-6">
        <h2 className="text-2xl font-bold">
          Asignación de Salones Docente - {nombreDocente}
        </h2>

        <TurnosSelector
          listaSalones={listaSalones}
          disponibilidad={disponibilidadDocentes[idDocente] || []}
          idDocente={idDocente}
          setDisponibilidadDocentes={handleDisponibilidadChange}
          modoEdicion={modoEdicionDisponibilidad} // pasamos si está activado
        />

        <div className="flex gap-4">
          <Button onClick={() => setModoEdicionDisponibilidad(!modoEdicionDisponibilidad)}>
            {modoEdicionDisponibilidad ? "Finalizar edición" : "Modificar disponibilidad"}
          </Button>

          <ButtonNegative onClick={() => setVista("tabla")}>Atrás</ButtonNegative>
        </div>
      </div>
    </div>
  );
};
