import { resolveById } from "../../functions/resolveById";
import { resolver } from "../../functions/resolver";
import { OptionFields } from "../../typeDefs/types/Option";
import { VoteFields } from "../../typeDefs/types/Vote";

export const option = resolver<VoteFields, OptionFields>(
  resolver(async (source, args, ctx) => {
    const item = await resolveById({
      findById: ctx.loaders.Option.findById,
      id: {
        optionId: source.optionId,
      },
    });

    return item!;
  })
);
