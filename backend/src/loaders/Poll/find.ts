import DataLoader from "dataloader";
import { createLoaderFind } from "../../functions/createLoaderFind";
import { Poll, PollProps } from "../../models/Poll";
import { database } from "../../utils/database";
import { PollsArgs } from "../../validations/Query/polls";

export const createLoaderPollFind = () =>
  new DataLoader<PollsArgs, PollProps[]>(async (allArgs) =>
    createLoaderFind({
      Model: Poll,
      database,
      allArgs,
    })
  );
