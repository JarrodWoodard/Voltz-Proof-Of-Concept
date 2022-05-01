import Joi from "joi";
import {
  createWithPaginationArgs,
  WithPaginationArgs,
} from "../../functions/withPagination";
import { PollFilter } from "../../typeDefs/inputs/PollFilter";

export type PollsArgs = WithPaginationArgs<PollFilter>;

export const pollsArgs = createWithPaginationArgs<PollsArgs>({
  pollId: Joi.string(),
  title: Joi.string(),
  description: Joi.string(),
  creatorAddress: Joi.string(),
  payload: Joi.string(),
  signature: Joi.string(),
  minimalBalanceRequiredToVote: Joi.number(),
  expired: Joi.boolean(),
  expirationDate: Joi.date().iso(),
  expirationBlockQuote: Joi.number().integer().min(0),
  pollType: Joi.string().valid("USER_VOTES", "USER_BALANCE"),
});
