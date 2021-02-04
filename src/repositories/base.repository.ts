export class BaseRepository {
    #model: any;
    constructor(model: any) {
        this.#model = model;
    }

    async get(id: string) {
        return await this.#model.findById(id);
    }

    async getAll() {
        return await this.#model.find();
    }

    async create(entity: object) {
        return await this.#model.create(entity);
    }
}