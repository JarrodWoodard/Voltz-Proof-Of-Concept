import Joi from "joi";
import { createSchemaFromArgs } from "../../functions/createSchemaFromArgs";
import { VoteCreateInput } from "../../typeDefs/inputs/VoteCreateInput";

export interface VoteCreateArgs {
  input: VoteCreateInput;
}

export const voteCreateArgs = createSchemaFromArgs<VoteCreateArgs>({
  input: createSchemaFromArgs<VoteCreateArgs["input"]>({
    voteId: Joi.string(),
    pollId: Joi.string(),
    optionId: Joi.string(),
    voterAddress: Joi.string(),
    payload: Joi.string(),
    signature: Joi.string(),
  }),
});
