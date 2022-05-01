import { UserInputError } from "apollo-server-core";
import { decodePayload } from "../../functions/decodePayload";
import { fetchCurrentBlockQuote } from "../../functions/fetchCurrentBlockQuote";
import { resolver } from "../../functions/resolver";
import { validation } from "../../functions/validation";
import { verifyPayload } from "../../functions/verifyPayload";
import { Option } from "../../models/Option";
import { Poll, PollProps } from "../../models/Poll";
import { User } from "../../models/User";
import { MutationFields } from "../../typeDefs/types/Mutation";
import { PollFields } from "../../typeDefs/types/Poll";
import { database } from "../../utils/database";
import {
  pollCreateArgs,
  PollCreateArgs,
} from "../../validations/Mutation/pollCreate";

export const pollCreate = resolver<MutationFields, PollFields, PollCreateArgs>(
  validation(pollCreateArgs),
  resolver(async (source, args) => {
    const {
      input: { options, ...input },
    } = args;

    const user = await User.findById({
      database,
      id: {
        address: input.creatorAddress,
      },
    });
    if (!user) {
      throw new Error(
        `User address "${input.creatorAddress}" invalid or not found.`
      );
    }

    if (input.expirationDate) {
      const isDateValid = input.expirationDate.getTime() > new Date().getTime();

      if (!isDateValid) {
        throw new UserInputError(
          `Expiration date invalid, it should be greater than current time.`
        );
      }
    }

    if (input.expirationBlockQuote) {
      const currentBlockQuote = await fetchCurrentBlockQuote();

      const isBlockQuoteValid = input.expirationBlockQuote > currentBlockQuote;

      if (!isBlockQuoteValid) {
        throw new UserInputError(
          `Expiration blockquote (${input.expirationBlockQuote}) invalid, it should be greater than current blockquote (${currentBlockQuote}).`
        );
      }
    }

    const verified = verifyPayload(
      input.payload,
      user.publicKey,
      input.signature
    );

    if (!verified) {
      throw new UserInputError(`Failed to verify payload signature.`);
    }

    const decoded = decodePayload(input.payload);

    let data: Record<string, any>;

    try {
      data = JSON.parse(decoded);
    } catch {
      throw new UserInputError(`Failed to parse payload data.`);
    }

    if (
      JSON.stringify({
        pollId: input.pollId,
        title: input.title,
        description: input.description,
        creatorAddress: input.creatorAddress,
        minimalBalanceRequiredToVote: input.minimalBalanceRequiredToVote,
        expirationDate: input.expirationDate,
        expirationBlockQuote: input.expirationBlockQuote,
        pollType: input.pollType,
        options: [...options].sort((a, b) =>
          a.optionId > b.optionId ? 1 : -1
        ),
      }) !==
      JSON.stringify({
        pollId: data.pollId,
        title: data.title,
        description: data.description,
        creatorAddress: data.creatorAddress,
        minimalBalanceRequiredToVote: data.minimalBalanceRequiredToVote,
        expirationDate: data.expirationDate,
        expirationBlockQuote: data.expirationBlockQuote,
        pollType: data.pollType,
        options: [...data.options].sort((a, b) =>
          a.optionId > b.optionId ? 1 : -1
        ),
      })
    ) {
      throw new UserInputError(`Failed to validate payload data.`);
    }

    let poll: PollProps;

    await database.transaction(async (database) => {
      poll = await Poll.insertOne({
        database,
        item: {
          ...input,
          expired: false,
        },
      });

      await Option.insert({
        database,
        items: options.map((option) => ({
          ...option,
          pollId: input.pollId,
        })),
      });
    });

    return poll!;
  })
);
