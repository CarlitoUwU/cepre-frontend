import { useEffect, useState } from "react";
import ScheduleService from "@/services/SchedulesServices";

export const useSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const data = await ScheduleService.getSchedules();
      setSchedules(data || []);
    } catch (err) {
      console.error("Error al obtener horarios:", err.message);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getScheduleById = async (id) => {
    try {
      return await ScheduleService.getScheduleById(id);
    } catch (err) {
      console.error("Error al obtener horario por ID:", err.message);
      setError(err);
      return null;
    }
  };

  const createSchedule = async (nuevoHorario) => {
    try {
      const creado = await ScheduleService.createSchedule(nuevoHorario);
      await fetchSchedules(); // Refresca lista
      return creado;
    } catch (err) {
      console.error("Error al crear horario:", err.message);
      setError(err);
      return null;
    }
  };

  const updateSchedule = async (horario) => {
    try {
      const actualizado = await ScheduleService.updateSchedule(horario);
      await fetchSchedules();
      return actualizado;
    } catch (err) {
      console.error("Error al actualizar horario:", err.message);
      setError(err);
      return null;
    }
  };

  const deleteSchedule = async (id) => {
    try {
      const eliminado = await ScheduleService.deleteSchedule(id);
      await fetchSchedules();
      return eliminado;
    } catch (err) {
      console.error("Error al eliminar horario:", err.message);
      setError(err);
      return false;
    }
  };

  const loadWithCourses = async () => {
    try {
      return await ScheduleService.loadWithCourses();
    } catch (err) {
      console.error("Error al cargar con cursos:", err.message);
      setError(err);
      return null;
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return {
    schedules,
    loading,
    error,
    fetchSchedules,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    loadWithCourses,
  };
};
