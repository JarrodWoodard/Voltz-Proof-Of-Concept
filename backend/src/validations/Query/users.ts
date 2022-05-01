import Joi from "joi";
import {
  createWithPaginationArgs,
  WithPaginationArgs,
} from "../../functions/withPagination";
import { UserFilter } from "../../typeDefs/inputs/UserFilter";

export type UsersArgs = WithPaginationArgs<UserFilter>;

export const usersArgs = createWithPaginationArgs<UsersArgs>({
  address: Joi.string(),
  publicKey: Joi.string(),
});
