import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { Cliente } from "./client.entitie";
import { Empresa } from "./company.entitie";

@ObjectType({ description: "Work Centers of Companies" })
export class CentrosTrabajo {
  @Field(() => ID)
  id: string;

  @Field()
  @Property({ required: true, trim: true })
  nombre: string;

  @Field()
  @Property({ required: true, trim: true })
  direccion: string;

  @Field()
  @Property({ required: true, trim: true })
  cp: string;

  @Field()
  @Property({ required: true, trim: true })
  telefono: string;

  @Field({ nullable: true })
  @Property({ default: true })
  estatus: boolean;

  @Field(() => Empresa, { nullable: true })
  @Property({ ref: Empresa, required: false, trim: true, autopopulate: true })
  empresa: string | Empresa;

  @Field(() => String)
  @Property({ ref: Cliente, required: true, trim: true })
  cliente: string | Cliente;

  createdAt: Date;

  updatedAt: Date;
}

export const ModeloCentroTrabajo = getModelForClass(CentrosTrabajo);
