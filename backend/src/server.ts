import { dotenv } from "@ev-fns/dotenv";

dotenv();

import { allowNullables } from "./utils/joi";

allowNullables();

import server from "@ev-fns/server";
import { apollo } from "./utils/apollo";
import { app, middlewares } from "./utils/app";
import { database } from "./utils/database";
import ms from "ms";
import { checkExpiration } from "./functions/checkExpiration";
import { updatesVotesBalance } from "./functions/updateVotesBalance";

const PORT = +process.env.PORT || 3000;

server({
  app,
  port: PORT,
  before: async () => {
    await database.raw('select 1 as "serverStatus"');

    if (process.env.MIGRATIONS_ENABLED) {
      await database.migrate.latest();
    }

    await apollo.start();

    await middlewares({ app, apollo });

    if (+process.env.RUN_INTERVALS_IMMEDIATELY) {
      await checkExpiration();
      await updatesVotesBalance();
    }

    setInterval(async () => {
      await checkExpiration();
    }, ms("1m"));

    setInterval(async () => {
      await updatesVotesBalance();
    }, ms("1h"));
  },
  after: async () => {
    console.info(`🚀 http://localhost:${PORT}`);
  },
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
