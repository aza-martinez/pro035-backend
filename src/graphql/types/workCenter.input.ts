import { Field, InputType } from "type-graphql";

@InputType()
export class WorkCenterInput {
  @Field({ nullable: false })
  nombre: String;

  @Field({ nullable: false })
  direccion: String;

  @Field({ nullable: false })
  cp: String;

  @Field({ nullable: false })
  telefono: String;

  @Field({ nullable: false })
  empresa: String;
}
