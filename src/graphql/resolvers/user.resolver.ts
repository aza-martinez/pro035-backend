import { Query, Resolver, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import { Context } from "../../interfaces/context.interface";
import { UserInput, UserUpdateInput } from "../types/user.input";
import { Usuario } from "./../../entities/user.entitie";
import { UserService } from "./../../services/user.service";

@Resolver()
export class UserResolver {
  #userService: any;

  constructor() {
    this.#userService = new UserService();
  }
  @Authorized("Administrador", "Empleado")
  @Query((_returns) => Usuario, { nullable: true })
  async user(
    @Arg("id") userID: string,
    @Arg("company") company: string,
    @Ctx() { user }: Context
  ) {
    return await this.#userService.get(userID, company, user.cid);
  }

  @Authorized("Administrador")
  @Query(() => [Usuario], { nullable: true })
  async users(): Promise<Usuario[]> {
    return await this.#userService.getAll();
  }

  @Authorized("Administrador")
  @Query(() => [Usuario], { nullable: true })
  async usersByCompany(
    @Arg("company") company: string,
    @Ctx() { user }: Context
  ): Promise<Usuario[]> {
    return await this.#userService.getUsersByCompany(company, user.cid);
  }

  @Authorized("Administrador")
  @Mutation(() => Usuario, { nullable: true })
  async updateUser(
    @Arg("id") id: string,
    @Arg("input") entity: UserUpdateInput,
    @Ctx() { user }: Context
  ) {
    return await this.#userService.update(id, { ...entity }, user.cid);
  }

  @Authorized("Administrador")
  @Mutation(() => Usuario, { nullable: true })
  async createUser(
    @Arg("user") userInput: UserInput,
    @Ctx() { user }: Context
  ): Promise<Usuario> {
    return await this.#userService.create({
      ...userInput,
      cliente: user.cid,
      perfil: "Empleado",
    });
  }

  @Authorized("Administrador")
  @Mutation(() => Usuario, { nullable: true })
  async deleteUser(
    @Arg("id") userId: String,
    @Ctx() { user }: Context
  ): Promise<Usuario> {
    return await this.#userService.update(userId, { estatus: false }, user.cid);
  }
}
