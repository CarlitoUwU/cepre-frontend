import { request } from "./api";

const MonitorServices = {
  /**
   * Obtiene la lista de monitores.
   * @returns {Promise<Array<{ userId: string, supervisorId: string, createdAt: string, updatedAt: string }>> | null}
   */
  async getMonitors() {
    return request("get", "/monitors", null, true);
  },

  /**
   * Obtiene un monitor por su ID.
   * @param {string} userId - ID del monitor a obtener.
   * @returns {Promise<Object | null>}
   * @throws {Error} Si el ID no es válido.
   */
  async getMonitorById(userId) {
    if (!userId) throw new Error("ID inválido");
    return request("get", `/monitors/${userId}`);
  },

  /**
   * Obtiene un monitor por su ID de supervisor.
   * @param {string} supervisorId - ID del supervisor del monitor a obtener.
   * @returns {Promise<Object | null>}
   * @throws {Error} Si el ID no es válido.
   */
  async createMonitor({ userId, supervisorId }) {
    const now = new Date().toISOString();
    return request("post", "/monitors", { userId, supervisorId, createdAt: now, updatedAt: now });
  },

  /**
   * Actualiza un monitor existente.
   * @param {Object} monitorData - Datos del monitor a actualizar.
   * @param {string} monitorData.userId - ID del monitor a actualizar.
   * @param {string} monitorData.supervisorId - ID del supervisor del monitor a actualizar.
   */
  async updateMonitor({ userId, supervisorId }) {
    if (!userId) throw new Error("ID inválido");
    return request("put", `/monitors/${userId}`, { userId, supervisorId });
  },

  /**
   * Elimina un monitor por su ID.
   * @param {string} userId - ID del monitor a eliminar.
   * @returns {Promise<boolean>}
   * @throws {Error} Si el ID no es válido.
   */
  async deleteMonitor(userId) {
    if (!userId) throw new Error("ID inválido");
    return request("delete", `/monitors/${userId}`);
  },

  /**
   * ns
   */
  async cargarHorario() {
    return request("get", "/monitors/cargar/horario", null);
  },

};

export default MonitorServices;