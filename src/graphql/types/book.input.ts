import { Field, InputType } from 'type-graphql';

@InputType()
export class BookInput {
    @Field()
    name: String;
    
    @Field({ nullable: true })
    description: String;

    @Field({ nullable: false })
    author: String;   
}