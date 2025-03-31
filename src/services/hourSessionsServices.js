import { request } from "./api";

const HourSessionsServices = {
  /**
   * Obtiene todas las sesiones de hora.
   * @returns {Promise<Array<{ id: number, shiftId: number, period: number, startTime: time, endTime: time }>> | null}
   */
  async getHourSessions() {
    return request("get", "/hour-sessions", null, true);
  },

  /**
   * Obtiene una sesión de hora por su ID.
   * @param {number} id - ID de la sesión de hora a obtener.
   * @returns {Promise<Object | null>}
   */
  async getHourSessionById(id) {
    return request("get", `/hour-sessions/${id}`);
  },

  /**
   * Crea una nueva sesión de hora.
   * @param {Object} newHourSession - Datos de la sesión de hora a crear.
   * @param {number} newHourSession.shiftId - ID del turno de la sesión de hora.
   * @param {number} newHourSession.period - Periodo de la sesión de hora.
   * @param {time} newHourSession.startTime - Hora de inicio de la sesión de hora.
   * @param {time} newHourSession.endTime - Hora de fin de la sesión de hora.
   */
  async createHourSession({ shiftId, period, startTime, endTime }) {
    request("post", "/hour-sessions", { shiftId, period, startTime, endTime });
  },

  /**
   * Actualiza una sesión de hora.
   * @param {Object} hourSession - Datos de la sesión de hora a actualizar.
   * @param {number} hourSession.id - ID de la sesión de hora a actualizar.
   * @param {number} hourSession.shiftId - ID del turno de la sesión de hora.
   * @param {number} hourSession.period - Periodo de la sesión de hora.
   * @param {time} hourSession.startTime - Hora de inicio de la sesión de hora.
   * @param {time} hourSession.endTime - Hora de fin de la sesión de hora.
   */
  async updateHourSession({ id, shiftId, period, startTime, endTime }) {
    request("put", `/hour-sessions/${id}`, { shiftId, period, startTime, endTime });
  },

  /**
   * Elimina una sesión de hora por su ID.
   * @param {number} id - ID de la sesión de hora a eliminar.
   */
  async deleteHourSession(id) {
    request("delete", `/hour-sessions/${id}`);
  },
};

export default HourSessionsServices;