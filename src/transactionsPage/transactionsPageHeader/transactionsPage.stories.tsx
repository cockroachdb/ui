import React from "react";
import { storiesOf } from "@storybook/react";

import { TransactionsPageHeader } from ".";
import { Filters } from "../transactionsPage";

const props = {
  onSubmit: (search: string) => {},
  onSubmitFilters: (filters: Filters) => {},
  onClear: () => {},
  search: "",
  appNames: [{ label: "", value: "" }],
  activeFilters: 0,
  filters: {},
};

storiesOf("Transactions Page", module).add("Header", () => (
  <TransactionsPageHeader {...props} />
));
