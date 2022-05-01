import { resolveAll } from "../../functions/resolveAll";
import { resolver } from "../../functions/resolver";
import { validation } from "../../functions/validation";
import { optionsArgs, OptionsArgs } from "../../validations/Query/options";
import { PollFields } from "../../typeDefs/types/Poll";
import { OptionFields } from "../../typeDefs/types/Option";

export const options = resolver<PollFields, OptionFields[], OptionsArgs>(
  validation(optionsArgs),
  resolver(async (source, args, ctx) =>
    resolveAll({
      find: ctx.loaders.Option.find,
      args,
      overrides: {
        filter: {
          equals: {
            pollId: source.pollId,
          },
        },
      },
    })
  )
);
