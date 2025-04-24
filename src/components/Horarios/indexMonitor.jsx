import { Dia } from "./Dia";
import { Hora } from "./Hora";
import { Curso } from "./Curso";
import React, { useState, useEffect } from "react";
import { useIsMobile } from '@/hooks/useIsMobile';
import { HORAS_INI, HORAS_FIN } from '@/constants/horas';
import { DIAS } from "@/constants/dias";
import { useCursos } from "@/hooks/useCursos";
import { MonitorsServices } from "@/services/MonitorsServices"; 

export const TablaHorarioMonitor = ({ horas = [] }) => {
  const { cursos } = useCursos();
  const isMobile = useIsMobile(1024);
  const [viewMode, setViewMode] = useState('week');
  const [selectedDay, setSelectedDay] = useState(null);
  const [docentesPorCurso, setDocentesPorCurso] = useState({}); // Estado nuevo para docentes

  const currentDayIndex = new Date().getDay();
  const adjustedDayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;
  const currentDay = DIAS[adjustedDayIndex];

  useEffect(() => {
    setSelectedDay(currentDay);
  }, [currentDay]);

  useEffect(() => {
    fetchProfesoresData();
  }, []);

  const fetchProfesoresData = async () => {
    try {
      const profesores = await MonitorsServices.cargarDocentes();
      const docentesMap = {};
      profesores.forEach(profesor => {
        docentesMap[profesor.courseName.toUpperCase()] = `${profesor.firstName} ${profesor.lastName}`;
      });
      setDocentesPorCurso(docentesMap);
    } catch (error) {
      console.error("Error fetching profesores data", error);
    }
  };

  const diasToShow = viewMode === 'day' ? [selectedDay] : DIAS;
  const diasHeader = isMobile ? diasToShow.map(dia => dia.charAt(0)) : diasToShow;

  const agruparCursosConsecutivos = (horas) => {
    const filteredHours = viewMode === 'day' ? horas.filter(hora => hora.dia === selectedDay) : horas;
    const horasOrdenadas = [...filteredHours].sort((a, b) => {
      if (a.dia !== b.dia) return DIAS.indexOf(a.dia) - DIAS.indexOf(b.dia);
      return HORAS_INI.indexOf(a.hora_ini) - HORAS_INI.indexOf(b.hora_ini);
    });

    const grupos = [];
    let grupoActual = null;

    horasOrdenadas.forEach((hora) => {
      const esAsignado = !hora.curso.toUpperCase().includes("SIN ASIGNAR");
      const esRecreo = hora.curso.toUpperCase().includes("RECREO");

      if (!grupoActual) {
        grupoActual = { ...hora };
      } else if (
        grupoActual.dia === hora.dia &&
        grupoActual.curso.toUpperCase() === hora.curso.toUpperCase() &&
        esAsignado &&
        !esRecreo &&
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

  const horaMinima = horas.length ? Math.min(...horas.map(h => HORAS_INI.indexOf(h.hora_ini))) : 0;
  const horaMaxima = horas.length ? Math.max(...horas.map(h => HORAS_FIN.indexOf(h.hora_fin))) : HORAS_FIN.length - 1;

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
    setSelectedDay(dia);
    if (viewMode === 'week') {
      setViewMode('day');
    }
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'week' ? 'day' : 'week');
  };

  const getGridTemplateColumns = () => {
    if (viewMode === 'day') return '132px 1fr';
    return `132px repeat(${diasToShow.length}, minmax(0, 1fr))`;
  };

  const rowHeight = isMobile ? '4rem' : '2.5rem';

  const renderDayView = () => {
    const horasDelDia = horasAgrupadas.filter(h => h.dia === selectedDay);
    const horasOrdenadas = [...horasDelDia].sort((a, b) =>
      HORAS_INI.indexOf(a.hora_ini) - HORAS_INI.indexOf(b.hora_ini)
    );

    return (
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#78211E]">
          Horario - {selectedDay}
        </h2>

        <div className="space-y-2.5">
          {horasOrdenadas.map((hora, index) => {
            const esRecreo = hora.curso.toUpperCase().includes("RECREO");
            const color = esRecreo ? '#FACC15' : getColor(hora.curso);

            return (
              <div key={index} className="flex gap-3 items-stretch">
                <div className={`flex-shrink-0 flex items-center justify-center rounded-md bg-gray-100 font-semibold text-gray-700 ${isMobile ? 'min-w-[65px] h-20 sm:h-16 flex-col text-sm leading-tight' : 'min-w-[130px] h-16 text-base px-2'}`}>
                  {isMobile ? (
                    <>
                      <span>{hora.hora_ini}</span>
                      <span className="text-xs text-gray-500">↓</span>
                      <span>{hora.hora_fin}</span>
                    </>
                  ) : (
                    <span>{hora.hora_ini} - {hora.hora_fin}</span>
                  )}
                </div>
                <div className="flex-1 flex rounded-lg overflow-hidden bg-white shadow border border-gray-200 h-20 sm:h-16">
                  <div className="w-3 sm:w-4" style={{ backgroundColor: color, flexShrink: 0 }} />
                  <div className="flex-1 px-4 py-2 flex flex-col justify-center">
                    <span className="text-base sm:text-lg font-bold text-gray-800 leading-5 truncate">
                      {hora.curso}
                    </span>
                    {!esRecreo && (
                      <span className="text-sm text-gray-500 mt-0.5 border-t border-gray-200 pt-0.5">
                        Docente: {docentesPorCurso[hora.curso.toUpperCase()] || 'Por asignar'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 lg:p-6">
      <div className="flex flex-col mb-6 space-y-4">
        <div className="flex justify-center">
          <button onClick={() => setViewMode('week')} className={`px-4 py-2 rounded-l-lg ${viewMode === 'week' ? 'bg-[#78211E] text-white' : 'bg-gray-200 hover:bg-gray-300'} transition-colors font-medium`}>
            Vista Semanal
          </button>
          <button onClick={() => setViewMode('day')} className={`px-4 py-2 rounded-r-lg ${viewMode === 'day' ? 'bg-[#78211E] text-white' : 'bg-gray-200 hover:bg-gray-300'} transition-colors font-medium`}>
            Vista Diaria
          </button>
        </div>
        {viewMode === 'day' && (
          <div className="flex justify-center overflow-x-auto py-2 space-x-2">
            {DIAS.map((dia) => (
              <button
                key={dia}
                onClick={() => handleDayClick(dia)}
                className={`px-4 py-2 rounded-lg min-w-[3rem] ${dia === selectedDay ? 'bg-[#78211E] text-white' : 'bg-gray-100 hover:bg-gray-200'} transition-colors ${dia === currentDay ? 'font-bold ring-2 ring-[#78211E]' : ''}`}
              >
                {isMobile ? dia.charAt(0) : dia.substring(0, 3)}
              </button>
            ))}
          </div>
        )}
      </div>
      {viewMode === 'day' ? renderDayView() : (
        <div className="grid gap-1" style={{ gridTemplateColumns: getGridTemplateColumns(), gridAutoRows: rowHeight }}>
          <div className="rounded-lg bg-gray-100"></div>
          {diasHeader.map((dia, index) => (
            <Dia key={index} nombre={dia} isCurrent={DIAS[index] === currentDay} onClick={() => handleDayClick(DIAS[index])} clickable={true} />
          ))}
          {HORAS_INI.slice(horaMinima, horaMaxima + 1).map((hora, index) => (
            <React.Fragment key={index}>
              <Hora hora={`${hora} - ${HORAS_FIN[horaMinima + index]}`} style={{ minWidth: '132px', height: rowHeight }} />
              {diasToShow.map((_, i) => (
                <div key={`empty-${i}-${index}`} className="rounded-lg" style={{ backgroundColor: "#f4f0fb", gridColumn: i + 2, gridRow: index + 2, height: rowHeight }} />
              ))}
            </React.Fragment>
          ))}
          {horasAgrupadas.map((hora) => (
            <Curso
              key={`${hora.dia}-${hora.hora_ini}-${hora.hora_fin}`}
              nombre={acortarNombreCurso(hora.curso)}
              backgroundColor={getColor(hora.curso)}
              gridColumn={getColumn(hora.dia)}
              gridRow={getRow(hora.hora_ini)}
              gridSpan={getRowSpan(hora.hora_ini, hora.hora_fin)}
              style={{
                height: `calc(${getRowSpan(hora.hora_ini, hora.hora_fin)} * ${rowHeight} - 0.25rem)`,
                fontSize: '0.9rem',
                padding: '0.3rem',
                lineHeight: '1.2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                flexDirection: 'column'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};