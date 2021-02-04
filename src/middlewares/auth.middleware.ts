import { Auth } from "./../helpers/auth";

export async function AuthMiddleware(req: any, res: any, next: any) {
  try {
    const auth = new Auth();
    const token: string = req.headers.authorization;
    const bearerToken: string[] = token.split(" ");
    const user =  await auth.verifyToken(bearerToken[1]);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).end("Unauthorization");
  }
}
