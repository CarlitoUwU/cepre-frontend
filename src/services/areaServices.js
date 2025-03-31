import { request } from "./api.js"

const AreaServices = {
  /**
   * Obtiene la lista de areas.
   * @returns {Promise<Array<{ id: number, name: string, description: string }>> | null}
   */
  async getAreas() {
    return request("get", "/areas", null, true);
  },

  /**
   * Obtiene un area por su ID.
   * @param {string} id - ID del area a obtener.
   * @returns {Promise<Object | null>}
   */
  async getAreaById(id) {
    if (!id) throw new Error("ID inválido");
    return request("get", `/areas/${id}`);
  },

  /**
   * Crea una nueva area.
   * @param {Object} newArea - Datos del area a crear.
   * @param {string} newArea.name - Nombre del area.
   * @param {string} newArea.description - Descripción del area.
   */
  async createArea({ name, description = "sin descripcino" }) {
    return request("post", "/areas", { name, description });
  },

  /**
   * Actualiza un area existente.
   * @param {Object} areaData - Datos del area a actualizar.
   * @param {string} areaData.id - ID del area a actualizar.
   * @param {string} areaData.name - Nombre del area.
   * @param {string} areaData.description - Descripción del area.
   */
  async updateArea({ id, name, description }) {
    return request("put", `/areas/${id}`, { name, description });
  },

  /**
   * Elimina un area por su ID.
   * @param {number} id - ID del area a eliminar.
   * @returns {Promise<boolean>}
   * @throws {Error} Si el ID no es válido.
   */
  async deleteArea(id) {
    if (!id) throw new Error("ID inválido");
    return request("delete", `/areas/${id}`);
  },
};

export default AreaServices;