import { request } from "./api";

const ClassesServices = {
  /**
   * Obtiene la lista de clases.
   * @returns {Promise<Array<Object>>}
   */
  async getClasses() {
    try {
      return await request("get", "/classes", null, true);
    } catch (error) {
      console.error("Error al obtener las clases:", error);
      throw error;
    }
  },

  /**
   * Obtiene una clase por su ID.
   * @param {string} id - ID de la clase a obtener.
   * @returns {Promise<Object>}
   */
  async getClassById(id) {
    if (!id) throw new Error("ID inválido");
    try {
      return await request("get", `/classes/${id}`);
    } catch (error) {
      console.error(`Error al obtener la clase con ID ${id}:`, error);
      throw error;
    }
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

    try {
      return await request("post", "/classes", {
        name,
        idSede,
        areaId,
        shiftId,
        capacity,
        urlMeet,
        urlClassroom,
        monitorId
      });
    } catch (error) {
      console.error("Error al crear la clase:", error);
      throw error;
    }
  },

  /**
   * Actualiza una clase existente.
   * @param {Object} classData - Datos de la clase a actualizar.
   * @returns {Promise<Object>}
   */
  async updateClass({ id, name, idSede, areaId, shiftId, capacity, urlMeet, urlClassroom, monitorId }) {
    if (!id) throw new Error("ID de clase inválido");

    try {
      return await request("put", `/classes/${id}`, {
        name,
        idSede,
        areaId,
        shiftId,
        capacity,
        urlMeet,
        urlClassroom,
        monitorId
      });
    } catch (error) {
      console.error(`Error al actualizar la clase con ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Elimina una clase por su ID.
   * @param {string} id - ID de la clase a eliminar.
   * @returns {Promise<boolean>}
   */
  async deleteClass(id) {
    if (!id) throw new Error("ID inválido");

    try {
      return await request("delete", `/classes/${id}`);
    } catch (error) {
      console.error(`Error al eliminar la clase con ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Obtiene la lista de clases del profesor autenticado.
   * @returns {Promise<Array<Object>>}
   */
  async getClassesOfTeacher() {
    try {
      return await request("get", "/classes/teacher", null, true);
    } catch (error) {
      console.error("Error al obtener las clases del profesor:", error);
      throw error;
    }
  },

  /**
   * Obtiene los horarios de una clase específica.
   * @param {string} classId - ID de la clase.
   * @returns {Promise<Array<Object>>}
   */
  async getSchedulesByClassId(classId) {
    if (!classId) throw new Error("ID de clase inválido");
    try {
      return await request("get", `/classes/${classId}/schedules`);
    } catch (error) {
      console.error(`Error al obtener los horarios de la clase con ID ${classId}:`, error);
      throw error;
    }
  },

  /**
   * Obtiene los docentes asignados a una clase.
   * @param {string} classId - ID de la clase.
   * @returns {Promise<Array<Object>>}
   */
  async getTeachersByClassId(classId) {
    if (!classId) throw new Error("ID de clase inválido");
    try {
      return await request("get", `/classes/${classId}/teachers`);
    } catch (error) {
      console.error(`Error al obtener los docentes de la clase con ID ${classId}:`, error);
      throw error;
    }
  },
};

export default ClassesServices;
