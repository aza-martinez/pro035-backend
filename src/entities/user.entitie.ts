import { ObjectType, Field, ID } from "type-graphql";
import {
  prop as Property,
  getModelForClass,
  plugin,
} from "@typegoose/typegoose";
import autopopulate from "mongoose-autopopulate";

@ObjectType({ description: "The books model" })
@plugin(autopopulate as any)
export class Usuario {
  @Field(() => ID)
  id: string;

  @Field()
  @Property({ required: true })
  nombre: string;

  @Field()
  @Property({ required: true })
  apellidoPaterno: string;

  @Field()
  @Property({ required: true })
  apellidoMaterno: string;

  @Field()
  @Property({ required: true, trim: true })
  email: string;

  @Field()
  @Property({ required: true, trim: true })
  usuario: string;

  @Field()
  @Property({ required: true, trim: true })
  perfil: string;

  @Field({ nullable: true })
  @Property({ required: false, trim: true })
  rangoEdad: string;

  @Field({ nullable: true })
  @Property({ required: false, trim: true })
  estadoCivil: string;

  @Field({ nullable: true })
  @Property({ required: false, trim: true })
  nivelEstudios: string;

  @Field({ nullable: true })
  @Property({ required: false, trim: true })
  tipoPuesto: string;

  @Field({ nullable: true })
  @Property({ required: false, trim: true })
  tipoContratacion: string;

  @Field({ nullable: true })
  @Property({ required: false, trim: true })
  tipoPersonal: string;

  @Field({ nullable: true })
  @Property({ required: false, trim: true })
  tipoJornada: string;

  @Field({ nullable: true })
  @Property({ required: false, trim: true })
  rolarTurnos: string;

  @Field({ nullable: true })
  @Property({ required: false, trim: true })
  experienciaPuestoActual: string;

  @Field({ nullable: true })
  @Property({ required: false, trim: true })
  tiempoExperienciaLaboral: string;

  @Field({ nullable: true })
  @Property({ required: false, trim: true })
  password: string;

  @Field({ nullable: true })
  @Property({ required: false, trim: true })
  firstLogin: string;

  @Field({ nullable: true })
  @Property({ required: false, trim: true })
  cliente: string;

  @Field({ nullable: true })
  @Property({ required: false, trim: true })
  centroTrabajo: string;

  @Field({ nullable: true })
  @Property({ required: false, trim: true })
  empresa: string;

  @Field({ nullable: true })
  @Property({ required: false })
  estatus: boolean;

  @Field({ nullable: true })
  @Property({ required: false, trim: true })
  puesto: string;
}

export const UsuarioModel = getModelForClass(Usuario)
