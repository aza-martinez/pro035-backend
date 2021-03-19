import { Empresa, EmpresaModelo } from "../entities/company.entitie";
import { BaseRepository } from "./base.repository";

export class CompanyRepository extends BaseRepository {
  constructor() {
    super(EmpresaModelo);
  }

  async getAllByClient(client: string): Promise<Empresa[]> {
    return await EmpresaModelo.find({
      $and: [{ cliente: client }, { estatus: true }],
    });
  }
}
