import DataLoader from "dataloader";
import { createLoaderCount } from "../../functions/createLoaderCount";
import { Poll } from "../../models/Poll";
import { database } from "../../utils/database";
import { PollsArgs } from "../../validations/Query/polls";

export const createLoaderPollCount = () =>
  new DataLoader<Pick<PollsArgs, "filter">, number>(async (allArgs) =>
    createLoaderCount({
      Model: Poll,
      database,
      allArgs,
    })
  );
