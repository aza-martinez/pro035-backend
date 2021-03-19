import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { MaxLength, MinLength } from "class-validator";
import { Cliente } from "./client.entitie";

@ObjectType({ description: "Companies of clientes" })
export class Empresa {
  @Field(() => ID)
  id: string;

  @Field()
  @Property({ required: true, trim: true })
  razonSocial: string;

  @Field()
  @Property({ required: true, trim: true })
  alias: string;

  @Field()
  @Property({ trim: true, required: true })
  direccion: string;

  @Field()
  @Property({ trim: true })
  cp: string;

  @Field()
  @Property({ trim: true })
  @MinLength(12, { message: "RFC no válido" })
  @MaxLength(13, { message: "RFC no válido" })
  rfc: string;

  @Field()
  @Property({ default: true })
  estatus: true;

  @Field(() => String)
  @Property({ required: true, ref: Cliente })
  cliente: string | Cliente;

  @Field()
  @Property({ trim: true })
  logo: string;

  @Field()
  @Property({ trim: true })
  giro: string;

  @Field()
  @Property({ trim: true })
  principalesActividades: string;
}

export const EmpresaModelo = getModelForClass(Empresa);
