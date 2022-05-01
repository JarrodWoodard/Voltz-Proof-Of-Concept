import DataLoader from "dataloader";
import { createLoaderFindById } from "../../functions/createLoaderFindById";
import { Poll, PollProps, PollPropsPrimary } from "../../models/Poll";
import { database } from "../../utils/database";

export const createLoaderPollFindById = () =>
  new DataLoader<PollPropsPrimary, PollProps | null>(async (ids) =>
    createLoaderFindById({
      Model: Poll,
      database,
      ids,
      filter: {
        $in: {
          pollId: [...new Set(ids.map((id) => id.pollId))],
        },
      },
      serialize: ({ pollId }) => `${pollId}`,
    })
  );
