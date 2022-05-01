import { database } from "../utils/database";
import { updateVoteBalance } from "./updateVoteBalance";

export const updatesVotesBalance = async () => {
  console.info("UPDATE VOTES BALANCE");

  const votes = await database
    .from("votes as x")
    .innerJoin("polls as y", "y.pollId", "x.pollId")
    .where("y.expired", "=", "false")
    .select("x.*");

  await database.transaction(async (database) => {
    for (const vote of votes) {
      await updateVoteBalance(database, vote);
    }
  });
};
