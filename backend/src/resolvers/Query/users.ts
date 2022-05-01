import { resolveWithPagination } from "../../functions/resolveWithPagination";
import { resolver } from "../../functions/resolver";
import { validation } from "../../functions/validation";
import { UserWithPaginationFields } from "../../typeDefs/types/UserWithPagination";
import { QueryFields } from "../../typeDefs/types/Query";
import { usersArgs, UsersArgs } from "../../validations/Query/users";

export const users = resolver<QueryFields, UserWithPaginationFields, UsersArgs>(
  validation(usersArgs),
  resolver(async (source, args, ctx) =>
    resolveWithPagination({
      count: ctx.loaders.User.count,
      find: ctx.loaders.User.find,
      args,
    })
  )
);
