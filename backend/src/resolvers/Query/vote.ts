import { UserInputError } from "apollo-server-core";
import { resolveById } from "../../functions/resolveById";
import { resolver } from "../../functions/resolver";
import { validation } from "../../functions/validation";
import { VoteFields } from "../../typeDefs/types/Vote";
import { QueryFields } from "../../typeDefs/types/Query";
import { VoteArgs, voteArgs } from "../../validations/Query/vote";
import { convertPropsToPrettyString } from "../../functions/convertPropsToPrettyString";

export const vote = resolver<QueryFields, VoteFields, VoteArgs>(
  validation(voteArgs),
  resolver(async (source, args, ctx) => {
    const item = await resolveById({
      findById: ctx.loaders.Vote.findById,
      id: args.id,
    });

    if (!item) {
      throw new UserInputError(
        `Vote (${convertPropsToPrettyString(args.id)}) invalid or not found.`
      );
    }

    return item;
  })
);
