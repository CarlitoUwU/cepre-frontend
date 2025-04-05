import { Dia } from "./Dia";
import { Hora } from "./Hora";
import { Curso } from "./Curso";
import React from "react";

const horasIni = [
  "07:00", "07:45", "08:30", "09:15", "10:00", "10:45", "11:30", "12:15", "13:00", "13:45", "14:30", "15:15", "16:00", "16:45", "17:30", "18:15", "19:00", "19:45", "20:30",
];
const horasFin = [
  "07:40", "08:25", "09:10", "09:55", "10:40", "11:25", "12:10", "12:55", "13:40", "14:25", "15:10", "15:55", "16:40", "17:25", "18:10", "18:55", "19:40", "20:25", "21:10",
];
const dias = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];

const cursoColors = {
  "RAZ. MATEMÁTICO": "#D50000",
  "RAZ. VERBAL": "#F4511E",
  "MATEMÁTICA": "#32b779",
  "HISTORIA": "#039ae4",
  "GEOGRAFÍA": "#7887cb",
  "LENGUAJE": "#616161",
  "LITERATURA": "#e67d72",
  "QUÍMICA": "#f7be26",
  "FÍSICA": "#0a8143",
  "BIOLOGÍA": "#3f50b4",
  "PSICOLOGÍA": "#8f24ab",
  "FILOSOFÍA": "#8f24ab",
  "CÍVICA": "#e67d72",
  "INGLÉS": "#f7be26",
  "RAZ. LÓGICO": "#7887cb",
};


export const TablaHorarioMonitor = ({ horas = [] }) => {
  const horaMinima = horas.length ? horas.map((h) => h.hora_ini).sort()[0] : "07:00";
  const horaMaxima = horas.length ? horas.map((h) => h.hora_fin).sort().at(-1) : "12:10";

  const minIndex = horasIni.indexOf(horaMinima);
  const maxIndex = horasFin.indexOf(horaMaxima);

  const getRow = (horaIni) => horasIni.indexOf(horaIni) - minIndex + 2;
  const getRowSpan = (horaIni, horaFin) => horasFin.indexOf(horaFin) - horasIni.indexOf(horaIni) + 1;
  const getColumn = (dia) => dias.indexOf(dia) + 2;

  return (
    <div className="grid grid-cols-7 gap-1 bg-white shadow-md rounded-lg p-4">

      <div></div>

      {dias.map((dia, index) => (
        <Dia key={index} nombre={dia} />
      ))}

      {horasIni.slice(minIndex, maxIndex + 1).map((hora, index) => (
        <Hora key={index} hora={`${hora} - ${horasFin[minIndex + index]}`} />
      ))}

      {dias.flatMap((_, i) =>
        horasIni.slice(minIndex, maxIndex + 1).map((_, k) => (
          <div
            key={`${i}-${k}`}
            className="rounded-lg"
            style={{
              backgroundColor: "#f4f0fb",
              borderRadius: ".2vw",
              gridColumn: i + 2,
              gridRow: k + 2,
              color: "#000",
              minHeight: "3rem", // Aumenta el alto de la celda (ajusta según necesidad)
            }}
          ></div>
        ))
      )}

      {horas.map((hora) => (
        <Curso
          key={`${hora.dia}-${hora.hora_ini}-${hora.hora_fin}`}

          nombre={hora.curso}
          backgroundColor={cursoColors[hora.curso.toUpperCase()] || "#31A8E3"}
          gridColumn={getColumn(hora.dia)}
          gridRow={getRow(hora.hora_ini)}
          gridSpan={getRowSpan(hora.hora_ini, hora.hora_fin)}
          style={{ minHeight: "6rem" }} // Ajuste del alto
        />

      ))}
    </div>
  );
};