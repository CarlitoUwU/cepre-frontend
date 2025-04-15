import { Dia } from './Dia';
import { Hora } from './Hora';
import { Curso } from './Curso';
import React from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

const horasIni = [
  "07:00", "07:45", "08:30", "09:15", "10:00", "10:45", "11:30", "12:15", "13:00", "13:45", "14:30", "15:15", "16:00", "16:45", "17:30", "18:15", "19:00", "19:45", "20:30",
];
const horasFin = [
  "07:40", "08:25", "09:10", "09:55", "10:40", "11:25", "12:10", "12:55", "13:40", "14:25", "15:10", "15:55", "16:40", "17:25", "18:10", "18:55", "19:40", "20:25", "21:10",
];
const diasFull = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];
const diasCorto = ["L", "M", "M", "J", "V", "S"];

export const TablaHorario = ({ listaSalones = [], setClaseSeleccionada = () => { } }) => {
  const isMobile = useIsMobile(1024);

  const dias = diasFull;
  const diasHeader = isMobile ? diasCorto : dias;

  // Obtener rango de horas basado en las clases disponibles
  const horas = listaSalones.flatMap(salon => salon.horas);
  const horaMinima = horas.length ? horas.map(h => h.hora_ini).sort()[0] : "07:00";
  const horaMaxima = horas.length ? horas.map(h => h.hora_fin).sort().at(-1) : "12:10";

  const minIndex = horasIni.indexOf(horaMinima);
  const maxIndex = horasFin.indexOf(horaMaxima);

  const getRow = horaIni => horasIni.indexOf(horaIni) - minIndex + 2;
  const getRowSpan = (horaIni, horaFin) => horasFin.indexOf(horaFin) - horasIni.indexOf(horaIni) + 1;
  const getColumn = dia => dias.indexOf(dia) + 2;

  const areaColors = {
    "Ingenierías": "#A4C2F4",
    "Sociales": "#F7CB9C",
    "Biomédicas": "#92C47F",
  };

  return (
    <div className="grid grid-cols-7 gap-1 bg-white shadow-md rounded-lg p-4">
      {/* Espacio vacío en la esquina superior izquierda */}
      <div></div>

      {/*Encabezado de dias*/}
      {diasHeader.map((dia, index) => (
        <Dia key={index} nombre={dia} />
      ))}

      {/* Horas en la primera columna */}
      {horasIni.slice(minIndex, maxIndex + 1).map((hora, index) => (
        <Hora key={index} hora={`${hora} - ${horasFin[minIndex + index]}`} />
      ))}

      {/* Celdas vacías del grid */}
      {dias.flatMap((_, i) =>
        horasIni.slice(minIndex, maxIndex + 1).map((_, k) => (
          <div
            key={`${i}-${k}`}
            className='rounded-lg'
            style={{
              backgroundColor: "#f4f4f4",
              borderRadius: ".2vw",
              gridColumn: i + 2,
              gridRow: k + 2,
              color: "#000",
            }}
          ></div>
        ))
      )}

      {/* Clases asignadas */}
      {listaSalones.flatMap(salon =>
        salon.horas.map(hora => {
          return <Curso
            key={`${salon.aula}-${hora.dia}-${hora.hora_ini}`}
            clase={{
              aula: salon.aula,
              monitor: salon.monitor,
              area: salon.area,
              numHoras: salon.numHoras,
              enlace: salon.enlace,
            }}
            nombre={salon.aula}
            backgroundColor={areaColors[salon.area] || "#f4351c"}
            gridColumn={getColumn(hora.dia)}
            gridRow={getRow(hora.hora_ini)}
            gridSpan={getRowSpan(hora.hora_ini, hora.hora_fin)}
            setClaseSeleccionada={setClaseSeleccionada}
          />
        })
      )}
    </div>
  );
}