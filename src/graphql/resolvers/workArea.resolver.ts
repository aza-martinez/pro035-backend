import { Resolver, Query, Authorized, Arg, Ctx, Mutation } from "type-graphql";
import { AreasTrabajo } from "../../entities/workAreas.entitie";
import { Context } from "../../interfaces/context.interface";
import { WorkAreaService } from "../../services/workArea.service";
import { WorkAreaUpdateInput } from "./../types/workArea.input";

@Resolver()
export class WorkAreaResolver {
  #workAreaService: any;

  constructor() {
    this.#workAreaService = new WorkAreaService();
  }

  @Authorized("Administrador", "Empleado")
  @Query((_returns) => [AreasTrabajo], { nullable: true })
  async workAreasByCompany(
    @Arg("company") company: string,
    @Ctx() { user }: Context
  ): Promise<AreasTrabajo[]> {
    return await this.#workAreaService.getAllByCompany(company, user.cid);
  }

  @Authorized("Administrador", "Empleado")
  @Query((_returns) => AreasTrabajo, { nullable: true })
  async workAreaByCompany(
    @Arg("workArea") workArea: string,
    @Arg("company") company: string,
    @Ctx() { user }: Context
  ): Promise<AreasTrabajo> {
    return await this.#workAreaService.get(workArea, company, user.cid);
  }

  @Authorized("Administrador")
  @Mutation((_returns) => AreasTrabajo, { nullable: true })
  async updateWorkArea(
    @Arg("id") workAreaId: String,
    @Arg("input") input: WorkAreaUpdateInput,
    @Ctx() { user }: Context
  ): Promise<AreasTrabajo> {
    return await this.#workAreaService.update(workAreaId, input, user.cid);
  }
}
