import { Field, InputType } from "type-graphql";

@InputType()
export class WorkAreaInput {
  @Field({ nullable: false })
  nombre: String;

  @Field({ nullable: true })
  descripcion: String;

  @Field(type => [String],{ nullable: false })
  centrosTrabajo: String[];

  @Field({ nullable: false })
  empresa: String;
}

@InputType()
export class WorkAreaUpdateInput {
  @Field({ nullable: false })
  nombre: String;

  @Field({ nullable: true })
  descripcion?: String;

  @Field(type => [String],{ nullable: false })
  centrosTrabajo: String[];
}

