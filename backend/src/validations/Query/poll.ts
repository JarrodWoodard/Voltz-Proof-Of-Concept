import Joi from "joi";
import { createSchemaFromArgs } from "../../functions/createSchemaFromArgs";
import { PollID } from "../../typeDefs/inputs/PollID";

export interface PollArgs {
  id: PollID;
}

export const pollArgs = createSchemaFromArgs<PollArgs>({
  id: createSchemaFromArgs<PollArgs["id"]>({
    pollId: Joi.string(),
  }),
});
