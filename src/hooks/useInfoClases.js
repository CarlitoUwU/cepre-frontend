import { useEffect, useState } from 'react';
import ClassesServices from '../services/ClassesServices';  // Asegúrate de que la ruta esté correcta

export function useInfoClases(classId) {
  const [schedules, setSchedules] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!classId) return;

    const fetchInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        // Usando los servicios importados para obtener los datos
        const [scheduleRes, teachersRes] = await Promise.all([
          ClassesServices.getSchedulesByClassId(classId),
          ClassesServices.getTeachersByClassId(classId)
        ]);

        // Ajustar la respuesta de los horarios si es necesario
        setSchedules(scheduleRes);
        
        // Ajustar la respuesta de los docentes si es necesario
        setTeachers(teachersRes);

      } catch (err) {
        console.error('Error al obtener información de la clase:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [classId]);

  return {
    schedules,
    teachers,
    loading,
    error,
  };
}
