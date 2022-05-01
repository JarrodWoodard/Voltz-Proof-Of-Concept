import { createModel } from "@ev-postgres/model-2";

export interface OptionProps {
  optionId: string;
  pollId: string;
  description: string;
}

export interface OptionPropsPrimary {
  optionId: string;
}

export const Option = createModel<OptionProps, OptionPropsPrimary>({
  source: (database) => database.from("options"),
  strip: ({ optionId }) => ({ optionId }),
});
