import api from "./api";

const HourSessionsServices = {

  /**
   * Obtiene todas las sesiones de hora.
   * @returns {Promise<Array<{ id: number, shiftId: number, period: number, startTime: time, endTime: time }>> | null}
   */
  async getHourSessions() {
    try {
      const response = await api.get('/hour-sessions');
      const data = response.data;
      console.log({ data });

      return data;
    } catch (e) {
      console.error("Error al obtener las sesiones de hora", e.message, e);
      return null;
    }
  },

  /**
   * Obtiene una sesión de hora por su ID.
   * @param {number} id - ID de la sesión de hora a obtener.
   * @returns {Promise<Object | null>}
   */
  async getHourSessionById(id) {
    try {
      const response = await api.get(`/hour-sessions/${id}`);
      const data = response.data;
      console.log({ data });

      return data;
    } catch (e) {
      console.error("Error al obtener la sesión de hora", e.message, e);
      return null;
    }
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
    try {
      console.log({ shiftId, period, startTime, endTime });
      const response = await api.post('/hour-sessions', { shiftId, period, startTime, endTime });
      const data = response.data;
      console.log({ data });

      return data;
    } catch (e) {
      console.error("Error al crear la sesión de hora", e.message, e);
      return null;
    }
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
    try {
      console.log({ id, shiftId, period, startTime, endTime });
      const response = await api.put(`/hour-sessions/${id}`, { shiftId, period, startTime, endTime });
      const data = response.data;
      console.log({ data });

      return data;
    } catch (e) {
      console.error("Error al actualizar la sesión de hora", e.message, e);
      return null;
    }
  },

  /**
   * Elimina una sesión de hora por su ID.
   * @param {number} id - ID de la sesión de hora a eliminar.
   */
  async deleteHourSession(id) {
    try {
      console.log({ id });
      const response = await api.delete(`/hour-sessions/${id}`);
      const data = response.data;
      console.log({ data });

      return data;
    } catch (e) {
      console.error("Error al eliminar la sesión de hora", e.message, e);
      return null;
    }
  },

};

export default HourSessionsServices;