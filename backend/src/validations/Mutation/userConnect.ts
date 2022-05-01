import Joi from "joi";
import { createSchemaFromArgs } from "../../functions/createSchemaFromArgs";
import { UserConnectInput } from "../../typeDefs/inputs/UserConnectInput";

export interface UserConnectArgs {
  input: UserConnectInput;
}

export const userConnectArgs = createSchemaFromArgs<UserConnectArgs>({
  input: createSchemaFromArgs<UserConnectArgs["input"]>({
    address: Joi.string(),
    publicKey: Joi.string(),
  }),
});
