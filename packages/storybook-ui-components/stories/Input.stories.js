import React, { useState } from "react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { Input } from "@cockroachlabs/ui-components";

export default {
  title: "Input",
  components: Input,
  decorators: [withKnobs],
};

export const Demo = () => {
  const [value, setValue] = useState();
  return (
    <Input
      initialValue={text("Initial value", "Initial text")}
      value={text("value", value)}
      disabled={boolean("disabled", false)}
      onChange={setValue}
      invalid={boolean("invalid", false)}
    />
  );
};
