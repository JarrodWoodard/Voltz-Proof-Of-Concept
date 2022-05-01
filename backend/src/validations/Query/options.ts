import Joi from "joi";
import {
  createWithPaginationArgs,
  WithPaginationArgs,
} from "../../functions/withPagination";
import { OptionFilter } from "../../typeDefs/inputs/OptionFilter";

export type OptionsArgs = WithPaginationArgs<OptionFilter>;

export const optionsArgs = createWithPaginationArgs<OptionsArgs>({
  optionId: Joi.string(),
  pollId: Joi.string(),
  description: Joi.string(),
});
