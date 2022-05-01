import { resolveById } from "../../functions/resolveById";
import { resolver } from "../../functions/resolver";
import { UserFields } from "../../typeDefs/types/User";
import { PollFields } from "../../typeDefs/types/Poll";

export const creator = resolver<PollFields, UserFields>(
  resolver(async (source, args, ctx) => {
    const item = await resolveById({
      findById: ctx.loaders.User.findById,
      id: {
        address: source.creatorAddress,
      },
    });

    return item!;
  })
);
