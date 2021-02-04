import { BaseRepository } from './base.repository'
import { BookModel } from './../entities/book.entitie';

export class BookRepository extends BaseRepository {
    constructor() {
        super(BookModel);
    }
}