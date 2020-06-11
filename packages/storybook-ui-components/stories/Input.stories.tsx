import React, { useState } from "react";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { NumberInput, TextInput } from "@cockroachlabs/ui-components";
import { Search } from "@cockroachlabs/icons";

export default {
  title: "Input",
  components: [NumberInput, TextInput],
  decorators: [withKnobs],
};

export const Number = () => {
  const [value, setValue] = useState<number | undefined>();
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
  const [value, setValue] = useState<string | undefined>();
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

export const SearchInput = () => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <TextInput
      value={value}
      disabled={boolean("disabled", false)}
      onChange={setValue}
      invalid={boolean("invalid", false)}
      placeholder={text("Placeholder", "Search...")}
      prefixIcon={<Search />}
    />
  );
};

export const NumberInputWithIcon = () => {
  const [value, setValue] = useState<number | undefined>();
  return (
    <NumberInput
      value={value}
      disabled={boolean("disabled", false)}
      onChange={setValue}
      invalid={boolean("invalid", false)}
      placeholder={text("Placeholder", "Counter...")}
      prefixIcon={<Search />}
    />
  );
};
