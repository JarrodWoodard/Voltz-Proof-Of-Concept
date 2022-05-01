import DataLoader from "dataloader";
import { createLoaderCount } from "../../functions/createLoaderCount";
import { Option } from "../../models/Option";
import { database } from "../../utils/database";
import { OptionsArgs } from "../../validations/Query/options";

export const createLoaderOptionCount = () =>
  new DataLoader<Pick<OptionsArgs, "filter">, number>(async (allArgs) =>
    createLoaderCount({
      Model: Option,
      database,
      allArgs,
    })
  );
