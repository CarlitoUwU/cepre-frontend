import { useQuery } from "@tanstack/react-query";
import { AuthServices } from "@/services/AuthServices";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: AuthServices.getUserInfo,
    enabled: !!localStorage.getItem("token"), // Solo si hay token
    staleTime: 1000 * 60 * 10, // 10 minutos fresco
    cacheTime: 1000 * 60 * 15, // 15 minutos en caché
    retry: 1,
  });
};
