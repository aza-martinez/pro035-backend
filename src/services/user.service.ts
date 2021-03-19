import { BaseService } from "./base.service";
import { UserRepository } from "./../repositories/user.repository";

export class UserService extends BaseService {
  #userRepository: any;
  constructor() {
    super(UserRepository);
    this.#userRepository = new UserRepository();
  }

  async getUserByEmailOrUser(email: string) {
    return await this.#userRepository.getUserByEmail(email);
  }

  async getUsersByCompany(company: string, client: string) {
    return await this.#userRepository.getUsersByCompany(
      company as string,
      client
    );
  }
}
