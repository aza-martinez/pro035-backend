import { ReadStream } from "fs";
import { Stream } from "stream";
import { Field, InputType } from "type-graphql";

export interface Upload {
  createReadStream(): ReadStream;

  filename: string;

  mimetype: string;

  encoding: string;
}
