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
      grupoActual.aula === hora.aula &&
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

export const HorarioDocenteCompleto = ({
  horarios = [],
  setClaseSeleccionada = () => { },
  idDocente = null,
  estadoEliminar = false,
}) => {
  const isMobile = useIsMobile(1024);

  // Procesar los datos del horario
  const clasesProcesadas = horarios.map((item) => ({
    id: item.id,
    aula: item.clase || 'Sin aula',
    area: item.area || 'Sin área',
    dia: item.dia,
    hora_ini: item.hora_ini,
    hora_fin: item.hora_fin,
  }));

  const horasAgrupadas = agruparHoras(clasesProcesadas);

  // Obtener rango de horas
  const horasDisponibles = horasAgrupadas.flatMap(c => [c.hora_ini, c.hora_fin]);
  const horaMinima = horasDisponibles.length ? horasDisponibles.sort()[0] : "07:00";
  const horaMaxima = horasDisponibles.length ? horasDisponibles.sort().at(-1) : "12:10";

  const minIndex = Math.max(HORAS_INI.indexOf(horaMinima), 0);
  const maxIndex = Math.min(HORAS_FIN.indexOf(horaMaxima), HORAS_FIN.length - 1);

  // Funciones de ayuda para el grid
  const getRow = horaIni => HORAS_INI.indexOf(horaIni) - minIndex + 2;
  const getRowSpan = (horaIni, horaFin) => HORAS_FIN.indexOf(horaFin) - HORAS_INI.indexOf(horaIni) + 1;
  const getColumn = dia => DIAS.indexOf(dia) + 2;

  const dias = DIAS;
  const diasHeader = isMobile ? DIAS.map(dia => dia.charAt(0)) : dias;

  if (!horasAgrupadas.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        No hay horarios disponibles para mostrar
      </div>
    );
  }

  return (
    <div className="grid grid-cols-7 gap-1 bg-white shadow-md rounded-lg p-4">
      {/* Espacio vacío en la esquina superior izquierda */}
      <div></div>

      {/* Encabezado de dias */}
      {diasHeader.map((dia, index) => (
        <Dia key={`dia-${index}`} nombre={dia} />
      ))}

      {/* Horas en la primera columna */}
      {HORAS_INI.slice(minIndex, maxIndex + 1).map((hora, index) => (
        <Hora key={`hora-${index}`} hora={`${hora} - ${HORAS_FIN[minIndex + index]}`} />
      ))}

      {/* Celdas vacías del grid */}
      {dias.flatMap((dia, i) =>
        HORAS_INI.slice(minIndex, maxIndex + 1).map((_, k) => (
          <div
            key={`celda-${dia}-${k}`}
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
      {horasAgrupadas.map(clase => (
        <Curso
          key={`${clase.aula}-${clase.dia}-${clase.hora_ini}-${clase.hora_fin}`}
          clase={{
            aula: clase.aula,
            monitor: clase.monitor,
            area: clase.area,
            numHoras: clase.numHoras,
            enlace: clase.enlace,
          }}
          nombre={clase.aula}
          backgroundColor={estadoEliminar ? "#e3242b" : AREA_COLORS[clase.area] || "#f4351c"}  //rojo eliminar
          gridColumn={getColumn(clase.dia)}
          gridRow={getRow(clase.hora_ini)}
          gridSpan={getRowSpan(clase.hora_ini, clase.hora_fin)}
          setClaseSeleccionada={() => setClaseSeleccionada({ idDocente, idClase: clase.id })}
        />
      ))}
    </div>
  );
};