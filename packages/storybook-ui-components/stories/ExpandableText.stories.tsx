import React from "react";
import { storiesOf } from "@storybook/react";

import { ExpandableText } from "@cockroachlabs/ui-components";

const divWidth = "200px";
const fourLinetext =
  "Very very very very very very very very very very very very very very very very very very very long text.";

storiesOf("ExpandableText", module)
  .add("Default", () => (
    <div style={{ width: divWidth }}>
      <ExpandableText text={fourLinetext} />
    </div>
  ))
  .add("2 lines", () => (
    <div style={{ width: divWidth }}>
      <ExpandableText text={fourLinetext} maxLine={2} />
    </div>
  ))
  .add("Text does not exceed lines", () => (
    <div style={{ width: divWidth }}>
      <ExpandableText text={fourLinetext} maxLine={5} />
    </div>
  ));
