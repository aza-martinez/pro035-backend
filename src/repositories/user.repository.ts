import { BaseRepository } from "./base.repository";
import { UsuarioModel } from "./../entities/user.entitie";

export class UserRepository extends BaseRepository {
  constructor() {
    super(UsuarioModel);
  }

  async getUserByEmail(email: string) {
    return await UsuarioModel.findOne({ $or: [{ email }, { user: email }] });
  }
}
