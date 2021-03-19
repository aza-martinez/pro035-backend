export class BaseService {
  #repository: any;
  constructor(repository: any) {
    this.#repository = new repository();
  }

  async get(id: string, company: string, client: string) {
    return await this.#repository.get(id, company, client);
  }

  async getAll() {
    return await this.#repository.getAll();
  }

  async create(entity: object) {
    return await this.#repository.create(entity);
  }

  async update(id: string, entity: object, client: string) {
    return await this.#repository.update(id, entity, client);
  }
}
