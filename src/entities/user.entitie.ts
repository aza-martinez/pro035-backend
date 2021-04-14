import { ObjectType, Field, ID, Authorized } from "type-graphql";
import {
  prop as Property,
  getModelForClass,
  plugin,
  pre,
} from "@typegoose/typegoose";
import { Empresa } from "./company.entitie";
import autopopulate from "mongoose-autopopulate";
import { Cliente } from "./client.entitie";
import { CentrosTrabajo } from "./workCenter.enitie";
import { Puesto } from "./position.entitie";
import { AreasTrabajo } from "./workAreas.entitie";
import { hashPassword } from "../helpers/hashPassword.helper";

@ObjectType({ description: "The books model" })
@plugin(autopopulate as any)
@pre<Usuario>("findOneAndUpdate", function () {
  const user: any = this;

  if (user._update.password) {
    const hashedPassword: string = hashPassword(user._update.password);
    user._update.password = hashedPassword;
  }

  if (user._update.password === "") {
    delete user._update.password;
  }
})
@pre<Usuario>("save", function () {
  const user: any = this;

  if (user.password) {
    const hashedPassword: string = hashPassword(user.password);
    user.password = hashedPassword;
  }
})
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
  @Property({ required: true, trim: true, unique: true })
  email: string;

  @Field()
  @Property({ required: true, trim: true, unique: true })
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

  @Authorized("Master")
  @Field({ nullable: true })
  @Property({ required: false, trim: true })
  password: string;

  @Field()
  @Property({ default: true })
  firstLogin: boolean;

  @Field(() => String)
  @Property({ ref: Cliente, required: true, trim: true })
  cliente: string | Cliente;

  @Field(() => CentrosTrabajo, { nullable: true })
  @Property({ required: true, ref: CentrosTrabajo, autopopulate: true })
  centroTrabajo: string | CentrosTrabajo;

  @Field(() => Empresa, { nullable: true })
  @Property({ ref: Empresa, required: false, trim: true, autopopulate: true })
  empresa: string | Empresa;

  @Field()
  @Property({ default: true })
  estatus: boolean;

  @Field(() => Puesto, { nullable: true })
  @Property({ required: false, ref: Puesto, autopopulate: true })
  puesto: string | Puesto;

  @Field(() => AreasTrabajo, { nullable: true })
  @Property({ required: false, ref: AreasTrabajo, autopopulate: true })
  areaTrabajo: string | Puesto;
}

export const UsuarioModel = getModelForClass(Usuario, {
  schemaOptions: { timestamps: true },
});
