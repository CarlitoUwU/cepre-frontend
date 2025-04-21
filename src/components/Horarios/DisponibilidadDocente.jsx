import React, { useState } from "react";
import { Horarios } from "./Horarios";
import { HORAS_INI, HORAS_FIN } from "@/constants/horas";
import { DIAS } from "@/constants/dias";

export const DisponibilidadDocente = ({
  listaSalones = [],
  turno = "Turno 1",
  setClaseSeleccionada = () => {},
}) => {
  const [disponibilidad, setDisponibilidad] = useState([]);

  const toggleCelda = (dia, hora_ini, hora_fin) => {
    const exists = disponibilidad.find(
      (d) =>
        d.dia === dia && d.hora_ini === hora_ini && d.hora_fin === hora_fin
    );

    if (exists) {
      setDisponibilidad((prev) =>
        prev.filter(
          (d) =>
            !(
              d.dia === dia &&
              d.hora_ini === hora_ini &&
              d.hora_fin === hora_fin
            )
        )
      );
    } else {
      setDisponibilidad((prev) => [
        ...prev,
        { dia, hora_ini, hora_fin },
      ]);
    }
  };

  const handleCeldaClick = ({ dia, hora_ini, hora_fin }) => {
    toggleCelda(dia, hora_ini, hora_fin);
  };

  const handleClickDia = (dia) => {
    HORAS_INI.forEach((hora, i) => {
      toggleCelda(dia, hora, HORAS_FIN[i]);
    });
  };

  const handleClickHora = (hora_ini, hora_fin) => {
    DIAS.forEach((dia) => {
      toggleCelda(dia, hora_ini, hora_fin);
    });
  };

  return (
    <Horarios
      listaSalones={listaSalones}
      setClaseSeleccionada={setClaseSeleccionada}
      turno={turno}
      disponibilidad={disponibilidad}
      handleCeldaClick={handleCeldaClick}
      handleClickDia={handleClickDia}
      handleClickHora={handleClickHora}
    />
  );
};
