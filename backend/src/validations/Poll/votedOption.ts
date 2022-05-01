import Joi from "joi";
import { createSchemaFromArgs } from "../../functions/createSchemaFromArgs";
import { VotedOptionInput } from "../../typeDefs/inputs/VotedOptionInput";

export interface VotedOptionArgs {
  input: VotedOptionInput;
}

export const votedOptionArgs = createSchemaFromArgs<VotedOptionArgs>({
  input: createSchemaFromArgs<VotedOptionArgs["input"]>({
    voterAddress: Joi.string(),
  }),
});
