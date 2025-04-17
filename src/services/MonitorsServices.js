import { request } from "./api";

export const MonitorsServices = {
  /**
   * Obtiene la lista de monitores.
   * @returns {Promise<Array<{ userId: string, supervisorId: string, createdAt: string, updatedAt: string }>> | null}
   */
  async getMonitors(page = 1, limit = 20) {
    return request("get", `/monitors?page=${page}&limit=${limit}`, null, true);
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
  async updateMonitor({ userId, firstName, lastName, personalEmail, phone }) {
    if (!userId) throw new Error("ID inválido");
    return request("put", `/monitors/${userId}`, { firstName, lastName, personalEmail, phone });
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
   * Obtiene el horario de un monitor por su ID.
   * @param {string|null} id - ID del monitor. Si es null, obtiene el horario de con el id del token
   */
  async cargarHorario(id = null) {
    const url = id ? `/monitors/${id}/horario` : "/monitors/cargar/horario";
    return request("get", url, null);
  },

  /**
   * Obtiene la lista de docentes del monitor.
   * @param {string|null} id - ID del monitor. Si es null, obtiene todos los docentes.
   * @returns {Promise<Array<{ courseName: string, firstName: string, lastName: string, email: string }>>}
   */
  async cargarDocentes(id = null) {
    const url = id ? `/monitors/${id}/teachers` : "/monitors/datos/teachers";
    return request("get", url, null);
  },

  async getInformacion() {
    return request("get", "/monitors/information");
  },

  async monitorJson(archivo) {
    const formData = new FormData();
    formData.append("archivo", archivo);
    return request("post", "/monitors/json", formData, false, true);
  },

  async monitorCsv(archivo) {
    const formData = new FormData();
    formData.append("archivo", archivo);
    return request("post", "/monitors/csv", formData, false, true);
  }
};