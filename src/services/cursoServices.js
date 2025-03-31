import { request } from "./api";

const CursoService = {
  /**
   * Obtiene la lista de cursos.
   * @returns {Promise<Array<{ id: number, name: string, color: string }>> | null}
   */
  async getCursos() {
    return request("get", "/courses", null, true);
  },

  /**
   * Obtiene un curso por su ID.
   * @param {number} id - ID del curso a obtener.
   * @returns {Promise<{ id: number, name: string, color: string } | null>}
   * @throws {Error} Si el ID no es válido.
   */
  async getCursoById(id) {
    if (!id || typeof id !== "number") throw new Error("ID inválido");
    return request("get", `/courses/${id}`);
  },

  /**
   * Crea un nuevo curso.
   * @param {Object} newCurso - Datos del curso a crear.
   * @param {string} newCurso.name - Nombre del curso.
   * @param {string} [newCurso.color="#3f50b4"] - Color del curso.
   * @returns {Promise<{ id: number, name: string, color: string } | null>}
   * @throws {Error} Si el nombre del curso es inválido.
   */
  async createCurso({ name, color = "#3f50b4", description = "Sin descripción" }) {
    if (!name) throw new Error("El nombre del curso es obligatorio.");
    return request("post", "/courses", { name, color, description });
  },

  /**
   * Actualiza un curso por su ID.
   * @param {Object} curso - Datos del curso a actualizar.
   * @param {number} curso.id - ID del curso a actualizar.
   * @param {string} curso.name - Nombre del curso.
   * @param {string} [curso.color="#3f50b4"] - Color del curso.
   * @returns {Promise<{ id: number, name: string, color: string } | null>}
   * @throws {Error} Si el ID del curso no es válido.
   */
  async updateCurso({ id, name, color = "#3f50b4", description = "Sin descripción" }) {
    if (!id) throw new Error("El ID del curso es obligatorio.");
    return request("put", `/courses/${id}`, { name, color, description });
  },

  /**
   * Elimina un curso por su ID.
   * @param {number} id - ID del curso a eliminar.
   * @returns {Promise<boolean>}
   * @throws {Error} Si el ID no es válido.
   */
  async deleteCurso(id) {
    if (!id) throw new Error("El ID del curso es obligatorio.");
    return request("delete", `/courses/${id}`);
  },
};

export default CursoService;