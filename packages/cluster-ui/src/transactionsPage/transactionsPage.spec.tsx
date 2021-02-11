import React from "react";
import { mount } from "enzyme";
import * as stories from "./transactionsPage.stories";

it("renders all Transactions Page Stories", () => {
  mount(<stories.WithData />);
  mount(<stories.WithEmptySearchResult />);
  mount(<stories.WithErrorAlert />);
  mount(<stories.WithLoadingIndicator />);
  mount(<stories.WithoutData />);
});
