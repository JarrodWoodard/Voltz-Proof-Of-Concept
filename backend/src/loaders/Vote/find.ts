import DataLoader from "dataloader";
import { createLoaderFind } from "../../functions/createLoaderFind";
import { Vote, VoteProps } from "../../models/Vote";
import { database } from "../../utils/database";
import { VotesArgs } from "../../validations/Query/votes";

export const createLoaderVoteFind = () =>
  new DataLoader<VotesArgs, VoteProps[]>(async (allArgs) =>
    createLoaderFind({
      Model: Vote,
      database,
      allArgs,
    })
  );
