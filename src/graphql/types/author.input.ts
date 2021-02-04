import  { Field, InputType } from 'type-graphql';

@InputType()
export class AuthorInput {
    @Field()
    name: String;

    @Field()
    email: String;
}