import { CompanyRepository } from "../repositories/company.repository";
import { BaseService } from "./base.service";

export class CompanyService extends BaseService {
  #companyRepository: any;
  constructor() {
    super(CompanyRepository);
    this.#companyRepository = new CompanyRepository();
  }

  async getAllByClient(client: string) {
    return await this.#companyRepository.getAllByClient(client);
  }
}
