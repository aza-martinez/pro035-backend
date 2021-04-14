import { Puesto, PuestoModelo } from "../entities/position.entitie";
import { BaseRepository } from "./base.repository";

export class PositionRepository extends BaseRepository {
  constructor() {
    super(PuestoModelo);
  }

  async getPositionByName(name: string, company: string) {
    return await PuestoModelo.findOne({
      $and: [{ nombre: name }, { empresa: company }, { estatus: true }],
    });
  }
}
