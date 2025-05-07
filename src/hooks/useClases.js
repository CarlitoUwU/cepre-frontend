import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ClassesServices } from "@/services/ClassesServices.js";
import { useAreas } from "@/hooks/useAreas.js";
import { useTurnos } from "@/hooks/useTurnos.js";

export const useClases = () => {
  // Obtener áreas y turnos
  const { areas } = useAreas();
  const { turnos } = useTurnos();
  const queryClient = useQueryClient();

  // Obtener los cursos con useQuery
  const {
    data: clases = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["class"], // clave única para cachear y reutilizar esta consulta
    queryFn: ClassesServices.getClasses,
    staleTime: 1000 * 60 * 5, // 5 minutos: evita refetch si no ha pasado ese tiempo
    cacheTime: 1000 * 60 * 10, // 10 minutos en memoria si no se está usando
    retry: 1, // solo 1 intento si falla
    refetchOnWindowFocus: false, // no vuelve a pedir la data al cambiar de pestaña
  });

  // Mutación para crear un curso
  const crearClaseMutation = useMutation({
    mutationFn: ClassesServices.createClass,
    onSuccess: (newClass) => {
      queryClient.setQueryData(["class"], (preClasses = []) => [
        ...preClasses,
        {
          ...newClass,
          area: {
            ...areas.find((area) => area.id === newClass.areaId)
          },
          shift: {
            ...turnos.find((turno) => turno.id === newClass.shiftId)
          }
        },
      ]);
    },
  });

  // Mutación para actualizar un curso
  const actualizarClaseMutation = useMutation({
    mutationFn: ClassesServices.updateClass,
    onSuccess: (updatedClass) => {
      queryClient.setQueryData(["class"], (preClasses = []) =>
        preClasses.map((clase) =>
          clase.id === updatedClass.id ? updatedClass : clase
        )
      );
    },
  });

  // Mutación para eliminar un curso
  const eliminarClaseMutation = useMutation({
    mutationFn: ClassesServices.deleteClass,
    onSuccess: (_, idEliminado) => {
      queryClient.setQueryData(["class"], (preClasses = []) =>
        preClasses.filter((clase) => clase.id !== idEliminado)
      );
    },
  });

  return {
    clases,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    crearClaseMutation,
    actualizarClaseMutation,
    eliminarClaseMutation,
  };
}
