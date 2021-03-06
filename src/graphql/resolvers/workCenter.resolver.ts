import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CentrosTrabajo } from "../../entities/workCenter.enitie";
import { Context } from "../../interfaces/context.interface";
import { WorkCenterService } from "../../services/workCenter.service";
import {
  WorkCenterInput,
  WorkCenterUpdateInput,
} from "../types/workCenter.input";

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
    return await this.#workCenterService.getWorkCentersByCompany(
      company,
      user.cid
    );
  }

  @Query((_returns) => CentrosTrabajo, { nullable: true })
  async workCenterByCompany(
    @Arg("workCenter") workCenter: string,
    @Arg("company") company: string,
    @Ctx() { user }: Context
  ): Promise<CentrosTrabajo> {
    return await this.#workCenterService.get(workCenter, company, user.cid);
  }

  @Authorized("Administrador")
  @Mutation((_returns) => CentrosTrabajo, { nullable: true })
  async createWorkCenter(
    @Arg("workCenter") workCenterInput: WorkCenterInput,
    @Ctx() { user }: Context
  ) {
    return await this.#workCenterService.create({
      ...workCenterInput,
      cliente: user.cid,
    });
  }

  @Authorized("Administrador")
  @Mutation((_returns) => CentrosTrabajo, { nullable: true })
  async updateWorkCenter(
    @Arg("id") workCenterId: String,
    @Arg("input") input: WorkCenterUpdateInput,
    @Ctx() { user }: Context
  ) {
    return await this.#workCenterService.update(workCenterId, input, user.cid);
  }

  @Authorized("Administrador")
  @Mutation((_returns) => CentrosTrabajo, { nullable: true })
  async deleteWorkCenter(
    @Arg("id") workCenterId: String,
    @Ctx() { user }: Context
  ) {
    return await this.#workCenterService.update(
      workCenterId,
      { estatus: false },
      user.cid
    );
  }
}
