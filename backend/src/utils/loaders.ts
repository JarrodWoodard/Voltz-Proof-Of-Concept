import { createLoaderOptionCount } from "../loaders/Option/count";
import { createLoaderOptionFind } from "../loaders/Option/find";
import { createLoaderOptionFindById } from "../loaders/Option/findById";
import { createLoaderPollCount } from "../loaders/Poll/count";
import { createLoaderPollFind } from "../loaders/Poll/find";
import { createLoaderPollFindById } from "../loaders/Poll/findById";
import { createLoaderUserCount } from "../loaders/User/count";
import { createLoaderUserFind } from "../loaders/User/find";
import { createLoaderUserFindById } from "../loaders/User/findById";
import { createLoaderVoteCount } from "../loaders/Vote/count";
import { createLoaderVoteFind } from "../loaders/Vote/find";
import { createLoaderVoteFindById } from "../loaders/Vote/findById";

export const createLoaders = () => ({
  Option: {
    count: createLoaderOptionCount(),
    find: createLoaderOptionFind(),
    findById: createLoaderOptionFindById(),
  },
  Poll: {
    count: createLoaderPollCount(),
    find: createLoaderPollFind(),
    findById: createLoaderPollFindById(),
  },
  User: {
    count: createLoaderUserCount(),
    find: createLoaderUserFind(),
    findById: createLoaderUserFindById(),
  },
  Vote: {
    count: createLoaderVoteCount(),
    find: createLoaderVoteFind(),
    findById: createLoaderVoteFindById(),
  },
});

export type CreateLoaders = typeof createLoaders;

export type Loaders = ReturnType<CreateLoaders>;
