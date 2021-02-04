import { BaseService } from './base.service';
import { AuthorRepository } from './../repositories/author.repository';

export class AuthorService extends BaseService {
    constructor(){
        super(AuthorRepository)
    };
}