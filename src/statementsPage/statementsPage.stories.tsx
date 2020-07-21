import React from "react";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { StatementsPage } from "./statementsPage";
import statementsPagePropsFixture from "./statementsPage.fixture";

storiesOf("StatementsPage", module)
  .addDecorator(storyFn => <MemoryRouter>{storyFn()}</MemoryRouter>)
  .addDecorator(storyFn => (
    <div style={{ backgroundColor: "#F5F7FA" }}>{storyFn()}</div>
  ))
  .add("with data", () => <StatementsPage {...statementsPagePropsFixture} />);
