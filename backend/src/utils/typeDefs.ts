import fs from "fs";
import { DocumentNode } from "graphql";
import path from "path";

const typeDefs: DocumentNode[] = [];

const typeDefsDir = path.join(__dirname, "..", "typeDefs");

const typeDefsFolders = fs.readdirSync(typeDefsDir);

for (const folder of typeDefsFolders) {
  const currentDir = path.join(typeDefsDir, folder);

  const files = fs.readdirSync(currentDir);

  for (const file of files) {
    const currentFile = path.join(currentDir, file);

    const module = require(currentFile);

    for (const key of Object.keys(module)) {
      typeDefs.push(module[key]);
    }
  }
}

export { typeDefs };
