import { resolveById } from "../../functions/resolveById";
import { resolver } from "../../functions/resolver";
import { PollFields } from "../../typeDefs/types/Poll";
import { OptionFields } from "../../typeDefs/types/Option";

export const poll = resolver<OptionFields, PollFields>(
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
