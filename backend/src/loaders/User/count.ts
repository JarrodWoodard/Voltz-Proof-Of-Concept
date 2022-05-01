import DataLoader from "dataloader";
import { createLoaderCount } from "../../functions/createLoaderCount";
import { User } from "../../models/User";
import { database } from "../../utils/database";
import { UsersArgs } from "../../validations/Query/users";

export const createLoaderUserCount = () =>
  new DataLoader<Pick<UsersArgs, "filter">, number>(async (allArgs) =>
    createLoaderCount({
      Model: User,
      database,
      allArgs,
    })
  );
