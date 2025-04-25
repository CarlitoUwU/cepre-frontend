import React, { useEffect } from "react";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { TablaHorarioDocente } from "@/components/Horarios/TablaHorarioDocente";
import { useHorarioAsignadoDocente } from "@/hooks/useHorarioAsignadoDocente";

export const HorarioCompleto = ({ idDocente, setMostrarHorarioCompleto, docente }) => {
  const { horario, loading, cargarHorarioAsignado } = useHorarioAsignadoDocente();

  useEffect(() => {
    if (idDocente) {
      cargarHorarioAsignado(idDocente);
    }
  }, [idDocente]);

  return (
    <div className="flex flex-col items-center justify-center p-10 space-y-6">
      <h1 className="text-3xl font-bold">Horario Docente {docente?.firstName} {docente?.lastName}</h1>

      {loading ? (
        <p>Cargando horario...</p>
      ) : (
        <TablaHorarioDocente 
          horarios={horario || []}
          setClaseSeleccionada={() => {}}
        />
      )}

      <ButtonNegative onClick={() => setMostrarHorarioCompleto(false)}>
        Atrás
      </ButtonNegative>
    </div>
  );
};