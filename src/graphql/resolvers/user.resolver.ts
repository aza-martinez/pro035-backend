import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { Usuario } from "./../../entities/user.entitie";
import { UserService } from "./../../services/user.service";

@Resolver()
export class UserResolver {
  #userService: any;

  constructor() {
    this.#userService = new UserService();
  }

  @Query(() => [Usuario], { nullable: true })
  async users(): Promise<Usuario[]> {
    return await this.#userService.getAll();
  }
}
