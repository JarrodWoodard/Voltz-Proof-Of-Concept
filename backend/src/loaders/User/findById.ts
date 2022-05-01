import DataLoader from "dataloader";
import { createLoaderFindById } from "../../functions/createLoaderFindById";
import { User, UserProps, UserPropsPrimary } from "../../models/User";
import { database } from "../../utils/database";

export const createLoaderUserFindById = () =>
  new DataLoader<UserPropsPrimary, UserProps | null>(async (ids) =>
    createLoaderFindById({
      Model: User,
      database,
      ids,
      filter: {
        $in: {
          address: [...new Set(ids.map((id) => id.address))],
        },
      },
      serialize: ({ address }) => `${address}`,
    })
  );
