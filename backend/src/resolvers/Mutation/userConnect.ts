import { UserInputError } from "apollo-server-core";
import { resolver } from "../../functions/resolver";
import { validation } from "../../functions/validation";
import { verifyAddressFromPublicKey } from "../../functions/verifyAddressFromPublicKey";
import { User } from "../../models/User";
import { MutationFields } from "../../typeDefs/types/Mutation";
import { UserFields } from "../../typeDefs/types/User";
import { database } from "../../utils/database";
import {
  userConnectArgs,
  UserConnectArgs,
} from "../../validations/Mutation/userConnect";

export const userConnect = resolver<
  MutationFields,
  UserFields,
  UserConnectArgs
>(
  validation(userConnectArgs),
  resolver(async (source, args) => {
    const {
      input: { ...input },
    } = args;

    const verified = await verifyAddressFromPublicKey(
      input.address,
      input.publicKey
    );
    if (!verified) {
      throw new UserInputError(
        `Failed to verify public key "${input.publicKey}" for address "${input.address}"`
      );
    }

    const alreadyExists = await User.findById({
      database,
      id: {
        address: input.address,
      },
    });
    if (alreadyExists) {
      return alreadyExists;
    }

    const user = await User.insertOne({
      database,
      item: {
        address: input.address,
        publicKey: input.publicKey,
      },
    });

    return user;
  })
);
