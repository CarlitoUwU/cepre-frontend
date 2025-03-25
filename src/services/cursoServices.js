import api from "./api";
const token = localStorage.getItem("token");

const CursoService = {
  /**
   * Obtiene la lista de cursos.
   * @returns {Promise<Array<{ id: number, name: string, color: string }>> | null}
   */
  async getCursos() {
    try {
      console.log("Obteniendo los cursos...");
      console.log({ token });
      const response = await api.get("/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data ?? [];

      const dataFormat = data.map(curso => ({
        id: curso.id,
        name: curso.name,
        color: curso.description ?? "#3f50b4",
      }))
      console.log({ dataFormat });

      return dataFormat;
    } catch (e) {
      console.error("Error al obtener los cursos", e.message, e);
      return null;
    }
  },

  /**
   * Obtiene un curso por su ID.
   * @param {number} id - ID del curso a obtener.
   * @returns {Promise<Object | null>}
   */
  async getCursoById(id) {
    try {
      const response = await api.get(`/areas/${id}`);
      const data = response.data;
      const dataFormat = {
        id: data.id,
        name: data.name,
        color: data.description ?? "#3f50b4",
      }

      console.log({ dataFormat });

      return dataFormat;
    } catch (e) {
      console.error("Error al obtener el curso", e.message, e);
      return null;
    }
  },

  /**
   * Crea un nuevo curso.
   * @param {Object} newCurso - Datos del curso a crear.
   * @param {string} newCurso.name - Nombre del curso.
   * @param {string} [newCurso.color] - Color del curso (por defecto: `#3f50b4`).
   * @returns {Promise<Object | null>}
   */
  async createCurso({ nombre, color = "#3f50b4" }) {
    try {
      console.log({ nombre, color });
      const response = await api.post('/areas', { name, description: color });
      const data = response.data;
      const dataFormat = {
        id: data.id,
        name: data.name,
        color: data.description ?? "#3f50b4",
      }

      console.log({ dataFormat });

      return dataFormat;
    } catch (e) {
      console.error("Error al crear el curso", e.message, e);
      return null;
    }
  },

  /**
   * Actualiza un curso por su ID.
   * @param {Object} curso - Datos del curso a actualizar.
   * @param {number} curso.id - ID del curso a actualizar.
   * @param {string} curso.name - Nombre del curso.
   * @param {string} [curso.color] - Color del curso (por defecto: `#3f50b4`).
   * @returns {Promise<Object | null>}
   */
  async updateCurso({ id, name, color = "#3f50b4" }) {
    try {
      const response = await api.put(`/areas/${id}`, { name, description: color });
      const data = response.data;
      const dataFormat = {
        id: data.id,
        name: data.name,
        color: data.description ?? "#3f50b4",
      }

      console.log({ dataFormat });

      return dataFormat;
    } catch (e) {
      console.error("Error al actualizar el curso", e.message, e);
      return null
    }
  },


  /**
   * Elimina un curso por su ID.
   * @param {number} id - ID del curso a eliminar.
   * @returns {Promise<boolean>}
   */
  async deleteCurso(id) {
    try {
      await api.delete(`/areas/${id}`);
      console.log(`Curso eliminado con éxito con id: ${id}`);
      return true;
    } catch (e) {
      console.error(`Error al eliminar el curso con id: ${id}`, e.message, e);
      return false;
    }
  },
};

export default CursoService;


//http://localhost:3000/api/classes
//http://localhost:3000/api/user-profiles
//http://localhost:3000/api/areas