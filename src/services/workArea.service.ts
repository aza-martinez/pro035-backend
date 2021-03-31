import { WorkAreaRepository } from "../repositories/workArea.repository";
import { BaseService } from "./base.service";

export class WorkAreaService extends BaseService {
  #workAreaRepository: any;

  constructor() {
    super(WorkAreaRepository);
    this.#workAreaRepository = new WorkAreaRepository();
  }
}
