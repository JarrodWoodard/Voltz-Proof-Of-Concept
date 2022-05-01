import { Knex } from "knex";
import { Poll } from "../models/Poll";
import { Vote } from "../models/Vote";
import { database } from "../utils/database";
import { fetchCurrentBlockQuote } from "./fetchCurrentBlockQuote";
import { updateVoteBalance } from "./updateVoteBalance";

export const checkExpiration = async () => {
  console.info("CHECKING EXPIRATIONS");

  const now = new Date();

  const blockquote = await fetchCurrentBlockQuote();

  console.info(
    `MAX EXPIRATION_DATE=${now.toISOString()}\nMAX BLOCK_QUOTE=${blockquote}`
  );

  await database.transaction(async (database) => {
    const polls = await database
      .from("polls")
      .where({
        expired: false,
      })
      .andWhere((builder) => {
        builder.where("expirationBlockQuote", "<=", blockquote);
        builder.orWhere("expirationDate", "<=", now);
      })
      .update({
        expired: true,
      })
      .returning(["pollId"]);

    const votes = await Vote.find({
      database,
      filter: {
        $in: {
          pollId: polls.map((poll: Record<string, any>) => poll.pollId),
        },
      },
    });

    for (const vote of votes) {
      await updateVoteBalance(database, vote);
    }
  });
};
