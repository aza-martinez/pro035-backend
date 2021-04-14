import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Puesto } from "../../entities/position.entitie";
import { Context } from "../../interfaces/context.interface";
import { PositionService } from "../../services/position.service";
import { PositionInput, PositionUpdateInput } from "../types/position.input";

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
    console.log(user.cid);
    return await this.#positionService.getAllByCompany(company, user.cid);
  }

  @Authorized("Administrador")
  @Query((_returns) => Puesto, { nullable: true })
  async positionByCompany(
    @Arg("position") positionId: string,
    @Arg("company") company: string,
    @Ctx() { user }: Context
  ): Promise<Puesto> {
    return await this.#positionService.get(positionId, company, user.cid);
  }

  @Authorized("Administrador")
  @Mutation((_returns) => Puesto, { nullable: true })
  async createPosition(
    @Arg("input") input: PositionInput,
    @Ctx() { user }: Context
  ): Promise<Puesto> {
    return await this.#positionService.create({
      ...input,
      cliente: user.cid,
    });
  }

  @Authorized("Administrador")
  @Mutation((_returns) => Puesto, { nullable: true })
  async updatePosition(
    @Arg("id") positionId: String,
    @Arg("input") input: PositionUpdateInput,
    @Ctx() { user }: Context
  ): Promise<Puesto> {
    return await this.#positionService.update(positionId, input, user.cid);
  }

  @Authorized("Administrador")
  @Mutation((_returns) => Puesto, { nullable: true })
  async deletePosition(
    @Arg("id") positionId: String,
    @Ctx() { user }: Context
  ) {
    return await this.#positionService.update(
      positionId,
      { estatus: false },
      user.cid
    );
  }
  
}
