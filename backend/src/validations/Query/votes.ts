import Joi from "joi";
import {
  createWithPaginationArgs,
  WithPaginationArgs,
} from "../../functions/withPagination";
import { VoteFilter } from "../../typeDefs/inputs/VoteFilter";

export type VotesArgs = WithPaginationArgs<VoteFilter>;

export const votesArgs = createWithPaginationArgs<VotesArgs>({
  voteId: Joi.string(),
  pollId: Joi.string(),
  optionId: Joi.string(),
  voterAddress: Joi.string(),
  payload: Joi.string(),
  signature: Joi.string(),
});
