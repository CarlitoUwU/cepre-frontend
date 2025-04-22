import { useEffect, useState, useCallback } from "react";
import HourSessionsServices from "@/services/HourSessionsServices";

/**
 * Hook para transformar horas de disponibilidad en bloques horarios
 * @returns {{
 *   loading: boolean,
 *   error: Error | null,
 *   mapearABloques: (disponibilidad?: Array<{hora_ini?: string, hora_fin?: string, dia?: string}>) => Array<{id_hour_session: number, weekday: string}>,
 *   isReady: boolean
 * }}
 */
export const useHorasABloques = () => {
  const [hourSessions, setHourSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);

  /**
   * Formatea una hora al formato HH:MM:SS
   * @param {string | undefined | null} hora - Hora en formato HH:MM o HH:MM:SS
   * @returns {string | null} Hora formateada o null si no es válida
   */
  const formatHora = useCallback((hora) => {
    if (!hora || typeof hora !== "string") return null;

    const trimmedHora = hora.trim();

    if (!/^\d{1,2}:\d{2}(:\d{2})?$/.test(trimmedHora)) return null;

    return trimmedHora.length === 5 ? `${trimmedHora}:00` : trimmedHora;
  }, []);

  /**
   * Normaliza hora a HH:MM:SS exacto para comparación
   * @param {string} hora 
   * @returns {string}
   */
  const normalizarHora = (hora) => {
    if (!hora) return "";
    return hora.trim().padEnd(8, ":00").substring(0, 8);
  };

  /**
   * Transforma disponibilidad horaria en bloques de sesión
   * @param {Array<{hora_ini?: string, hora_fin?: string, dia?: string}>} [disponibilidad=[]]
   * @returns {Array<{id_hour_session: number, weekday: string}>}
   */
  const mapearABloques = useCallback(
    (disponibilidad = []) => {
      if (!Array.isArray(disponibilidad) || !isReady) return [];

      return disponibilidad
        .map((item) => {
          if (!item || typeof item !== "object") return null;

          const { hora_ini, hora_fin, dia } = item;

          if (!hora_ini || !hora_fin || !dia) return null;

          const formattedHoraIni = formatHora(hora_ini);
          const formattedHoraFin = formatHora(hora_fin);

          if (!formattedHoraIni || !formattedHoraFin) return null;

          const match = hourSessions.find(
            (sesion) =>
              normalizarHora(sesion.startTime) === formattedHoraIni &&
              normalizarHora(sesion.endTime) === formattedHoraFin
          );

          if (!match) {
            console.warn("No se encontró bloque para:", formattedHoraIni, formattedHoraFin, dia);
            console.log("Sesiones disponibles:", hourSessions.map(s => `${s.startTime} - ${s.endTime}`));
            return null;
          }

          return {
            id_hour_session: match.id,
            weekday: dia,
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
          console.log("Sesiones horarias cargadas:", data); // Log para depuración
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
