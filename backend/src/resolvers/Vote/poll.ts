import { resolveById } from "../../functions/resolveById";
import { resolver } from "../../functions/resolver";
import { PollFields } from "../../typeDefs/types/Poll";
import { VoteFields } from "../../typeDefs/types/Vote";

export const poll = resolver<VoteFields, PollFields>(
  resolver(async (source, args, ctx) => {
    const item = await resolveById({
      findById: ctx.loaders.Poll.findById,
      id: {
        pollId: source.pollId,
      },
    });

    return item!;
  })
);
