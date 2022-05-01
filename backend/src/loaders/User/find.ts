import DataLoader from "dataloader";
import { createLoaderFind } from "../../functions/createLoaderFind";
import { User, UserProps } from "../../models/User";
import { database } from "../../utils/database";
import { UsersArgs } from "../../validations/Query/users";

export const createLoaderUserFind = () =>
  new DataLoader<UsersArgs, UserProps[]>(async (allArgs) =>
    createLoaderFind({
      Model: User,
      database,
      allArgs,
    })
  );
