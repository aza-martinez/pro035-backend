import { AreasTrabajoModelo } from "../entities/workAreas.entitie";
import { BaseRepository } from "./base.repository";

export class WorkAreaRepository extends BaseRepository {
  constructor() {
    super(AreasTrabajoModelo);
  }
}
