import DataLoader from "dataloader";
import { createLoaderFindById } from "../../functions/createLoaderFindById";
import { Vote, VoteProps, VotePropsPrimary } from "../../models/Vote";
import { database } from "../../utils/database";

export const createLoaderVoteFindById = () =>
  new DataLoader<VotePropsPrimary, VoteProps | null>(async (ids) =>
    createLoaderFindById({
      Model: Vote,
      database,
      ids,
      filter: {
        $in: {
          voteId: [...new Set(ids.map((id) => id.voteId))],
        },
      },
      serialize: ({ voteId }) => `${voteId}`,
    })
  );
