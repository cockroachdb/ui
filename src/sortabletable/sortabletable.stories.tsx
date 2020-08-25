import React from "react";
import { storiesOf } from "@storybook/react";

import { SortableTable } from "./";

storiesOf("Sortable table", module)
  .add("Empty state", () => <SortableTable empty />)
  .add("With data", () => {
    const columns = [
      {
        name: "Col 1",
        title: "Col 1",
        cell: (idx: number) => `row-${idx} col-1`,
      },
      {
        name: "Col 2",
        title: "Col 2",
        cell: (idx: number) => `row-${idx} col-2`,
      },
      {
        name: "Col 3",
        title: "Col 3",
        cell: (idx: number) => `row-${idx} col-3`,
      },
    ];
    return <SortableTable columns={columns} count={3} />;
  });
