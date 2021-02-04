import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { Author } from './../../entities/author.entitie';
import { AuthorService } from '../../services/author.service';
import { AuthorInput } from '../types/author.input';

@Resolver()
export class AuthorResolver {
    #authorService: any;

    constructor() {
        this.#authorService = new AuthorService();
    }

    @Query(_returns => Author, { nullable: false })
    async author(@Arg("id", { nullable: false }) id: string) {
        return await this.#authorService.get(id);
    }

    @Query(() => [Author])
    async authors(): Promise<Author[]> {
        return await this.#authorService.getAll();
    }

    @Mutation((_returns) => Author)
    async createAuthor(@Arg("author") authorInput: AuthorInput) {
        return await this.#authorService.create(authorInput);
    }
 }