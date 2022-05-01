import { UserInputError } from "apollo-server-core";
import { resolveById } from "../../functions/resolveById";
import { resolver } from "../../functions/resolver";
import { validation } from "../../functions/validation";
import { OptionFields } from "../../typeDefs/types/Option";
import { QueryFields } from "../../typeDefs/types/Query";
import { OptionArgs, optionArgs } from "../../validations/Query/option";
import { convertPropsToPrettyString } from "../../functions/convertPropsToPrettyString";

export const option = resolver<QueryFields, OptionFields, OptionArgs>(
  validation(optionArgs),
  resolver(async (source, args, ctx) => {
    const item = await resolveById({
      findById: ctx.loaders.Option.findById,
      id: args.id,
    });

    if (!item) {
      throw new UserInputError(
        `Option (${convertPropsToPrettyString(args.id)}) invalid or not found.`
      );
    }

    return item;
  })
);
