import { UserInputError } from "apollo-server-core";
import { resolveById } from "../../functions/resolveById";
import { resolver } from "../../functions/resolver";
import { validation } from "../../functions/validation";
import { UserFields } from "../../typeDefs/types/User";
import { QueryFields } from "../../typeDefs/types/Query";
import { UserArgs, userArgs } from "../../validations/Query/user";
import { convertPropsToPrettyString } from "../../functions/convertPropsToPrettyString";

export const user = resolver<QueryFields, UserFields, UserArgs>(
  validation(userArgs),
  resolver(async (source, args, ctx) => {
    const item = await resolveById({
      findById: ctx.loaders.User.findById,
      id: args.id,
    });

    if (!item) {
      throw new UserInputError(
        `User (${convertPropsToPrettyString(args.id)}) invalid or not found.`
      );
    }

    return item;
  })
);
