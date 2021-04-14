import { Field, InputType } from "type-graphql";

@InputType()
export class PositionInput {
  @Field()
  nombre: String;

  @Field()
  descripcion: String;

  @Field({ nullable: false })
  empresa: String;
}

@InputType()
export class PositionUpdateInput {
  @Field()
  nombre: String;

  @Field()
  descripcion: String;

  @Field({ nullable: true })
  empresa: String;
}
