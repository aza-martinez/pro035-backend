import { WorkCenterRepository } from "../repositories/workCenter.repository";
import { BaseService } from "./base.service";

export class WorkCenterService extends BaseService {
  #workCenterRepository: any;
  constructor() {
    super(WorkCenterRepository);
    this.#workCenterRepository = new WorkCenterRepository();
  }

  async getWorkCentersByCompany(company: string, client: string) {
    return await this.#workCenterRepository.getWorkCentersByCompany(
      company,
      client
    );
  }
}
