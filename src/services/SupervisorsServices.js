import { request } from "./api";

const SupervisorsServices = {

  /**
   * Obtiene la lista de supervisores.
   * @returns {Promise<Array<Object | null>} | null}
   */
  async getSupervisors() {
    return request("get", "/supervisors", null, true);
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

  async updateSupervisor({ userId }) {
    if (!userId) throw new Error("ID inválido");
    return request("put", `/supervisors/${userId}`, { userId });
  },

  async deleteSupervisor(userId) {
    if (!userId) throw new Error("ID inválido");
    return request("delete", `/supervisors/${userId}`);
  },

  async getMonitors() {
    return request("get", "/supervisors/getMonitors");
  }
};

export default SupervisorsServices;
