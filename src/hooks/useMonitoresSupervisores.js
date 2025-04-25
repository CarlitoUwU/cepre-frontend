import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SupervisorsServices } from "@/services/SupervisorsServices";
import { MonitorsServices } from "@/services/MonitorsServices";

export const useMonitoresSupervisores = ({ supervisorId, shiftId, page = 1, limit = 10 }) => {
  const queryClient = useQueryClient();

  // Obtener monitores asignados al supervisor
  const {
    data: dataAsignados,
    isLoading: isLoadingAsignados,
    isError: isErrorAsignados,
    error: errorAsignados,
    refetch: refetchAsignados,
  } = useQuery({
    queryKey: ["monitoresAsignados", supervisorId],
    queryFn: () => SupervisorsServices.getMonitors(supervisorId),
    enabled: !!supervisorId,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Obtener monitores disponibles para ese turno
  const {
    data: dataDisponibles,
    isLoading: isLoadingDisponibles,
    isError: isErrorDisponibles,
    error: errorDisponibles,
    refetch: refetchDisponibles,
    isFetching: isFetchingDisponibles,
  } = useQuery({
    queryKey: ["monitoresDisponibles", shiftId, page, limit],
    queryFn: () => MonitorsServices.getMonitoresFiltroAsignados(shiftId, false, page, limit),
    enabled: !!shiftId,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });


  // Función para ordenar arrays de monitores por className
  const ordenarByClassName = (monitores = []) => {
    return [...monitores].sort((a, b) => {
      const classNameA = a.className || "";
      const classNameB = b.className || "";
      return classNameA.localeCompare(classNameB);
    });
  };

  // Mutación para asignar un monitor
  const asignarMonitorMutation = useMutation({
    mutationFn: ({ monitorId, supervisorId }) =>
      SupervisorsServices.asignarMonitor(supervisorId, monitorId),

    onSuccess: (_, { monitorId }) => {
      const monitorAsignado = queryClient
        .getQueryData(["monitoresDisponibles", shiftId, page, limit])
        ?.data?.find((m) => m.monitorId === monitorId);

      // Eliminar de disponibles
      queryClient.setQueryData(["monitoresDisponibles", shiftId, page, limit], (old) => {
        if (!old?.data) return old;
        const nuevosDisponibles = old.data.filter((monitor) => monitor.monitorId !== monitorId);
        return {
          ...old,
          data: ordenarByClassName(nuevosDisponibles),
        };
      });

      // Agregar a asignados
      if (monitorAsignado) {
        queryClient.setQueryData(["monitoresAsignados", supervisorId], (old = {}) => {
          const nuevosAsignados = [
            ...(old.monitores_asignados || []),
            monitorAsignado,
          ];
          return {
            ...old,
            monitores_asignados: ordenarByClassName(nuevosAsignados),
          };
        });
      }
    },
  });

  // Mutación para quitar un monitor
  const quitarMonitorMutation = useMutation({
    mutationFn: ({ monitorId }) =>
      SupervisorsServices.quitarMonitor(monitorId),

    onSuccess: (_, { monitorId }) => {
      const monitorQuitado = queryClient
        .getQueryData(["monitoresAsignados", supervisorId])
        ?.monitores_asignados?.find((m) => m.monitorId === monitorId);

      // Eliminar de asignados
      queryClient.setQueryData(["monitoresAsignados", supervisorId], (old = {}) => {
        const nuevosAsignados = (old.monitores_asignados || []).filter(
          (monitor) => monitor.monitorId !== monitorId
        );
        return {
          ...old,
          monitores_asignados: ordenarByClassName(nuevosAsignados),
        };
      });

      // Agregar a disponibles
      if (monitorQuitado) {
        queryClient.setQueryData(["monitoresDisponibles", shiftId, page, limit], (old = {}) => {
          const nuevosDisponibles = [...(old.data || []), monitorQuitado];
          return {
            ...old,
            data: ordenarByClassName(nuevosDisponibles),
          };
        });
      }
    },
  });


  const monitoresAsignados = ordenarByClassName(dataAsignados?.monitores_asignados || []);
  const monitoresDisponibles = ordenarByClassName(dataDisponibles?.data || []);
  const total = dataDisponibles?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return {
    monitoresAsignados,
    monitoresDisponibles,
    total,
    totalPages,
    isLoadingAsignados,
    isLoadingDisponibles,
    isErrorAsignados,
    isErrorDisponibles,
    errorAsignados,
    errorDisponibles,
    asignarMonitorMutation,
    quitarMonitorMutation,
    refetchAsignados,
    refetchDisponibles,
    isFetchingDisponibles,
  };
};
