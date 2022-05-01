import { UserInputError } from "apollo-server-core";
import { resolveById } from "../../functions/resolveById";
import { resolver } from "../../functions/resolver";
import { validation } from "../../functions/validation";
import { PollFields } from "../../typeDefs/types/Poll";
import { QueryFields } from "../../typeDefs/types/Query";
import { PollArgs, pollArgs } from "../../validations/Query/poll";
import { convertPropsToPrettyString } from "../../functions/convertPropsToPrettyString";

export const poll = resolver<QueryFields, PollFields, PollArgs>(
  validation(pollArgs),
  resolver(async (source, args, ctx) => {
    const item = await resolveById({
      findById: ctx.loaders.Poll.findById,
      id: args.id,
    });

    if (!item) {
      throw new UserInputError(
        `Poll (${convertPropsToPrettyString(args.id)}) invalid or not found.`
      );
    }

    return item;
  })
);
