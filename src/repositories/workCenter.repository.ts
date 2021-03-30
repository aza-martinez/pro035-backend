import { BaseRepository } from "./base.repository";
import {
  ModeloCentroTrabajo,
  CentrosTrabajo,
} from "./../entities/workCenter.enitie";

export class WorkCenterRepository extends BaseRepository {
  constructor() {
    super(ModeloCentroTrabajo);
  }

  async create(workCenter: CentrosTrabajo) {
    const workCenterExists = await ModeloCentroTrabajo.exists({
      $and: [
        { nombre: workCenter.nombre },
        { empresa: workCenter.empresa },
        { estatus: true },
      ],
    });

    if (workCenterExists)
      throw new Error(
        `Ya exste un centro trabajo con el nombre "${workCenter.nombre}"`
      );

    return await ModeloCentroTrabajo.create(workCenter);
  }

  async getWorkCentersByCompany(company: string, client: string) {
    return await ModeloCentroTrabajo.find({
      $and: [{ estatus: true }, { empresa: company }, { cliente: client }],
    });
  }
}
