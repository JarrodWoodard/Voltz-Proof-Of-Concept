import Joi from "joi";
import { createSchemaFromArgs } from "../../functions/createSchemaFromArgs";
import { OptionID } from "../../typeDefs/inputs/OptionID";

export interface OptionArgs {
  id: OptionID;
}

export const optionArgs = createSchemaFromArgs<OptionArgs>({
  id: createSchemaFromArgs<OptionArgs["id"]>({
    optionId: Joi.string(),
  }),
});
