import { EmpresaModelo } from "../entities/company.entitie";
import { CompanyInput } from "../graphql/types/company.input";
import { Upload } from "../graphql/types/upload.input";
import { CompanyRepository } from "../repositories/company.repository";
import { BaseService } from "./base.service";
import cloudinary from "./../helpers/cloudinary";
import { FileUpload } from "graphql-upload";

export class CompanyService {
  #companyRepository: any;
  constructor() {
    this.#companyRepository = new CompanyRepository();
  }

  async getAllByClient(client: string) {
    return await this.#companyRepository.getAllByClient(client);
  }

  async create(input: CompanyInput, logo: Upload, client: string) {
    try {
      const { createReadStream, filename } = await logo;
      console.log(createReadStream);

      const companyExists = await EmpresaModelo.findOne({
        $and: [
          { cliente: client },
          { estatus: true },
          { $or: [{ razonSocial: input.razonSocial }, { alias: input.alias }] },
        ],
      });

      if (companyExists) {
        throw new Error("Razon social o alias ya están siendo utilizados");
      }

      const folder = "/pro035/logos-empresas/";

      const { url } = await new Promise((resolve, reject) => {
        createReadStream().pipe(
          cloudinary.uploader.upload_stream({ folder }, (err, url: any) => {
            console.log("ERROR CLODUINARY", err);
            console.log("URL", url);
            if (err) return reject(err);
            return resolve(url);
          })
        );
      });

      return await this.#companyRepository.create({
        ...input,
        logo: url as string,
        cliente: client,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
