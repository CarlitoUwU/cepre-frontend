import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TeachersServices } from "@/services/TeachersServices";

export const useProfesores = ({ page = 1, limit = 20 } = {}) => {
  const queryClient = useQueryClient();

  // Obtener los profesores con useQuery
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["profesores", page, limit], // clave única para cachear y reutilizar esta consulta
    queryFn: () => TeachersServices.getTeachers(page, limit),
    staleTime: 1000 * 60 * 5, // 5 minutos: evita refetch si no ha pasado ese tiempo
    cacheTime: 1000 * 60 * 10, // 10 minutos en memoria si no se está usando
    retry: 1, // solo 1 intento si falla
    refetchOnWindowFocus: false, // no vuelve a pedir la data al cambiar de pestaña
  });

  // Mutación para crear un profesor
  const crearProfesorMutation = useMutation({
    mutationFn: TeachersServices.createTeacher,
    onSuccess: (nuevoProfesor) => {
      queryClient.setQueryData(["profesores", page, limit], (prev) => {
        if (!prev) return;
        return {
          ...prev,
          data: [nuevoProfesor, ...prev.data],
          total: prev.total + 1,
        };
      });
    },
  });

  // Mutación para actualizar un profesor
  const actualizarProfesorMutation = useMutation({
    mutationFn: TeachersServices.updateTeacher,
    onSuccess: (profesorActualizado) => {
      queryClient.setQueryData(["profesores", page, limit], (prev) => {
        if (!prev) return;
        return {
          ...prev,
          data: prev.data.map((p) =>
            p.id === profesorActualizado.id ? profesorActualizado : p
          ),
        };
      });
    },
  });

  // Mutación para eliminar un profesor
  const eliminarProfesorMutation = useMutation({
    mutationFn: TeachersServices.deleteTeacher,
    onSuccess: (_, idEliminado) => {
      queryClient.setQueryData(["profesores", page, limit], (prev) => {
        if (!prev) return;
        return {
          ...prev,
          data: prev.data.filter((p) => p.id !== idEliminado),
          total: prev.total - 1,
        };
      });
    },
  });

  const profesores = data?.data || [];
  const total = data?.total || 0; // total de profesores
  const totalPages = Math.ceil(total / limit);

  return {
    profesores,
    total,
    totalPages,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    crearProfesorMutation,
    actualizarProfesorMutation,
    eliminarProfesorMutation,
  };
};