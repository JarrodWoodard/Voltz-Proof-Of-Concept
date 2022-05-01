import { IResolvers } from "@graphql-tools/utils";
import fs from "fs";
import path from "path";

const resolvers: IResolvers[] = [];

const resolversDir = path.join(__dirname, "..", "resolvers");

const resolversFolders = fs.readdirSync(resolversDir);

for (const folder of resolversFolders) {
  const currentItem = path.join(resolversDir, folder);

  const type = path.parse(currentItem).name;

  const stat = fs.statSync(currentItem);

  if (stat.isDirectory()) {
    const files = fs.readdirSync(currentItem);

    for (const file of files) {
      const currentFile = path.join(currentItem, file);

      const field = path.parse(file).name;

      const module = require(currentFile);

      for (const key of Object.keys(module)) {
        resolvers.push({ [type]: { [field]: module[key] } });
      }
    }
  } else {
    const module = require(currentItem);

    for (const key of Object.keys(module)) {
      resolvers.push({ [type]: module[key] });
    }
  }
}

export { resolvers };
