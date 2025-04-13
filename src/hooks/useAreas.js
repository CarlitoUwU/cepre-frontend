import { useQuery } from "@tanstack/react-query";
import AreasServices from "@/services/areaServices.js";

export const useAreas = () => {
  // Obtener las areas con useQuery
  const {
    data: areas = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["areas"], // clave única para cachear y reutilizar esta consulta
    queryFn: AreasServices.getAreas,
    staleTime: 1000 * 60 * 5, // 5 minutos: evita refetch si no ha pasado ese tiempo
    cacheTime: 1000 * 60 * 10, // 10 minutos en memoria si no se está usando
    retry: 1, // solo 1 intento si falla
    refetchOnWindowFocus: false, // no vuelve a pedir la data al cambiar de pestaña
  });

  return {
    areas,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  };
}