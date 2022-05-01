import { resolver } from "../../functions/resolver";
import { validation } from "../../functions/validation";
import { OptionFields } from "../../typeDefs/types/Option";
import { QueryFields } from "../../typeDefs/types/Query";
import {
  VotedOptionArgs,
  votedOptionArgs,
} from "../../validations/Poll/votedOption";
import { Option } from "../../models/Option";
import { database } from "../../utils/database";
import { Vote } from "../../models/Vote";

export const votedOption = resolver<
  QueryFields,
  OptionFields | null,
  VotedOptionArgs
>(
  validation(votedOptionArgs),
  resolver(async (source, args, ctx) => {
    const {
      input: { ...input },
    } = args;

    const vote = await Vote.findOne({
      database,
      filter: {
        $eq: {
          pollId: source.pollId,
          voterAddress: input.voterAddress,
        },
      },
    });

    if (!vote) {
      return null;
    }

    const option = await Option.findOne({
      database,
      filter: {
        $eq: {
          pollId: vote.pollId,
          optionId: vote.optionId,
        },
      },
    });

    return option;
  })
);
