import { UserInputError } from "apollo-server-core";
import DataLoader from "dataloader";

export interface ResolveByIdProps<TPropsPrimary, TProps> {
  findById: DataLoader<TPropsPrimary, TProps | null>;
  id: TPropsPrimary;
}

export const resolveById = async <TPropsPrimary, TProps>({
  findById,
  id,
}: ResolveByIdProps<TPropsPrimary, TProps>) => findById.load({ ...id });
