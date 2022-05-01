import { createValidation } from "@ev-graphql-2/create-validation";
import { resolver } from "./resolver";

export const validation = createValidation(resolver);
