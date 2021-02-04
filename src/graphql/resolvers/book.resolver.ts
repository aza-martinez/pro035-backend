import { Query, Resolver, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import { Book } from "../../entities/book.entitie";
import { BookInput } from "../types/book.input";
import { BookService } from "./../../services/book.service";
import { Context } from './../../interfaces/context.interface';

@Resolver()
export class BookResolver {
  #bookService: any;

  constructor() {
    this.#bookService = new BookService();
  }

  @Query((_returns) => Book, { nullable: true })
  async book(@Arg("id", { nullable: false }) id: string) {
    return await this.#bookService.get(id);
  }
  
  @Authorized('Administrador')
  @Query(() => [Book],{ nullable: true })
  async books(@Ctx() { user }: Context): Promise<Book[]> {
    return await this.#bookService.getAll();
  }

  @Mutation((_returns) => Book)
  async createBook(@Arg("book") bookInput: BookInput): Promise<Book> {
    return await this.#bookService.create(bookInput);
  }
}
