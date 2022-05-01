import Joi from "joi";
import { createSchemaFromArgs } from "../../functions/createSchemaFromArgs";
import { UserID } from "../../typeDefs/inputs/UserID";

export interface UserArgs {
  id: UserID;
}

export const userArgs = createSchemaFromArgs<UserArgs>({
  id: createSchemaFromArgs<UserArgs["id"]>({
    address: Joi.string(),
  }),
});
