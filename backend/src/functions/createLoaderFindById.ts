import { ModelProps } from "@ev-postgres/model-2/lib/types/Model";
import { SortableFilterProps } from "@ev-postgres/model-2/lib/types/SortableFilterProps";
import { Knex } from "knex";

export interface CreateLoaderFindByIdProps<Props, PropsPrimary> {
  Model: ModelProps<Props, PropsPrimary>;
  database: Knex;
  ids: readonly PropsPrimary[];
  filter: SortableFilterProps<Props>;
  serialize: (item: Props | PropsPrimary) => string;
}

export const createLoaderFindById = async <Props, PropsPrimary>({
  Model,
  database,
  ids,
  filter,
  serialize,
}: CreateLoaderFindByIdProps<Props, PropsPrimary>): Promise<
  (Props | null)[]
> => {
  const rows = await Model.find({
    database,
    filter,
  });

  const items = new Map<string, Props>();

  for (const row of rows) {
    items.set(serialize(row), row);
  }

  return ids.map((id) => items.get(serialize(id)) || null);
};
