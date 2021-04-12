import { PositionRepository } from "../repositories/position.repository";
import { BaseService } from "./base.service";

export class PositionService extends BaseService {
  #PositionRepository: any;

  constructor() {
    super(PositionRepository);
    this.#PositionRepository = new PositionRepository();
  }
}
