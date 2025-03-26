import { request } from "./api";

const SedesService = {
  /**
   * Obtiene la lista de sedes.
   * @returns {Promise<Array<{ id: number, name: string, description: string, phone: string }>> | null}
   */
  async getSedes() {
    return request("get", "/sedes", null, true);
  },

  /**
   * Obtiene una sede por su ID.
   * @param {number} id - ID de la sede a obtener.
   * @returns {Promise<{ id: number, name: string, description: string, phone: string } | null>}
   * @throws {Error} Si el ID no es válido.
   */
  async getSedeById(id) {
    if (!id || typeof id !== "number") throw new Error("ID inválido");
    return request("get", `/sedes/${id}`);
  },

  /**
   * Crea una nueva sede.
   * @param {Object} newSede - Datos de la sede a crear.
   * @param {string} newSede.name - Nombre de la sede.
   * @param {string} newSede.description - Descripción de la sede.
   * @param {string} newSede.phone - Teléfono de la sede.
   * @returns {Promise<{ id: number, name: string, description: string, phone: string } | null>}
   * @throws {Error} Si faltan datos.
   */
  async createSede({ name, description, phone }) {
    if (!name || !description || !phone) throw new Error("Faltan datos");
    return request("post", "/sedes", { name, description, phone });
  },

  /**
   * Actualiza una sede por su ID.
   * @param {Object} sede - Datos de la sede a actualizar.
   * @param {number} sede.id - ID de la sede a actualizar.
   * @param {string} sede.name - Nombre de la sede.
   * @param {string} sede.description - Descripción de la sede.
   * @param {string} sede.phone - Teléfono de la sede.
   * @returns {Promise<{ id: number, name: string, description: string, phone: string } | null>}
   * @throws {Error} Si el ID de la sede no es válido.
   */
  async updateSede({ id, name, description, phone }) {
    if (!id) throw new Error("ID inválido");
    return request("put", `/sedes/${id}`, { name, description, phone });
  },

  /**
   * Elimina una sede por su ID.
   * @param {number} id - ID de la sede a eliminar.
   * @returns {Promise<boolean>}
   * @throws {Error} Si el ID no es válido.
   */
  async deleteSede(id) {
    if (!id) throw new Error("ID inválido");
    return request("delete", `/sedes/${id}`);
  },

};

export default SedesService;