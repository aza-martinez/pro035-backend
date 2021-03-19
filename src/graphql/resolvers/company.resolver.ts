import { Ctx, Query, Resolver } from "type-graphql";
import { Empresa } from "../../entities/company.entitie";
import { Context } from "../../interfaces/context.interface";
import { CompanyService } from "../../services/company.service";

@Resolver()
export class CompanyResolver {
  #companyService: any;

  constructor() {
    this.#companyService = new CompanyService();
  }

  @Query((_returns) => [Empresa], { nullable: true })
  async companies(): Promise<Empresa[]> {
    return await this.#companyService.getAll();
  }

  @Query((_returns) => [Empresa], { nullable: true })
  async companiesByClient(@Ctx() { user }: Context): Promise<Empresa[]> {
    return await this.#companyService.getAllByClient(user.cid);
  }
}
