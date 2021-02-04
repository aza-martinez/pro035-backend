import { ObjectType, Field, ID } from "type-graphql";
import {
  prop as Property,
  getModelForClass,
  plugin,
} from "@typegoose/typegoose";
import mongooseValidator from "mongoose-unique-validator";
import { Author } from "./author.entitie";
import autopopulate from 'mongoose-autopopulate'; 

@ObjectType({ description: "The books model" })
@plugin(mongooseValidator, {
  message: "Ya existe un registro con el mismo nombre",
})
@plugin(autopopulate as any)
export class Book {
  @Field(() => ID)
  id: string;

  @Field({ description: "Nombre del libro" })
  @Property({ required: true, unique: true, uniqueCaseInsensitive: true })
  name: string;

  @Field({ nullable: true })
  @Property({ required: false })
  description: string;

  @Field(_type => Author, { nullable: true })
  @Property({ref: Author, required: false, autopopulate: true})
  author: Author;
}

export const BookModel = getModelForClass(Book);
