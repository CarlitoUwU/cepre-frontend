import { useEffect, useState, useCallback } from "react";
import { HourSessionsServices } from "@/services/HourSessionsServices";

/**
 * Hook para transformar horas de disponibilidad en bloques horarios
 * @returns {{
 *   loading: boolean,
 *   error: Error | null,
 *   mapearABloques: (disponibilidad?: Array<any>) => Array<{id_hour_session: number, weekday: string}>,
 *   isReady: boolean
 * }}
 */
export const useHorasABloques = () => {
  const [hourSessions, setHourSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const formatHora = useCallback((hora) => {
    if (!hora || typeof hora !== "string") return null;
    const trimmed = hora.trim();
    if (!/^\d{1,2}:\d{2}(:\d{2})?$/.test(trimmed)) return null;
    return trimmed.length === 5 ? `${trimmed}:00` : trimmed;
  }, []);

  const normalizarHora = (horaCompleta) => {
    if (!horaCompleta || typeof horaCompleta !== "string") return "";
    const match = horaCompleta.match(/T?(\d{2}:\d{2}:\d{2})/);
    return match ? match[1] : "";
  };

  const capitalizar = (str) => {
    const strSinTildes = str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Elimina tildes
    return strSinTildes.charAt(0).toUpperCase() + strSinTildes.slice(1).toLowerCase();
  };

  const mapearABloques = useCallback(
    (disponibilidad = []) => {
      if (!Array.isArray(disponibilidad) || !isReady) return [];

      return disponibilidad
        .map((item) => {
          // Ya viene en formato correcto (por ejemplo desde localStorage)
          if (item.id_hour_session && item.weekday && !item.hora_ini && !item.hora_fin) {
            const valid = hourSessions.some(h => h.id === Number(item.id_hour_session));
            if (!valid) return null;

            return {
              id_hour_session: Number(item.id_hour_session),
              weekday: capitalizar(item.weekday),
            };
          }

          const { dia, hora_ini, hora_fin } = item;

          if (!dia || !hora_ini || !hora_fin) return null;

          const formattedHoraIni = formatHora(hora_ini);
          const formattedHoraFin = formatHora(hora_fin);

          const match = hourSessions.find(
            (sesion) =>
              normalizarHora(sesion.startTime) === formattedHoraIni &&
              normalizarHora(sesion.endTime) === formattedHoraFin
          );

          if (!match) {
            console.warn("No se encontro bloque para:", formattedHoraIni, formattedHoraFin, dia);
            return null;
          }

          return {
            id_hour_session: match.id,
            weekday: capitalizar(dia),
          };
        })
        .filter(Boolean);
    },
    [hourSessions, formatHora, isReady]
  );

  useEffect(() => {
    let isMounted = true;

    const cargarSesiones = async () => {
      try {
        const data = await HourSessionsServices.getHourSessions();
        if (isMounted) {
          setHourSessions(data);
          setIsReady(true);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setIsReady(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    cargarSesiones();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    loading,
    error,
    mapearABloques,
    isReady,
  };
};
