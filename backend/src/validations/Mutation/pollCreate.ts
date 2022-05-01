import Joi from "joi";
import {
  createArraySchemaFromArgs,
  createSchemaFromArgs,
} from "../../functions/createSchemaFromArgs";
import { PollCreateInput } from "../../typeDefs/inputs/PollCreateInput";

export interface PollCreateArgs {
  input: PollCreateInput;
}

export const pollCreateArgs = createSchemaFromArgs<PollCreateArgs>({
  input: createSchemaFromArgs<PollCreateArgs["input"]>({
    pollId: Joi.string(),
    title: Joi.string(),
    description: Joi.string().allow(""),
    creatorAddress: Joi.string(),
    payload: Joi.string(),
    signature: Joi.string(),
    minimalBalanceRequiredToVote: Joi.number().min(0),
    expirationDate: Joi.date().iso(),
    expirationBlockQuote: Joi.number().integer().min(0),
    options: createArraySchemaFromArgs<PollCreateArgs["input"]["options"]>({
      optionId: Joi.string(),
      description: Joi.string(),
    }),
    pollType: Joi.string().valid("USER_VOTES", "USER_BALANCE"),
  }),
});
