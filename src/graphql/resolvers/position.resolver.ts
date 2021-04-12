import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Puesto } from "../../entities/position.entitie";
import { Context } from "../../interfaces/context.interface";
import { PositionService } from "../../services/position.service";

@Resolver()
export class PositionResolver {
  #positionService: any;

  constructor() {
    this.#positionService = new PositionService();
  }

  @Authorized("Administrador", "Empleado")
  @Query((_returns) => [Puesto], { nullable: true })
  async positionsByCompany(
    @Arg("company") company: string,
    @Ctx() { user }: Context
  ): Promise<Puesto[]> {
    console.log(user.cid)
    return await this.#positionService.getAllByCompany(company, user.cid);
  }
}
