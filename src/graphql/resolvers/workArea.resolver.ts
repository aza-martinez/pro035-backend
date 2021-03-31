import { Resolver, Query, Authorized, Arg, Ctx } from "type-graphql";
import { AreasTrabajo } from "../../entities/workAreas.entitie";
import { Context } from "../../interfaces/context.interface";
import { WorkAreaService } from "../../services/workArea.service";

@Resolver()
export class WorkAreaResolver {
  #workAreaService: any;

  constructor() {
    this.#workAreaService = new WorkAreaService();
  }

  @Authorized("Administrador")
  @Query((_returns) => [AreasTrabajo], { nullable: true })
  async workAreasByCompany(
    @Arg("company") company: string,
    @Ctx() { user }: Context
  ): Promise<AreasTrabajo[]> {
    return await this.#workAreaService.getAllByCompany(company, user.cid);
  }
}
