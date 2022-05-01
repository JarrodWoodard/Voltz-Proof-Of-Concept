import DataLoader from "dataloader";
import { createLoaderCount } from "../../functions/createLoaderCount";
import { Vote } from "../../models/Vote";
import { database } from "../../utils/database";
import { VotesArgs } from "../../validations/Query/votes";

export const createLoaderVoteCount = () =>
  new DataLoader<Pick<VotesArgs, "filter">, number>(async (allArgs) =>
    createLoaderCount({
      Model: Vote,
      database,
      allArgs,
    })
  );
