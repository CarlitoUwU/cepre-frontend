import api from "./api";

const CursoService = {
  /**
   * Obtiene la lista de cursos.
   * @returns {Promise<Array<{ id: number, nombre: string, color: string }>> | null}
   */
  async getCursos() {
    try {
      const response = await api.get('/areas');
      const data = response.data ?? [];

      const dataFormat = data.map(curso => ({
        id: curso.id,
        nombre: curso.name,
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
 * Crea un nuevo curso.
 * @param {Object} newCurso - Datos del curso a crear.
 * @param {string} newCurso.nombre - Nombre del curso.
 * @param {string} [newCurso.color] - Color del curso (por defecto: `#3f50b4`).
 * @returns {Promise<Object | null>}
 */

  async createCurso({ nombre, color = "#3f50b4" }) {
    try {
      console.log({ nombre, color });
      const response = await api.post('/areas', { name:nombre, description:color });
      const data = response.data;
      const dataFormat = {
        id: data.id,
        nombre: data.name,
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
  * @param {string} curso.nombre - Nombre del curso.
  * @param {string} [curso.color] - Color del curso (por defecto: `#3f50b4`).
  * @returns {Promise<Object | null>}
  */

  async updateCurso({ id, nombre, color = "#3f50b4" }) {
    try {
      const response = await api.put(`/areas/${id}`, { name: nombre, description: color });
      const data = response.data;
      const dataFormat = {
        id: data.id,
        nombre: data.name,
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