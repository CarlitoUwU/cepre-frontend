import { request } from "./api";

export const MonitorsServices = {
  /**
   * Obtiene un listado paginado de monitores activos con información resumida.
   * @returns {Promise<Array<Object>>}
   */
  async getMonitors(page = 1, limit = 20, shift_id = null) {
    const url = `/monitors?page=${page}&limit=${limit}${shift_id ? `&shift_id=${shift_id}` : ""}`;
    return request("get", url, null, true);
  },

  /**
   * Obtiene la información detallada de un monitor por ID (admin).
   */
  async getMonitorById(id) {
    if (!id) throw new Error("ID inválido");
    return request("get", `/monitors/${id}`);
  },

  /**
   * Crea un nuevo monitor con información básica.
   */
  async createMonitor({ userId, supervisorId }) {
    const now = new Date().toISOString();
    return request("post", "/monitors", { userId, supervisorId, createdAt: now, updatedAt: now });
  },

  /**
   * Actualiza los datos de un monitor desde un rol administrador.
   * @param {Object} data - Contiene: id, firstName, lastName, personalEmail, phone, className, classId.
   */
  async updateMonitor({ userId, firstName, lastName, personalEmail, phone }) {
    if (!userId) throw new Error("ID inválido");
    return request("put", `/monitors/${userId}`, { firstName, lastName, personalEmail, phone });
  },

  /**
   * Elimina un monitor por ID.
   */
  async deleteMonitor(id) {
    if (!id) throw new Error("ID inválido");
    return request("delete", `/monitors/${id}`);
  },

  /**
   * Desactiva el usuario asociado a un monitor (soft delete).
   */
  async deactivate(id) {
    if (!id) throw new Error("ID inválido");
    return request("patch", `/monitors/${id}/deactivate`);
  },

  /**
   * Obtiene el horario del monitor. Si no se pasa ID, obtiene el del monitor autenticado.
   */
  async cargarHorario(id = null) {
    const url = id ? `/monitors/${id}/horario` : "/monitors/cargar/horario";
    return request("get", url);
  },

  /**
   * Obtiene los docentes asociados a un monitor.
   */
  async cargarDocentes(id = null) {
    const url = id ? `/monitors/${id}/teachers` : "/monitors/datos/teachers";
    return request("get", url);
  },

  /**
   * Obtiene información detallada del monitor autenticado.
   */
  async getInformacion() {
    return request("get", "/monitors/information");
  },

  /**
   * Obtiene un listado de monitores filtrados por asignación a un supervisor.
   * @param {boolean} hasSupervisor - Si es true, filtra por monitores asignados a un supervisor.
   * @param {number} page - Número de página para paginación.
   * @param {number} limit - Número de resultados por página.
   * @returns {Promise<Array<Object>>}
   */
  async getMonitoresFiltroAsignados(shiftId, hasSupervisor = false, page = 1, limit = 200, area_id = null) {
    const url = `/monitors/filtered?shiftId=${shiftId}&has_supervisor=${hasSupervisor}&page=${page}&limit=${limit}${area_id ? `&area_id=${area_id}` : ""}`;
    return request("get", url);
  },

  /**
   * Carga masiva de monitores desde archivo JSON.
   **/
  async monitorJson(archivo) {
    const formData = new FormData();
    formData.append("archivo", archivo);
    return request("post", "/monitors/json", formData, false, true);
  },

  /**
   * Carga masiva de monitores desde archivo CSV.
   */
  async monitorCsv(archivo) {
    const formData = new FormData();
    formData.append("archivo", archivo);
    return request("post", "/monitors/csv", formData, false, true);
  }
};
