import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

export class Auth {
  private audience: string = "https://Pro035Development";
  private issuer: string = "https://pro035.us.auth0.com/";
  private algorithms: any = ["RS256"];

  constructor() {
    this.getClient = this.getClient.bind(this);
    this.getkey = this.getkey.bind(this);
  }

  getClient() {
    return jwksClient({
      jwksUri: "https://pro035.us.auth0.com/.well-known/jwks.json",
    });
  }

  getkey(header: any, callback: any) {
    const client: any = this.getClient();
    client.getSigningKey(header.kid, function (error: any, key: any) {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }

  public verifyToken(token: any) {
    const $this = this;
    return new Promise(function (resolve, reject) {
      jwt.verify(
        token,
        $this.getkey,
        {
          audience: $this.audience,
          issuer: $this.issuer,
          algorithms: $this.algorithms,
        },
        (error: any, decoded: any) => {
          if (error) reject(error);

          if (decoded) resolve(decoded);
        }
      );
    });
  }
}
