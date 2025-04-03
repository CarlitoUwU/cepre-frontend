import { request } from "./api";

const ClassesServices = {
  /**
   * Obtiene la lista de classes.
   * @returns {Promise<Array<{ id: number, name: string, capacity: number, urlMeet: string, area: Object, shift: Object, monitor: Object }>> | null}
   */
  async getClasses() {
    return request("get", "/classes", null, true);
  },

  /**
   * Obtiene una classe por su ID.
   * @param {string} id - ID de la classe a obtener.
   * @returns {Promise<Object | null>}
   */
  async getClassById(id) {
    if (!id) throw new Error("ID inválido");
    return request("get", `/classes/${id}`);
  },

  /**
   * Crea una nueva clase.
   * @param {Object} newClass - Datos de la clase a crear.
   * @param {string} newClass.name - Nombre de la clase.
   * @param {number} newClass.idSede - ID de la sede de la clase.
   * @param {number} newClass.areaId - ID del area de la clase.
   * @param {number} newClass.shiftId - ID del turno de la clase.
   * @param {numbre} newClass.capacity - Capacidad de la clase.
   * @param {string} newClass.urlMeet - URL de la clase.
   * @param {number} newClass.monitorId - ID del monitor de la clase.
   */
  async createClass({ name, idSede, areaId, shiftId, capacity, urlMeet, monitorId }) {
    return request("post", "/classes", { name, idSede, areaId, shiftId, capacity, urlMeet, monitorId });
  },

  /**
   * Actualiza una clase existente.
   * @param {Object} classData - Datos de la clase a actualizar.
   * @param {string} classData.id - ID de la clase a actualizar.
   * @param {string} classData.name - Nombre de la clase.
   * @param {number} classData.idSede - ID de la sede de la clase.
   * @param {number} classData.areaId - ID del area de la clase.
   * @param {number} classData.shiftId - ID del turno de la clase.
   * @param {numbre} classData.capacity - Capacidad de la clase.
   * @param {string} classData.urlMeet - URL de la clase.
   * @param {number} classData.monitorId - ID del monitor de la clase.
   */
  async updateClass({ id, name, idSede, areaId, shiftId, capacity, urlMeet, monitorId }) {
    return request("put", `/classes/${id}`, { name, idSede, areaId, shiftId, capacity, urlMeet, monitorId });
  },

  /**
   * Elimina una clase por su ID.
   * @param {number} id - ID de la clase a eliminar.
   * @returns {Promise<boolean>}
   * @throws {Error} Si el ID no es válido.
   */
  async deleteClass(id) {
    if (!id) throw new Error("ID inválido");
    return request("delete", `/classes/${id}`);
  },

  /**
   * Obtiene la lista de clases del profesor.
   * @returns {Promise<Array<Object }>> | null}
   */
  async getClassOfTeacher() {
    return request("get", "/classes/getClassOfTeacher", null, true);
  },
};

export default ClassesServices;
