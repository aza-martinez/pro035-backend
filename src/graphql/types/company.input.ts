import { Field, InputType } from "type-graphql";

@InputType()
export class CompanyInput {
  @Field({ nullable: false })
  razonSocial: string;

  @Field({ nullable: false })
  alias: string;

  @Field({ nullable: false })
  rfc: String;

  @Field({ nullable: false })
  direccion: String;

  @Field({ nullable: false })
  cp: String;

  @Field({ nullable: false })
  giro: String;
}
