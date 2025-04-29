import { Dia } from './Dia';
import { Hora } from './Hora';
import { Curso } from './Curso';
import React from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { AREA_COLORS } from '@/constants/areaColors';
import { HORAS_INI, HORAS_FIN } from '@/constants/horas';
import { DIAS } from "@/constants/dias";

const agruparHoras = (horas) => {
  const horasOrdenadas = [...horas].sort((a, b) => {
    if (a.dia !== b.dia) return DIAS.indexOf(a.dia) - DIAS.indexOf(b.dia);
    return HORAS_INI.indexOf(a.hora_ini) - HORAS_INI.indexOf(b.hora_ini);
  });

  const grupos = [];
  let grupoActual = null;

  horasOrdenadas.forEach((hora) => {
    if (
      grupoActual &&
      grupoActual.dia === hora.dia &&
      HORAS_FIN.indexOf(grupoActual.hora_fin) + 1 === HORAS_INI.indexOf(hora.hora_ini)
    ) {
      // Agrupar si es misma asignatura y hora consecutiva
      grupoActual.hora_fin = hora.hora_fin;
    } else {
      if (grupoActual) grupos.push(grupoActual);
      grupoActual = { ...hora };
    }
  });

  if (grupoActual) grupos.push(grupoActual);
  return grupos;
};

export const TablaHorario = ({ listaSalones = [], setClaseSeleccionada = () => { } }) => {
  const isMobile = useIsMobile(1024);

  const dias = DIAS;
  const diasHeader = isMobile ? DIAS.map(dia => dia.charAt(0)) : dias;

  // Obtener rango de horas basado en las clases disponibles
  const horas = listaSalones.flatMap(salon => salon.horas);
  const listaSalonesAgrupada = listaSalones.map(salon => {
    const horas_salon = agruparHoras(salon.horas);
    return {
      ...salon,
      horas: horas_salon
    }
  });
  const horaMinima = horas.length ? horas.map(h => h.hora_ini).sort()[0] : "07:00";
  const horaMaxima = horas.length ? horas.map(h => h.hora_fin).sort().at(-1) : "12:10";

  const minIndex = HORAS_INI.indexOf(horaMinima);
  const maxIndex = HORAS_FIN.indexOf(horaMaxima);

  const getRow = horaIni => HORAS_INI.indexOf(horaIni) - minIndex + 2;
  const getRowSpan = (horaIni, horaFin) => HORAS_FIN.indexOf(horaFin) - HORAS_INI.indexOf(horaIni) + 1;
  const getColumn = dia => dias.indexOf(dia) + 2;

  return (
    <div className="grid grid-cols-7 gap-1 bg-white shadow-md rounded-lg p-4">
      {/* Espacio vacío en la esquina superior izquierda */}
      <div></div>

      {/*Encabezado de dias*/}
      {diasHeader.map((dia, index) => (
        <Dia key={index} nombre={dia} />
      ))}

      {/* Horas en la primera columna */}
      {HORAS_INI.slice(minIndex, maxIndex + 1).map((hora, index) => (
        <Hora key={index} hora={`${hora} - ${HORAS_FIN[minIndex + index]}`} />
      ))}

      {/* Celdas vacías del grid */}
      {dias.flatMap((_, i) =>
        HORAS_INI.slice(minIndex, maxIndex + 1).map((_, k) => (
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
      {listaSalonesAgrupada.flatMap(salon =>
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
            backgroundColor={AREA_COLORS[salon.area] || "#f4351c"}
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