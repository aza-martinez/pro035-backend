import { BaseRepository } from "./base.repository";
import { AuthorModel } from "./../entities/author.entitie";

export class AuthorRepository extends BaseRepository {
  constructor() {
    super(AuthorModel);
  }
}
