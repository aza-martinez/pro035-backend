import { Puesto } from "../entities/position.entitie";
import { PositionRepository } from "../repositories/position.repository";
import { BaseService } from "./base.service";

export class PositionService extends BaseService {
  #PositionRepository: any;

  constructor() {
    super(PositionRepository);
    this.#PositionRepository = new PositionRepository();
  }

  async create(position: Puesto) {
    try {
      const { nombre, empresa } = position;
      const positionExists = await this.#PositionRepository.getPositionByName(
        nombre,
        empresa
      );

      if (positionExists) {
        const error = new Error(
          `Ya exste un puesto de trabajo con el nombre "${nombre}"`
        );
        throw error;
      }

      return await this.#PositionRepository.create(position);
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, position: Puesto, client: string) {
    try {
      const { nombre, empresa } = position;
      const positionExists = await this.#PositionRepository.getPositionByName(
        nombre,
        empresa
      );

      if (positionExists && positionExists._id != id) {
        const error = new Error(
          `Ya exste un puesto de trabajo con el nombre "${nombre}"`
        );

        throw error;
      }

      return await this.#PositionRepository.update(id, position, client);
    } catch (error) {
      throw error;
    }
  }
}
