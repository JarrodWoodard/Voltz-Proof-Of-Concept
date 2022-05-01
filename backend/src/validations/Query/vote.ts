import Joi from "joi";
import { createSchemaFromArgs } from "../../functions/createSchemaFromArgs";
import { VoteID } from "../../typeDefs/inputs/VoteID";

export interface VoteArgs {
  id: VoteID;
}

export const voteArgs = createSchemaFromArgs<VoteArgs>({
  id: createSchemaFromArgs<VoteArgs["id"]>({
    voteId: Joi.string(),
  }),
});
