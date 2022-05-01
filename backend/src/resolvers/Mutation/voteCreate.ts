import { UserInputError } from "apollo-server-core";
import { convertPropsToPrettyString } from "../../functions/convertPropsToPrettyString";
import { decodePayload } from "../../functions/decodePayload";
import { resolver } from "../../functions/resolver";
import { validation } from "../../functions/validation";
import { verifyPayload } from "../../functions/verifyPayload";
import { Option } from "../../models/Option";
import { Poll } from "../../models/Poll";
import { User } from "../../models/User";
import { Vote, VoteProps } from "../../models/Vote";
import { MutationFields } from "../../typeDefs/types/Mutation";
import { VoteFields } from "../../typeDefs/types/Vote";
import { database } from "../../utils/database";
import { tezos } from "../../utils/tezos";
import {
  voteCreateArgs,
  VoteCreateArgs,
} from "../../validations/Mutation/voteCreate";
import { BigNumber } from "bignumber.js";
import { fetchCurrentBlockQuote } from "../../functions/fetchCurrentBlockQuote";

export const voteCreate = resolver<MutationFields, VoteFields, VoteCreateArgs>(
  validation(voteCreateArgs),
  resolver(async (source, args) => {
    const {
      input: { ...input },
    } = args;

    const pollExists = await Poll.findById({
      database,
      id: {
        pollId: input.pollId,
      },
    });
    if (!pollExists) {
      throw new UserInputError(
        `Poll (${convertPropsToPrettyString({
          pollId: input.pollId,
        })}) invalid or not found.`
      );
    }

    if (pollExists.expired) {
      throw new UserInputError(
        `Poll (${convertPropsToPrettyString({
          pollId: input.pollId,
        })}) already expired.`
      );
    }

    if (pollExists.expirationDate) {
      if (new Date().getTime() >= pollExists.expirationDate.getTime()) {
        throw new UserInputError(
          `Poll (${convertPropsToPrettyString({
            pollId: input.pollId,
          })}) already expired.`
        );
      }
    }

    if (pollExists.expirationBlockQuote) {
      const currentBlockQuote = await fetchCurrentBlockQuote();

      if (currentBlockQuote >= pollExists.expirationBlockQuote) {
        throw new UserInputError(
          `Poll (${convertPropsToPrettyString({
            pollId: input.pollId,
          })}) already expired.`
        );
      }
    }

    const optionExists = await Option.findOne({
      database,
      filter: {
        $eq: {
          pollId: input.pollId,
          optionId: input.optionId,
        },
      },
    });
    if (!optionExists) {
      throw new UserInputError(
        `Option (${convertPropsToPrettyString({
          pollId: input.pollId,
          optionId: input.optionId,
        })}) invalid or not found.`
      );
    }

    const voteAlreadyCast = await Vote.findOne({
      database,
      filter: {
        $eq: {
          pollId: input.pollId,
          voterAddress: input.voterAddress,
        },
      },
    });
    if (voteAlreadyCast) {
      throw new UserInputError(
        `Vote (${convertPropsToPrettyString({
          pollId: input.pollId,
          voterAddress: input.voterAddress,
        })}) already cast.`
      );
    }

    const user = await User.findById({
      database,
      id: {
        address: input.voterAddress,
      },
    });
    if (!user) {
      throw new Error(
        `User address "${input.voterAddress}" invalid or not found.`
      );
    }

    const userBalanceMutez = await tezos.tz.getBalance(user.address);

    const userBalance = userBalanceMutez.dividedBy(1_000_000);

    if (pollExists.minimalBalanceRequiredToVote > 0) {
      const minimal = new BigNumber(pollExists.minimalBalanceRequiredToVote);

      if (userBalance.isLessThan(minimal)) {
        throw new UserInputError(
          `Minimal user balance "${minimal.toString()}" required to cast a vote, recieved user balance "${userBalance.toString()}"`
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
        voteId: input.voteId,
        pollId: input.pollId,
        optionId: input.optionId,
        voterAddress: input.voterAddress,
      }) !==
      JSON.stringify({
        voteId: data.voteId,
        pollId: data.pollId,
        optionId: data.optionId,
        voterAddress: data.voterAddress,
      })
    ) {
      throw new UserInputError(`Failed to validate payload data.`);
    }

    let vote: VoteProps;

    await database.transaction(async (database) => {
      vote = await Vote.insertOne({
        database,
        item: {
          voteId: input.voteId,
          pollId: input.pollId,
          optionId: input.optionId,
          voterAddress: input.voterAddress,
          payload: input.payload,
          signature: input.signature,
          voterBalance: userBalance.toNumber(),
        },
      });
    });

    return vote!;
  })
);
