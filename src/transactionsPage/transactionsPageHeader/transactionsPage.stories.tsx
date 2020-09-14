import React from "react";
import { storiesOf } from "@storybook/react";

import { TransactionsPageHeader } from ".";
import { Filters } from "../transactionsPage";

const props = {
  onSubmit: (search: string) => {},
  onSubmitFilters: (filters: Filters) => {},
  onClear: () => {},
  search: "",
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  appNames: [],
  activeFilters: 0,
};

storiesOf("Transactions Page", module).add("Header", () => (
  <TransactionsPageHeader {...props} />
));
