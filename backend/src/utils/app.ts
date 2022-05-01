import { exception, notFound } from "@ev-fns/errors";
import { Apollo } from "@ev-graphql-2/create-apollo/lib/types/Apollo";
import cors from "cors";
import { json } from "body-parser";
import express from "express";
import morgan from "morgan";

export interface MiddlewaresProps {
  app: express.Express;
  apollo: Apollo;
}

export const app = express();

export const middlewares = async ({ app, apollo }: MiddlewaresProps) => {
  app.use(cors());
  app.use(json());
  app.use(morgan("combined"));
  if (process.env.NODE_ENV !== "production") {
    app.get("/", (req, res) => res.redirect("/graphql"));
  }
  app.use(apollo.middleware());
  app.use(notFound);
  app.use(exception);
};
