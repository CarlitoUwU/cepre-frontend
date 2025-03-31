import { request } from "./api";

const AreaCourseHoursServices = {
  /**
   * Obtiene la lista de areaCourseHours.
   * @returns {Promise<Array<{ id: number, area: Object, course: Object, totalHours: number }>> | null}
   */
  async getAreaCourseHours() {
    return request("get", "/areaCourseHours", null, true);
  },

  /**
   * Obtiene un areaCourseHours por su ID.
   * @param {number} id - ID del areaCourseHours a obtener. 
   * @returns {Promise<Object | null>}
   */
  async getAreaCourseHoursById(id) {
    if (!id) throw new Error("ID inválido");
    return request("get", `/areaCourseHours/${id}`);
  },

  /**
   * Obtiene un areaCourseHours por su ID de area y curso.
   * @param {number} areaId - ID del area del areaCourseHours a obtener.
   * @param {number} courseId - ID del curso del areaCourseHours a obtener.
   * @param {number} totalHours - Total de horas del areaCourseHours a obtener.
   * @returns {Promise<Object | null>}
   */
  async createAreaCourseHours({ areaId, courseId, totalHours }) {
    return request("post", "/areaCourseHours", { areaId, courseId, totalHours });
  },

  /**
   * Actualiza un areaCourseHours existente.
   * @param {Object} areaCourseHoursData - Datos del areaCourseHours a actualizar.
   * @param {number} areaCourseHoursData.id - ID del areaCourseHours a actualizar.
   * @param {number} areaCourseHoursData.areaId - ID del area del areaCourseHours a actualizar.
   * @param {number} areaCourseHoursData.courseId - ID del curso del areaCourseHours a actualizar.
   * @param {number} areaCourseHoursData.totalHours - Total de horas del areaCourseHours a actualizar.
   */
  async updateAreaCourseHours({ id, areaId, courseId, totalHours }) {
    return request("put", `/areaCourseHours/${id}`, { areaId, courseId, totalHours });
  },

  /**
   * Elimina un areaCourseHours por su ID.
   * @param {number} id - ID del areaCourseHours a eliminar.
   * @returns {Promise<boolean>}
   * @throws {Error} Si el ID no es válido.
   */
  async deleteAreaCourseHours(id) {
    if (!id) throw new Error("ID inválido");
    return request("delete", `/areaCourseHours/${id}`);
  }
};

export default AreaCourseHoursServices;