import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TeachersServices } from "@/services/TeachersServices.js";
import { SchedulesService } from "@/services/SchedulesServices";

export const useProfesoresDisponibles = ({ courseId, hourSessions, page = 1, limit = 10 }) => {
  const enabled = Boolean(courseId && hourSessions) && Array.isArray(hourSessions) && hourSessions.length > 0;
  //console.log({ courseId, hourSessions });

  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["profesoresDisponibles", courseId, hourSessions, page, limit],
    queryFn: () =>
      TeachersServices.getTeacherAvailable({ courseId: parseInt(courseId), hourSessions }, page, limit),
    staleTime: 1000 * 60 * 5, // 5 minutos sin volver a pedir los mismos datos
    cacheTime: 1000 * 60 * 10, // 10 minutos de retención en caché
    retry: 1,
    refetchOnWindowFocus: false,
    enabled, // evita ejecutar la query si no se tiene los datos necesarios
  });

  const asignarClaseMutation = useMutation({
    mutationFn: ({ teacherId, classId }) =>
      SchedulesService.asignarSchedulesByTeacherClass({
        teacherId,
        classId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["profesoresDisponibles", courseId, hourSessions, page, limit],
      });
    },
    onError: (error) => {
      console.error("Error al desasignar profesor:", error);
    },
  });

  const desasignarClaseMutation = useMutation({
    mutationFn: ({ teacherId, classId }) =>
      SchedulesService.desasignarSchedulesByTeacherClass({
        teacherId,
        classId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["profesoresDisponibles", courseId, hourSessions, page, limit]);
    },
    onError: (error) => {
      console.error("Error al desasignar profesor:", error);
    },
  });


  const profesores = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    profesores,
    total,
    totalPages,
    isLoading,
    isError,
    error,
    asignarClaseMutation,
    desasignarClaseMutation,
    refetch,
    isFetching,
  };
};
