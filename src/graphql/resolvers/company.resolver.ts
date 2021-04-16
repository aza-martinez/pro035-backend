import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Empresa } from "../../entities/company.entitie";
import { Context } from "../../interfaces/context.interface";
import { CompanyService } from "../../services/company.service";
import { Upload } from "../types/upload.input";
import { CompanyInput } from "../types/company.input";
import {  FileUpload, GraphQLUpload } from "graphql-upload";
import { GraphQLScalarType } from "graphql";

@Resolver()
export class CompanyResolver {
  #companyService: any;

  constructor() {
    this.#companyService = new CompanyService();
  }

  @Query((_returns) => [Empresa], { nullable: true })
  async companies(): Promise<Empresa[]> {
    return await this.#companyService.getAll();
  }

  @Query((_returns) => [Empresa], { nullable: true })
  async companiesByClient(@Ctx() { user }: Context): Promise<Empresa[]> {
    return await this.#companyService.getAllByClient(user.cid);
  }

  @Authorized("Administrador")
  @Mutation((_returns) => Empresa, { nullable: true })
  async createCompany(
    @Arg("input") input: CompanyInput,
    @Arg("logo", () => GraphQLUpload) logo: Upload,
    @Ctx() { user }: Context
  ): Promise<Empresa> {
    return await this.#companyService.create(input, logo, user.cid);
  }
}
