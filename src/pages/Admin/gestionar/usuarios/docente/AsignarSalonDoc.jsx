import React, { useState, useEffect } from "react";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Button } from "@/components/ui/Button"; 
import { TablaAsignar } from "./TablaAsignar"
import { TurnosSelector } from "@/components/Horarios/TurnosSelector.jsx";
import { TeachersServices } from "@/services/TeachersServices.js";

export const AsignarSalonDoc = ({ idDocente, regresar }) => {
  console.log({idDocente})
  const [docente, setDocente] = useState({});
  
  const listaSalones = [
    /* {
      id: "salon-102",
      nombre: "Salón 102",
      horas: [
        { dia: "LUNES", hora_ini: "07:45", hora_fin: "08:25" }, // ✅ dentro del rango
      ],
    },
    {
      id: "salon-103",
      nombre: "Salón 103",
      horas: [
        { dia: "LUNES", hora_ini: "08:30", hora_fin: "09:10" }, // ✅ dentro del rango
      ],
    } */
  ];

  const [disponibilidadDocentes, setDisponibilidadDocentes] = useState({});
  const [modoEdicionDisponibilidad, setModoEdicionDisponibilidad] = useState(false);

  const objApi = {
    id_course: docente?.courseId,
    disponibilidad: disponibilidadDocentes[idDocente],
  }

  console.log({objApi})

  useEffect(() => {
    const fetchData = async () => {
      const data = localStorage.getItem(`disponibilidad-${idDocente}`);
  
      try {
        const dataDocente = await TeachersServices.getTeacherById(idDocente);
        console.log({ dataDocente });
        setDocente(dataDocente);
  
        const parsed = JSON.parse(data);
        if (parsed && typeof parsed === "object") {
          setDisponibilidadDocentes((prev) => ({
            ...prev,
            [idDocente]: parsed,
          }));
        }
      } catch (e) {
        console.warn(`Error al parsear disponibilidad de ${idDocente}`, e);
        localStorage.removeItem(`disponibilidad-${idDocente}`);
      }
    };
  
    fetchData();
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

  const horaEnRango = (hora_ini_salon, hora_fin_salon, hora_ini_disp, hora_fin_disp) => {
    return hora_ini_salon >= hora_ini_disp && hora_fin_salon <= hora_fin_disp;
  };

   /*const disponibilidad = disponibilidadDocentes[idDocente] || [];

 const salonesDisponibles = listaSalones.filter((salon) =>
  salon.horas.some(({ dia, hora_ini: hs_ini, hora_fin: hs_fin }) =>
    disponibilidad.some(
      ({ dia: dia_disp, hora_ini: hd_ini, hora_fin: hd_fin }) =>
        dia === dia_disp && horaEnRango(hs_ini, hs_fin, hd_ini, hd_fin)
    )
  )
);*/


  return (
    <div className="overflow-x-auto w-full text-center p-2">
      <div className="flex flex-col items-center space-y-6">
        <h2 className="text-2xl font-bold">
          Asignación de Salones Docente - {docente?.firstName} {docente?.lastName}
        </h2>

        
          <TurnosSelector
            listaSalones={listaSalones}
            disponibilidad={disponibilidadDocentes[idDocente] || []}
            idDocente={idDocente}
            setDisponibilidadDocentes={handleDisponibilidadChange}
            modoEdicion={modoEdicionDisponibilidad}
          />           

          <Button onClick={() => setModoEdicionDisponibilidad(!modoEdicionDisponibilidad)}>
            {modoEdicionDisponibilidad ? "Finalizar edición" : "Modificar disponibilidad"}
          </Button>

          <TablaAsignar            
            isLoading={false}
            isError={false}
            error={false}
          />     
                    

          <ButtonNegative onClick={regresar}>Atrás</ButtonNegative>
        
      </div>
    </div>
  );
};
