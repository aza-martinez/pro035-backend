import { Request } from "express";
import { config } from "../config";

export async function context({ req }: { req: Request }) {
  let { user }: any = req;
  const metaData: string = config.JWT_USER_METADATA as string
  return { user: user[metaData] };
}
