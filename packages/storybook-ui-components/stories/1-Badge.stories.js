import React from "react";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { Badge } from "@cockroachlabs/ui-components";

import m from "../utils/selectKnobMirror";

export default {
  title: "Badge",
  components: Badge,
  decorators: [withKnobs],
};

export const Demo = () => (
  <Badge
    content={text("Content Prop", "badge")}
    intent={select(
      "Intent",
      m(["neutral", "success", "warning", "danger"]),
      "neutral",
    )}
    transformCase={select(
      "Transform Case",
      m(["uppercase", "none"], "uppercase"),
    )}
  />
);
