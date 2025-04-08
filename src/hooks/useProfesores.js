import { useQuery } from "@tanstack/react-query";
import TeachersServices from "@/services/teachersServices.js";

export const useProfesores = ({ page = 1, limit = 20 } = {}) => {
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
  };
};