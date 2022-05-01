import DataLoader from "dataloader";
import { createLoaderFindById } from "../../functions/createLoaderFindById";
import { Option, OptionProps, OptionPropsPrimary } from "../../models/Option";
import { database } from "../../utils/database";

export const createLoaderOptionFindById = () =>
  new DataLoader<OptionPropsPrimary, OptionProps | null>(async (ids) =>
    createLoaderFindById({
      Model: Option,
      database,
      ids,
      filter: {
        $in: {
          optionId: [...new Set(ids.map((id) => id.optionId))],
        },
      },
      serialize: ({ optionId }) => `${optionId}`,
    })
  );
