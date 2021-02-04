import { BaseService } from './base.service'
import { BookRepository } from './../repositories/book.reository';

export class BookService extends BaseService {
    constructor() {
        super(BookRepository);
    }
}