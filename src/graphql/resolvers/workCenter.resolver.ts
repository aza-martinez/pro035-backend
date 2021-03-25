import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { CentrosTrabajo } from "../../entities/workCenter.enitie";
import { Context } from "../../interfaces/context.interface";
import { WorkCenterService } from "../../services/workCenter.service";

@Resolver()
export class WorkCenterResolver {
  #workCenterService: any;

  constructor() {
    this.#workCenterService = new WorkCenterService();
  }

  @Authorized("Administrador")
  @Query((_returns) => [CentrosTrabajo], { nullable: true })
  async workCentersByCompany(
    @Arg("company") company: string,
    @Ctx() { user }: Context
  ): Promise<CentrosTrabajo[]> {
    return await this.#workCenterService.getWorkCentersByCompany(company, user.cid);
  }
}
