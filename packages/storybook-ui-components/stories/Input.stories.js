import React, { useState } from "react";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { NumberInput, TextInput } from "@cockroachlabs/ui-components";

export default {
  title: "Input",
  components: [NumberInput, TextInput],
  decorators: [withKnobs],
};

export const Number = () => {
  const [value, setValue] = useState();
  return (
    <NumberInput
      initialValue={number("Initial value", 0)}
      value={value}
      disabled={boolean("disabled", false)}
      onChange={setValue}
      invalid={boolean("invalid", false)}
    />
  );
};

export const Text = () => {
  const [value, setValue] = useState();
  return (
    <TextInput
      initialValue={text("Initial value", "some text")}
      value={value}
      disabled={boolean("disabled", false)}
      onChange={setValue}
      invalid={boolean("invalid", false)}
    />
  );
};
