import { resolver } from "../../functions/resolver";
import { PollResultsFields } from "../../typeDefs/types/PollResults";
import { PollFields } from "../../typeDefs/types/Poll";
import { database } from "../../utils/database";

export const results = resolver<PollFields, PollResultsFields>(
  resolver(async (source, args, ctx) => {
    const agg = await database.raw(
      `
      select count(*) as "voteCount",
             sum(x."voterBalance") as "voteBalance"
        from "votes" as x
       where x."pollId" = :pollId
    `,
      {
        pollId: source.pollId,
      }
    );

    const voteCount = (agg.rows[0].voteCount || 0) as number;

    const voteBalance = (agg.rows[0].voteBalance || 0) as number;

    const query = await database.raw(
      `
      with "__votes__options" as (
        select x."pollId",
               x."optionId",
               count(*) as "voteCount",
               sum(x."voterBalance") as "voteBalance"
          from "votes" as x
         group by x."pollId", x."optionId"
      )
      select x."optionId",
             coalesce(y."voteCount", 0) as "voteCount",
             coalesce(y."voteBalance", 0.00000000000) as "voteBalance"
        from "options" as x
        left join "__votes__options" as y on y."pollId" = x."pollId" and x."optionId" = y."optionId"
       where x."pollId" = :pollId
    `,
      {
        pollId: source.pollId,
      }
    );

    const voteResults = query.rows;

    return {
      voteCount,
      voteBalance,
      voteResults,
    };
  })
);
