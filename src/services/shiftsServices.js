import { request } from "./api";

const ShiftsService = {
  /**
   * Obtiene la lista de turnos.
   * @returns {Promise<Array<{ id: number, name: string, startTime: string, endTime: string }>> | null}
   */
  async getShifts() {
    return request("get", "/shifts", null, true);
  },

  /**
   * Obtiene un turno por su ID.
   * @param {number} id - ID del turno a obtener.
   * @returns {Promise<Object | null>}
   * @throws {Error} Si el ID no es válido.
   */
  async getShiftById(id) {
    if (!id) throw new Error("ID inválido");
    return request("get", `/shifts/${id}`);
  },

  /**
   * Crea un nuevo turno.
   * @param {Object} newShift - Datos del turno a crear.
   * @param {string} newShift.name - Nombre del turno.
   * @param {string} newShift.startTime - Hora de inicio del turno.
   * @param {string} newShift.endTime - Hora de fin del turno.
   * @returns {Promise<{ id: number, name: string, startTime: string, endTime: string } | null>}
   * @throws {Error} Si faltan datos.
   */
  async createShift({ name, startTime, endTime }) {
    return request("post", "/shifts", { name, startTime, endTime });
  },

  /**
   * Actualiza un turno existente.
   * @param {Object} shiftData - Datos del turno a actualizar.
   * @param {number} shiftData.id - ID del turno a actualizar.
   * @param {string} shiftData.name - Nombre del turno.
   * @param {string} shiftData.startTime - Hora de inicio del turno.
   * @param {string} shiftData.endTime - Hora de fin del turno.
   * @returns {Promise<{ id: number, name: string, startTime: string, endTime: string } | null>}
   * @throws {Error} Si el ID del turno no es válido.
   */
  async updateShift({ id, name, startTime, endTime }) {
    return request("put", `/shifts/${id}`, { name, startTime, endTime });
  },

  /**
   * Elimina un turno por su ID.
   * @param {number} id - ID del turno a eliminar.
   * @returns {Promise<boolean>}
   * @throws {Error} Si el ID no es válido.
   */
  async deleteShift(id) {
    if (!id) throw new Error("ID inválido");
    return request("delete", `/shifts/${id}`);
  }
};

export default ShiftsService;