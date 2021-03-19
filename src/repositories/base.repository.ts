export class BaseRepository {
  #model: any;
  constructor(model: any) {
    this.#model = model;
  }

  async get(id: string, company: string, client: string) {
    return await this.#model.findOne({
      $and: [{ _id: id }, { cliente: client }, { empresa: company }],
    });
  }

  async getAll() {
    return await this.#model.find();
  }

  async create(entity: object) {
    return await this.#model.create(entity);
  }

  async update(id: string, entity: object, client: string) {
    return await this.#model.findOneAndUpdate(
      { $and: [{ _id: id }, { cliente: client }] },
      entity,
      { new: true }
    );
  }
}
