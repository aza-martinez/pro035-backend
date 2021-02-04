export class BaseService {
    #repository: any;
    constructor(repository: any) {
        this.#repository = new repository();
    }

    async get(id: string) {
        return await this.#repository.get(id);
    }

    async getAll() {
        return await this.#repository.getAll();
    }

    async create(entity : object) {
        return await this.#repository.create(entity);
    }
}