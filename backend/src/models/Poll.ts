import { createModel } from "@ev-postgres/model-2";
import { PollType } from "../@types/PollType";

export interface PollProps {
  pollId: string;
  title: string;
  description: string;
  creatorAddress: string;
  payload: string;
  signature: string;
  minimalBalanceRequiredToVote: number;
  expired: boolean;
  expirationDate?: Date;
  expirationBlockQuote?: number;
  pollType: PollType;
}

export interface PollPropsPrimary {
  pollId: string;
}

export const Poll = createModel<PollProps, PollPropsPrimary>({
  source: (database) => database.from("polls"),
  strip: ({ pollId }) => ({ pollId }),
});
