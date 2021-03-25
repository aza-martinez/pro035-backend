import { BaseRepository } from "./base.repository";
import { ModeloCentroTrabajo } from "./../entities/workCenter.enitie";

export class WorkCenterRepository extends BaseRepository {
  constructor() {
    super(ModeloCentroTrabajo);
  }

  async getWorkCentersByCompany(company: string, client: string) {
    return await ModeloCentroTrabajo.find({
      $and: [{ estatus: true }, { empresa: company }, { cliente: client }],
    });
  }
}
