import { createModel } from "@ev-postgres/model-2";

export interface VoteProps {
  voteId: string;
  pollId: string;
  optionId: string;
  voterAddress: string;
  voterBalance: number;
  payload: string;
  signature: string;
}

export interface VotePropsPrimary {
  voteId: string;
}

export const Vote = createModel<VoteProps, VotePropsPrimary>({
  source: (database) => database.from("votes"),
  strip: ({ voteId }) => ({ voteId }),
});
