import { Dia } from "./Dia";
import { Hora } from "./Hora";
import { Curso } from "./Curso";
import React, { useState, useEffect } from "react";
import { useIsMobile } from '@/hooks/useIsMobile';
import { HORAS_INI, HORAS_FIN } from '@/constants/horas';
import { DIAS } from "@/constants/dias";
import { useCursos } from "@/hooks/useCursos";

export const TablaHorarioMonitor = ({ horas = [] }) => {
  const { cursos } = useCursos();
  const isMobile = useIsMobile(1024);
  const [viewMode, setViewMode] = useState('week');
  const [selectedDay, setSelectedDay] = useState(null);
  
  // Obtener y ajustar el día actual
  const currentDayIndex = new Date().getDay();
  const adjustedDayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;
  const currentDay = DIAS[adjustedDayIndex];
  
  // Efecto para inicializar el día seleccionado
  useEffect(() => {
    setSelectedDay(currentDay);
  }, [currentDay]);

  // Determinar días a mostrar
  const diasToShow = viewMode === 'day' ? [selectedDay] : DIAS;
  const diasHeader = isMobile ? diasToShow.map(dia => dia.charAt(0)) : diasToShow;

  // Función para agrupar cursos
  const agruparCursosConsecutivos = (horas) => {
    const filteredHours = viewMode === 'day' 
      ? horas.filter(hora => hora.dia === selectedDay)
      : horas;

    const horasOrdenadas = [...filteredHours].sort((a, b) => {
      if (a.dia !== b.dia) return DIAS.indexOf(a.dia) - DIAS.indexOf(b.dia);
      return HORAS_INI.indexOf(a.hora_ini) - HORAS_INI.indexOf(b.hora_ini);
    });

    const grupos = [];
    let grupoActual = null;

    horasOrdenadas.forEach((hora) => {
      const esAsignado = !hora.curso.toUpperCase().includes("SIN ASIGNAR");

      if (!grupoActual) {
        grupoActual = { ...hora };
      } else if (
        grupoActual.dia === hora.dia &&
        grupoActual.curso.toUpperCase() === hora.curso.toUpperCase() &&
        esAsignado &&
        HORAS_FIN.indexOf(grupoActual.hora_fin) + 1 === HORAS_INI.indexOf(hora.hora_ini)
      ) {
        grupoActual.hora_fin = hora.hora_fin;
      } else {
        grupos.push(grupoActual);
        grupoActual = { ...hora };
      }
    });

    if (grupoActual) grupos.push(grupoActual);
    return grupos;
  };

  const horasAgrupadas = agruparCursosConsecutivos(horas);

  // Calcular rango de horas
  const horaMinima = horas.length ? Math.min(...horas.map(h => HORAS_INI.indexOf(h.hora_ini))) : 0;
  const horaMaxima = horas.length ? Math.max(...horas.map(h => HORAS_FIN.indexOf(h.hora_fin))) : HORAS_FIN.length - 1;

  // Funciones auxiliares
  const getRow = (horaIni) => HORAS_INI.indexOf(horaIni) - horaMinima + 2;
  const getRowSpan = (horaIni, horaFin) => HORAS_FIN.indexOf(horaFin) - HORAS_INI.indexOf(horaIni) + 1;
  const getColumn = (dia) => diasToShow.indexOf(dia) + 2;
  const getColor = (curso) => cursos.find(c => c.name.toUpperCase() === curso.toUpperCase())?.color || "#31A8E3";

  const acortarNombreCurso = (nombre) => {
    if (!isMobile) return nombre;
    const palabras = nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().split(" ");
    return palabras.length === 1 
      ? palabras[0].slice(0, 3).toUpperCase().split("").join("\n")
      : palabras.map(p => p[0]?.toUpperCase()).join("\n");
  };

  const handleDayClick = (dia) => {
    if (viewMode === 'week') {
      setViewMode('day');
      setSelectedDay(dia);
    } else {
      setSelectedDay(dia);
    }
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'week' ? 'day' : 'week');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Controles de vista */}
      <div className="flex flex-col mb-4 space-y-2">
        <div className="flex justify-center">
          <button
            onClick={() => setViewMode('week')}
            className={`px-4 py-2 rounded-l-lg ${
              viewMode === 'week' ? 'bg-[#78211E] text-white' : 'bg-gray-200 hover:bg-gray-300'
            } transition-colors`}
          >
            Ver Semana
          </button>
          <button
            onClick={() => setViewMode('day')}
            className={`px-4 py-2 rounded-r-lg ${
              viewMode === 'day' ? 'bg-[#78211E] text-white' : 'bg-gray-200 hover:bg-gray-300'
            } transition-colors`}
          >
            Ver Día
          </button>
        </div>

        {viewMode === 'day' && (
          <div className="flex justify-center overflow-x-auto py-2 space-x-1">
            {DIAS.map((dia) => (
              <button
                key={dia}
                onClick={() => handleDayClick(dia)}
                className={`px-3 py-1 rounded-lg min-w-[2rem] ${
                  dia === selectedDay 
                    ? 'bg-[#78211E] text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                } transition-colors ${
                  dia === currentDay ? 'font-bold' : ''
                }`}
              >
                {isMobile ? dia.charAt(0) : dia.substring(0, 3)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tabla de horario */}
      <div 
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${diasToShow.length + 1}, minmax(0, 1fr))`,
        }}
      >
        {/* Celda vacía para esquina superior izquierda */}
        <div></div>

        {/* Encabezados de días */}
        {diasHeader.map((dia, index) => (
          <Dia 
            key={index} 
            nombre={dia} 
            isCurrent={DIAS[index] === currentDay && viewMode === 'week'}
            onClick={() => handleDayClick(DIAS[index])}
            clickable={true}
          />
        ))}

        {/* Horas */}
        {HORAS_INI.slice(horaMinima, horaMaxima + 1).map((hora, index) => (
          <Hora 
            key={index} 
            hora={`${hora} - ${HORAS_FIN[horaMinima + index]}`} 
          />
        ))}

        {/* Celdas vacías */}
        {diasToShow.flatMap((_, i) =>
          HORAS_INI.slice(horaMinima, horaMaxima + 1).map((_, k) => (
            <div
              key={`${i}-${k}`}
              className="rounded-lg"
              style={{
                backgroundColor: "#f4f0fb",
                gridColumn: i + 2,
                gridRow: k + 2,
                minHeight: "3rem",
              }}
            />
          ))
        )}

        {/* Cursos */}
        {horasAgrupadas.map((hora) => (
          <Curso
            key={`${hora.dia}-${hora.hora_ini}-${hora.hora_fin}`}
            nombre={acortarNombreCurso(hora.curso)}
            backgroundColor={getColor(hora.curso)}
            gridColumn={getColumn(hora.dia)}
            gridRow={getRow(hora.hora_ini)}
            gridSpan={getRowSpan(hora.hora_ini, hora.hora_fin)}
            style={{ minHeight: "6rem" }}
          />
        ))}
      </div>
    </div>
  );
};