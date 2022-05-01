import { ToArray } from "@ev-postgres/model-2/lib/types/ToArray";

export type Filter<Equals, Includes, Likes> = {
  equals?: Equals;
  includes?: Includes;
  likes?: Likes;
};
