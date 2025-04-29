import { request } from "./api";

export const SchedulesService = {

  /**
   * Obtiene la lista de horarios.
   * @returns {Promise<Array<Object | null>} | null}
   */
  async getSchedules() {
    return request("get", "/schedules", null, true);
  },

  /**
   * Obtiene un horario por su ID.
   * @param {number} id - ID del horario a obtener.
   * @returns {Promise<{ id: number, hourSessionId: number, weekday: string, classId: number, teacherId: number } | null>}
   * @throws {Error} Si el ID no es válido.
   */
  async getScheduleById(id) {
    if (!id || typeof id !== "number") throw new Error("ID inválido");
    return request("get", `/schedules/${id}`);
  },

  /**
   * Crea un nuevo horario.
   * @param {Object} newSchedule - Datos del horario a crear.
   * @param {number} newSchedule.hourSessionId - ID de la sesión de hora.
   * @param {string} newSchedule.weekday - Día de la semana.
   * @param {string} newSchedule.classId - ID de la clase.
   * @param {string} newSchedule.teacherId - ID del profesor.
   * @returns {Promise<{ id: number, hourSessionId: number, weekday: string, classId: number, teacherId: number } | null>}
   * @throws {Error} Si faltan datos.
   */
  async createSchedule({ hourSessionId, weekday, classId, teacherId }) {
    if (!hourSessionId || !weekday || !classId || !teacherId) throw new Error("Faltan datos");
    return request("post", "/schedules", { hourSessionId, weekday, classId, teacherId });
  },

  /**
   * Actualiza un horario por su ID.
   * @param {Object} schedule - Datos del horario a actualizar.
   * @param {number} schedule.id - ID del horario a actualizar.
   * @param {number} schedule.hourSessionId - ID de la sesión de hora.
   * @param {string} schedule.weekday - Día de la semana.
   * @param {string} schedule.classId - ID de la clase.
   * @param {string} schedule.teacherId - ID del profesor.
   * @returns {Promise<{ id: number, hourSessionId: number, weekday: string, classId: number, teacherId: number } | null>}}
   * @throws {Error} Si el ID del horario no es válido.
   */
  async updateSchedule({ id, hourSessionId, weekday, classId, teacherId }) {
    if (!id) throw new Error("ID inválido");
    return request("put", `/schedules/${id}`, { hourSessionId, weekday, classId, teacherId });
  },

  /**
   * Elimina un horario por su ID.
   * @param {number} id - ID del horario a eliminar.
   * @returns {Promise<boolean>}
   * @throws {Error} Si el ID no es válido.
   */
  async deleteSchedule(id) {
    if (!id) throw new Error("ID inválido");
    return request("delete", `/schedules/${id}`);
  },

  /**
   * Asigna un horario a un profesor y una clase.
   * @param {Object} params - Parámetros para la asignación.
   * @param {string} params.teacherId - ID del profesor.
   * @param {string} params.classId - ID de la clase.
   */

  async asignarSchedulesByTeacherClass({ teacherId, classId }) {
    if (!teacherId || !classId) throw new Error("Faltan datos");
    return request("patch", "/schedules/asignar/profesor", { classroomIds: [classId], teacherId: teacherId });
  },

  async desasignarSchedulesByTeacherClass({ teacherId, classId }) {
    return request("patch", "/schedules/desasignar/profesor", { classroomIds: [classId], teacherId: teacherId });
  },

  /**
   * Carga horarios con cursos
   */
  async loadWithCourses() {
    return request("post", "/schedules/load-with-courses");
  },

  async getClasesDisponibles({ idDocente, idCurso, horario, page = 1, pageSize = 10 }) {
    const horarioParam = encodeURIComponent(JSON.stringify(horario));
    return request("get", '/schedules/salones/disponibles?course_id=' + idCurso + '&horario=' + horarioParam + '&teacher_id=' + idDocente + '&page=' + page + '&pageSize=' + pageSize)
  }
};