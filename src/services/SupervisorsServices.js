import { request } from "./api";

export const SupervisorsServices = {

  /**
   * Obtiene la lista de supervisores.
   * @returns {Promise<Array<Object | null>} | null}
   */
  async getSupervisors(page = 1, limit = 20) {
    return request("get", `/supervisors?page=${page}&limit=${limit}`, null, true);
  },

  /**
   * Obtiene un supervisor por su ID.
   * @param {string} userId - ID del supervisor a obtener.
   * @returns {Promise<{ Object} | null>}
   * @throws {Error} Si el ID no es válido.
   */
  async getSupervisorById(userId) {
    if (!userId) throw new Error("ID inválido");
    return request("get", `/supervisors/${userId}`);
  },

  async createSupervisor({ userId }) {
    const now = new Date().toISOString();
    return request("post", "/supervisors", { userId, createdAt: now, updatedAt: now });
  },

  async updateSupervisor({ userId, firstName, lastName, personalEmail, phone }) {
    if (!userId) throw new Error("ID inválido");
    return request("put", `/supervisors/${userId}`, { firstName, lastName, personalEmail, phone });
  },

  async deleteSupervisor(userId) {
    if (!userId) throw new Error("ID inválido");
    return request("delete", `/supervisors/${userId}`);
  },

  async getMonitors() {
    return request("get", "/supervisors/getMonitors");
  },

  async supervisorJson(archivo) {
    const formData = new FormData();
    formData.append("archivo", archivo);
    return request("post", "/supervisors/json", formData, false, true);
  },

  async supervisorCsv(archivo) {
    const formData = new FormData();
    formData.append("archivo", archivo);
    return request("post", "/supervisors/csv", formData, false, true);
  }
};