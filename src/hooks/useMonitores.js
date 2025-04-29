import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MonitorsServices } from "@/services/MonitorsServices.js";

export const useMonitores = ({ page = 1, limit = 20, shift_id = null} = {}) => {
  const queryClient = useQueryClient();

  // Obtener los monitores
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["monitores", page, limit, shift_id],
    queryFn: () => MonitorsServices.getMonitors(page, limit, shift_id),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Mutación: crear monitor
  const crearMonitorMutation = useMutation({
    mutationFn: MonitorsServices.createMonitor,
    onSuccess: (nuevoMonitor) => {
      queryClient.setQueryData(["monitores", page, limit], (prev) => {
        if (!prev) return;
        return {
          ...prev,
          data: [nuevoMonitor, ...prev.data],
          total: prev.total + 1,
        };
      });
    },
  });

  // Mutación: actualizar monitor
  const actualizarMonitorMutation = useMutation({
    mutationFn: MonitorsServices.updateMonitor,
    onSuccess: (monitorActualizado) => {
      queryClient.setQueryData(["monitores", page, limit], (prev) => {
        if (!prev) return;
        return {
          ...prev,
          data: prev.data.map((m) =>
            m.id === monitorActualizado.id ? monitorActualizado : m
          ),
        };
      });
    },
  });

  // Mutación: eliminar monitor
  const eliminarMonitorMutation = useMutation({
    mutationFn: MonitorsServices.deactivate,
    onSuccess: (_, idEliminado) => {
      queryClient.setQueryData(["monitores", page, limit], (prev) => {
        if (!prev) return;
        return {
          ...prev,
          data: prev.data.filter((m) => m.id !== idEliminado),
          total: prev.total - 1,
        };
      });
    },
  });

  const monitores = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return {
    monitores,
    total,
    totalPages,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    crearMonitorMutation,
    actualizarMonitorMutation,
    eliminarMonitorMutation,
  };
};