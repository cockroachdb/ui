import React from "react";

import { ExpandableText } from "@cockroachlabs/ui-components";

const divWidth = "200px";
const fourLinetext =
  "Very very very very very very very very very very very very very very very very very very very long text.";

export default {
  title: "ExpandableText",
};

export const Default = () => (
  <div style={{ width: divWidth }}>
    <ExpandableText text={fourLinetext} maxLine={4} />
  </div>
);

export const _2Lines = () => (
  <div style={{ width: divWidth }}>
    <ExpandableText text={fourLinetext} maxLine={2} />
  </div>
);

_2Lines.story = {
  name: "2 lines",
};

export const TextDoesNotExceedLines = () => (
  <div style={{ width: divWidth }}>
    <ExpandableText text={fourLinetext} maxLine={5} />
  </div>
);

TextDoesNotExceedLines.story = {
  name: "Text does not exceed lines",
};
