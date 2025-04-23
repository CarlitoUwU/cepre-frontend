import { useEffect, useState, useCallback } from 'react';
import ClassesServices from '../services/ClassesServices';

export function useInfoClases(classId) {
  const [schedules, setSchedules] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInfo = useCallback(async () => {
    if (!classId) return;

    setLoading(true);
    setError(null);
    try {
      const [scheduleRes, teachersRes] = await Promise.all([
        ClassesServices.getSchedulesByClassId(classId),
        ClassesServices.getTeachersByClassId(classId)
      ]);

      setSchedules(scheduleRes);
      setTeachers(teachersRes.filter(docente => docente.firstName !== "no asignado"));

    } catch (err) {
      console.error('Error al obtener información de la clase:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [classId]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchInfo();
    };

    fetchData();
  }, [fetchInfo]);

  const refetch = useCallback(() => {
    fetchInfo();
  }, [fetchInfo]);

  return {
    schedules,
    teachers,
    loading,
    refetch,
    error,
  };
}