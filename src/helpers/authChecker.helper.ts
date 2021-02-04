import { Context } from "./../interfaces/context.interface";
import { AuthChecker } from "type-graphql";

export const authChecker: AuthChecker<Context> = (
  { context: { user } },
  roles
) => {
  if (roles.length === 0) return user !== undefined;

  if (!user) return false;

  if (roles.some((role) => role === user.perfil)) {
    return true;
  }

  return true;
};
