import { request } from "./api";

export const ClassesServices = {
  /**
   * Obtiene la lista de clases.
   * @returns {Promise<Array<Object>>}
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
    return request("get", `/classes/${id}`);

  },

  /**
   * Crea una nueva clase.
   * @param {Object} newClass - Datos de la clase a crear.
   * @returns {Promise<Object>}
   */
  async createClass({ name, idSede, areaId, shiftId, capacity, urlMeet, urlClassroom, monitorId }) {
    if (!name || !idSede || !areaId || !shiftId || !capacity) {
      throw new Error("Datos incompletos para crear la clase");
    }

    return request("post", "/classes", { name, idSede, areaId, shiftId, capacity, urlMeet, urlClassroom, monitorId });
  },

  /**
   * Actualiza una clase existente.
   * @param {Object} classData - Datos de la clase a actualizar.
   * @returns {Promise<Object>}
   */
  async updateClass({ id, name, idSede, areaId, shiftId, capacity, urlMeet, urlClassroom, monitorId }) {
    if (!id) throw new Error("ID de clase inválido");
    return request("put", `/classes/${id}`, { name, idSede, areaId, shiftId, capacity, urlMeet, urlClassroom, monitorId });
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
    return request("get", "/classes/getClassOfTeacher");
  },

  /**
   * Obtiene los horarios de una clase específica.
   * @param {string} classId - ID de la clase.
   * @returns {Promise<Array<Object>>}
   */
  async getSchedulesByClassId(classId) {
    if (!classId) throw new Error("ID de clase inválido");
    return request("get", `/classes/${classId}/schedules`);
  },

  /**
   * Obtiene los docentes asignados a una clase.
   * @param {string} classId - ID de la clase.
   * @returns {Promise<Array<Object>>}
   */
  async getTeachersByClassId(classId) {
    if (!classId) throw new Error("ID de clase inválido");
    return request("get", `/classes/${classId}/teachers`);
  },

  async setLinkMeet({ classId, urlMeet }) {
    console.log({ classId, urlMeet });
    if (!classId || !urlMeet) throw new Error("ID de clase o URL de Meet inválidos");
    return request("patch", `/classes/${classId}/meet-link`, { urlMeet });
  },

  async setLinkClassroom({ classId, urlClassroom }) {
    console.log({ classId, urlClassroom });
    if (!classId || !urlClassroom) throw new Error("ID de clase o URL de Classroom inválidos");
    return request("patch", `/classes/${classId}/classroom-link`, { urlClassroom });
  }
};
