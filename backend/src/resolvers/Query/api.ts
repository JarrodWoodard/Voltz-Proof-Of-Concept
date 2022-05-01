import { resolver } from "../../functions/resolver";
import { auth } from "../../middlewares/auth";
import { ApiFields } from "../../typeDefs/types/Api";
import { QueryFields } from "../../typeDefs/types/Query";

export const api = resolver<QueryFields, ApiFields>(
  auth(),
  resolver(async () => {
    return {
      name: process.env.API_NAME,
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || "N/A",
    };
  })
);
