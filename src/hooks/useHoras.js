import { useState, useEffect } from 'react';
import HourSessionsServices from '@/services/hourSessionsServices';

/**
 * Hook para obtener las sesiones de hora.
 */
export const useHoras = () => {
  const [horas, setHoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener las sesiones de hora desde el servicio
  useEffect(() => {
    const fetchHoras = async () => {
      try {
        setLoading(true);
        const data = await HourSessionsServices.getHourSessions();
        if (data) {
          setHoras(data); // Guardamos las sesiones de hora
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHoras();
  }, []); // Este useEffect solo se ejecuta una vez al montar el componente

  return { horas, loading, error };
};

