import { getModelForClass, Prop as Property } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { Cliente } from "./client.entitie";
import { Empresa } from "./company.entitie";

@ObjectType({ description: "Jobs Positions of Users" })
export class Puesto {
  @Field(() => ID)
  id: string;

  @Field()
  @Property({ required: true, trim: true })
  nombre: string;

  @Field({ nullable: true })
  @Property({ required: false, trim: true })
  descripcion: string;

  @Field()
  @Property({ default: true })
  estatus: boolean;

  @Field(() => Cliente)
  @Property({ required: true, ref: Cliente })
  cliente: string | Cliente;

  @Field(() => Empresa, { nullable: true })
  @Property({ required: true, ref: Empresa })
  empresa: string | Empresa;

  createdAt: Date;

  updatedAt: Date;
}


export const PuestoModelo = getModelForClass(Puesto);