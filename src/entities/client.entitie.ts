import { ObjectType, Field, ID } from "type-graphql";
import { Prop as Property, getModelForClass } from "@typegoose/typegoose";
import { MaxLength, MinLength } from "class-validator";

@ObjectType({ description: "Clients of Pro035" })
export class Cliente {
  @Field(() => ID)
  id: string;

  @Field()
  @Property({ required: true, trim: true })
  razonSocial: string;

  @Field()
  @Property({ required: true, trim: true })
  alias: string;

  @Field({ nullable: true })
  @Property({ required: true, trim: true })
  calle: string;

  @Field({ nullable: true })
  @Property({ required: true, trim: true })
  colonia: string;

  @Field()
  @Property({ required: true, trim: true })
  cp: string;

  @Field()
  @Property({ trim: true })
  @MinLength(12, { message: "RFC no válido" })
  @MaxLength(13, { message: "RFC no válido" })
  rfc: string;

  @Field({ nullable: true })
  @Property({ required: false })
  estatus: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export const ModeloCliente = getModelForClass(Cliente);
