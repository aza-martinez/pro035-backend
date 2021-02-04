import { Field, ObjectType, ID } from "type-graphql";
import { prop as Property, getModelForClass } from '@typegoose/typegoose'

@ObjectType({ description: 'Book Authors' })
export class Author {
    @Field(() => ID)
    id: string;

    @Field()
    @Property({ required: true, unique: true, uniqueCaseInsensitive: true })
    name?: string;
    
    @Field()
    @Property({ required: true })
    email: string;
}

export const AuthorModel = getModelForClass(Author)