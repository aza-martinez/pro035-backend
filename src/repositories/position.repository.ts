import { PuestoModelo } from "../entities/position.entitie";
import { BaseRepository } from "./base.repository";

export class PositionRepository extends BaseRepository {
  constructor() {
    super(PuestoModelo);
  }
}
