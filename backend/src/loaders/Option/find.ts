import DataLoader from "dataloader";
import { createLoaderFind } from "../../functions/createLoaderFind";
import { Option, OptionProps } from "../../models/Option";
import { database } from "../../utils/database";
import { OptionsArgs } from "../../validations/Query/options";

export const createLoaderOptionFind = () =>
  new DataLoader<OptionsArgs, OptionProps[]>(async (allArgs) =>
    createLoaderFind({
      Model: Option,
      database,
      allArgs,
    })
  );
