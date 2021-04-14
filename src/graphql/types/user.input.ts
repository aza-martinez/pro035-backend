import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput {
  @Field({ nullable: false })
  nombre: String;

  @Field({ nullable: false })
  apellidoPaterno: String;

  @Field({ nullable: false })
  apellidoMaterno: String;

  @Field({ nullable: false })
  usuario: String;

  @Field({ nullable: false })
  password: String;

  @Field({ nullable: false })
  email: String;

  @Field({ nullable: false })
  empresa: String;

  @Field({nullable: false})
  centroTrabajo: String;
}

@InputType()
export class UserUpdateInput {
  @Field({ nullable: false })
  nombre: String;

  @Field({ nullable: false })
  apellidoPaterno: String;

  @Field({ nullable: false })
  apellidoMaterno: String;

  @Field({ nullable: true })
  genero?: String;

  @Field({ nullable: true })
  rangoEdad?: String;

  @Field({ nullable: true })
  estadoCivil?: String;

  @Field({ nullable: true })
  nivelEstudios?: String;

  @Field({ nullable: true })
  tipoPuesto?: String;

  @Field({ nullable: true })
  tipoContratacion?: String;

  @Field({ nullable: true })
  tipoPersonal?: String;

  @Field({ nullable: true })
  tipoJornada?: String;

  @Field({ nullable: true })
  rolarTurnos?: String;

  @Field({ nullable: true })
  experienciaPuestoActual?: String;

  @Field({ nullable: true })
  tiempoExperienciaLaboral?: String;

  @Field({ nullable: false })
  email?: String;

  @Field({ nullable: false })
  usuario: String;

  @Field({ nullable: true })
  password?: String;

  @Field({ nullable: true })
  puesto?: String;

  @Field({ nullable: true })
  areaTrabajo?: String;

  @Field({ nullable: false })
  centroTrabajo: String;
}
