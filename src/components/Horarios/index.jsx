import { Dia } from './Dia';
import { Hora } from './Hora';
import { Curso } from './Curso';
import React from 'react';

const horasIni = [
  "07:00", "07:50", "08:50", "09:40", "10:40", "11:30", "12:20", "13:10", "14:00", "14:50", "15:50", "16:40", "17:40", "18:30", "19:20", "20:10"
];
const horasFin = [
  "07:50", "08:40", "09:40", "10:30", "11:30", "12:20", "13:10", "14:00", "14:50", "15:40", "16:40", "17:30", "18:30", "19:20", "20:10", "21:00"
];
const dias = [
  "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"
];

export const TablaHorario = ({ listaSalones = [], setClaseSeleccionada = () => { } }) => {
  // Obtener rango de horas basado en las clases disponibles
  const horas = listaSalones.flatMap(salon => salon.horas);
  const horaMinima = horas.length ? horas.map(h => h.hora_ini).sort()[0] : "07:00";
  const horaMaxima = horas.length ? horas.map(h => h.hora_fin).sort().at(-1) : "21:00";

  const minIndex = horasIni.indexOf(horaMinima);
  const maxIndex = horasFin.indexOf(horaMaxima);

  const getRow = horaIni => horasIni.indexOf(horaIni) - minIndex + 2;
  const getRowSpan = (horaIni, horaFin) => horasFin.indexOf(horaFin) - horasIni.indexOf(horaIni) + 1;
  const getColumn = dia => dias.indexOf(dia) + 2;

  const areaColors = {
    "Ingenierías": "#31A8E3",
    "Sociales": "#E3C459",
    "Biomédicas": "#50E372"
  };

  return (
    <div className="grid grid-cols-7 gap-1 bg-white shadow-md rounded-lg p-4">
      {/* Espacio vacío en la esquina superior izquierda */}
      <div></div>

      {/*Encabezado de dias*/}
      {dias.map((dia, index) => (
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
              backgroundColor: "#f4f0fb",
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
            key={hora.id}
            clase={{
              aula: salon.aula,
              monitor: salon.monitor,
              area: salon.area,
              numHoras: salon.numHoras,
              enlace: salon.enlace,
            }}
            nombre={salon.aula}
            backgroundColor={areaColors[salon.area] || "#000"}
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