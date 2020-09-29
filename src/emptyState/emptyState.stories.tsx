import React from "react";
import { storiesOf } from "@storybook/react";

import { EmptyState } from "./emptyState";
import emptyListResultsImg from "../assets/emptyState/empty-list-results.svg";
import notFoundImg from "../assets/emptyState/not-found-404.svg";
import { Button } from "src";

storiesOf("EmptyState", module)
  .add("default", () => <EmptyState />)
  .add("with icon", () => <EmptyState icon={emptyListResultsImg} />)
  .add("with message", () => (
    <EmptyState
      icon={emptyListResultsImg}
      message={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
    />
  ))
  .add("with button", () => (
    <EmptyState
      icon={emptyListResultsImg}
      message={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
      footer={<Button type="primary">Activate</Button>}
    />
  ))
  .add("no backup found", () => (
    <EmptyState
      icon={notFoundImg}
      title="No backup found"
      message="The backup you’re looking for does not exist."
    />
  ));
