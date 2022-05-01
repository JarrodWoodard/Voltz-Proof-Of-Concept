import { resolveById } from "../../functions/resolveById";
import { resolver } from "../../functions/resolver";
import { UserFields } from "../../typeDefs/types/User";
import { VoteFields } from "../../typeDefs/types/Vote";

export const voter = resolver<VoteFields, UserFields>(
  resolver(async (source, args, ctx) => {
    const item = await resolveById({
      findById: ctx.loaders.User.findById,
      id: {
        address: source.voterAddress,
      },
    });

    return item!;
  })
);
