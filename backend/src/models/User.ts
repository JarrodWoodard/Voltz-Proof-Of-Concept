import { createModel } from "@ev-postgres/model-2";

export interface UserProps {
  address: string;
  publicKey: string;
}

export interface UserPropsPrimary {
  address: string;
}

export const User = createModel<UserProps, UserPropsPrimary>({
  source: (database) => database.from("users"),
  strip: ({ address }) => ({ address }),
});
