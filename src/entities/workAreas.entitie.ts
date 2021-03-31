import { getModelForClass, plugin, Prop as Property } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { Cliente } from "./client.entitie";
import { Empresa } from "./company.entitie";
import { CentrosTrabajo } from "./workCenter.enitie";
import autopopulate from "mongoose-autopopulate";

@plugin(autopopulate as any)
@ObjectType({ description: "Workplaces of users" })
export class AreasTrabajo {
  @Field(() => ID)
  id: string;

  @Field()
  @Property({ required: true, trim: true })
  nombre: string;

  @Field({ nullable: true })
  @Property({ trim: true })
  descripcion: string;

  @Field()
  @Property({ default: true })
  estatus: boolean;

  @Field(() => [CentrosTrabajo], { nullable: true })
  @Property({ ref: CentrosTrabajo, autopopulate: true })
  centrosTrabajo: [string] | [CentrosTrabajo];

  @Field(() => Empresa)
  @Property({ required: true, ref: Empresa })
  empresa: string | Empresa;

  @Field(() => Cliente)
  @Property({ required: true, ref: Cliente })
  cliente: string | Cliente;
}

export const AreasTrabajoModelo = getModelForClass(AreasTrabajo, {
  schemaOptions: { timestamps: true },
});
