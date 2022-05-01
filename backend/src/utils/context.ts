import { ExpressContext } from "apollo-server-express";
import { createLoaders, Loaders } from "./loaders";

export interface Context extends ExpressContext {
  loaders: Loaders;
}

export type ContextFn = (context: ExpressContext) => Context;

export const context: ContextFn = (context) => {
  const loaders = createLoaders();

  return {
    ...context,
    loaders,
  };
};
