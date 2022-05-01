import { Knex } from "knex";
import { Vote } from "../models/Vote";
import { VoteProps } from "../models/Vote";
import { getTezosBalance } from "./getTezosBalance";

export const updateVoteBalance = async (database: Knex, vote: VoteProps) => {
  const balance = await getTezosBalance(vote.voterAddress);

  console.info(
    `${`vote ${vote.voteId}`.padEnd(20)}${`user ${vote.voterAddress}`.padEnd(
      20
    )}${`balance ${balance}`}`
  );

  await Vote.updateOne({
    database,
    id: {
      voteId: vote.voteId,
    },
    values: {
      voterBalance: balance,
    },
  });
};
