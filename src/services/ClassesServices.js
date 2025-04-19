import { request } from "./api";

const ClassesServices = {
  /**
   * Obtiene la lista de clases.
   * @returns {Promise<Array<{ id: string, name: string, capacity: number, urlMeet: string, urlClassroom: string, area: Object, shift: Object, monitor: Object }>>}
   */
  async getClasses() {
    return request("get", "/classes", null, true);
  },

  /**
   * Obtiene una clase por su ID.
   * @param {string} id - ID de la clase a obtener.
   * @returns {Promise<Object>}
   */
  async getClassById(id) {
    if (!id) throw new Error("ID inválido");
    return request("get", `/classes/${id}`);
  },

  /**
   * Crea una nueva clase.
   * @param {Object} newClass - Datos de la clase a crear.
   * @param {string} newClass.name - Nombre de la clase.
   * @param {number} newClass.idSede - ID de la sede.
   * @param {number} newClass.areaId - ID del área.
   * @param {number} newClass.shiftId - ID del turno.
   * @param {number} newClass.capacity - Capacidad de la clase.
   * @param {string} newClass.urlMeet - Enlace de Meet.
   * @param {string} newClass.urlClassroom - Enlace de Google Classroom.
   * @param {number} newClass.monitorId - ID del monitor asignado.
   * @returns {Promise<Object>}
   */
  async createClass({ name, idSede, areaId, shiftId, capacity, urlMeet, urlClassroom, monitorId }) {
    return request("post", "/classes", {
      name,
      idSede,
      areaId,
      shiftId,
      capacity,
      urlMeet,
      urlClassroom,
      monitorId
    });
  },

  /**
   * Actualiza una clase existente.
   * @param {Object} classData - Datos de la clase a actualizar.
   * @param {string} classData.id - ID de la clase.
   * @param {string} classData.name - Nombre de la clase.
   * @param {number} classData.idSede - ID de la sede.
   * @param {number} classData.areaId - ID del área.
   * @param {number} classData.shiftId - ID del turno.
   * @param {number} classData.capacity - Capacidad de la clase.
   * @param {string} classData.urlMeet - Enlace de Meet.
   * @param {string} classData.urlClassroom - Enlace de Google Classroom.
   * @param {number} classData.monitorId - ID del monitor.
   * @returns {Promise<Object>}
   */
  async updateClass({ id, name, idSede, areaId, shiftId, capacity, urlMeet, urlClassroom, monitorId }) {
    return request("put", `/classes/${id}`, {
      name,
      idSede,
      areaId,
      shiftId,
      capacity,
      urlMeet,
      urlClassroom,
      monitorId
    });
  },

  /**
   * Elimina una clase por su ID.
   * @param {string} id - ID de la clase a eliminar.
   * @returns {Promise<boolean>}
   */
  async deleteClass(id) {
    if (!id) throw new Error("ID inválido");
    return request("delete", `/classes/${id}`);
  },

  /**
   * Obtiene la lista de clases del profesor autenticado.
   * @returns {Promise<Array<Object>>}
   */
  async getClassesOfTeacher() {
    return request("get", "/classes/teacher", null, true);
  },
};

export default ClassesServices;
