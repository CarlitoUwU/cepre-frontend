import { request } from "./api";

export const AdmissionsServices = {
  async crearAdmission({ name, year, sede, started, finished, configuration }) {
    return request("post", "/admissions", { name, year, sede, started, finished, configuration });
  }
}