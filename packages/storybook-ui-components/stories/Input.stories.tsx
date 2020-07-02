import React, { useState } from "react";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { NumberInput, TextInput } from "@cockroachlabs/ui-components";
import { Search } from "@cockroachlabs/icons";

import { StoryContainer, StoryDescription } from "../layout";

export default {
  title: "Input",
  components: [NumberInput, TextInput],
  decorators: [withKnobs],
};

export const Number = () => {
  const [value, setValue] = useState<number | undefined>();
  return (
    <StoryContainer>
      <h1>Number Input</h1>

      <StoryDescription>
        Number fields can be used for inputs that require a numerical value.
        Optional number controls let users increase or decrease the value of the
        input (use based on what you think will help the user).
      </StoryDescription>

      <NumberInput
        initialValue={number("Initial value", 0)}
        value={value}
        disabled={boolean("disabled", false)}
        onChange={setValue}
        invalid={boolean("invalid", false)}
      />
    </StoryContainer>
  );
};

export const Text = () => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <StoryContainer>
      <h1>Text Input</h1>

      <StoryDescription>
        Use text fields in forms to help people enter, select, and search for
        text. Text fields are normally found within a form but can also be part
        of a modal, search, or card. Common text input types include: usernames,
        descriptions, emails, addresses, and plain text searches.
      </StoryDescription>

      <TextInput
        initialValue={text("Initial value", "some text")}
        value={value}
        disabled={boolean("disabled", false)}
        onChange={setValue}
        invalid={boolean("invalid", false)}
      />
    </StoryContainer>
  );
};

export const SearchInput = () => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <StoryContainer>
      <h1>Text Input With Icon</h1>

      <StoryDescription>
        Use an optional icon within the text input.
      </StoryDescription>

      <TextInput
        value={value}
        disabled={boolean("disabled", false)}
        onChange={setValue}
        invalid={boolean("invalid", false)}
        placeholder={text("Placeholder", "Search...")}
        prefixIcon={<Search />}
      />
    </StoryContainer>
  );
};

export const NumberInputWithIcon = () => {
  const [value, setValue] = useState<number | undefined>();
  return (
    <StoryContainer>
      <h1>Number Input With Icon</h1>

      <StoryDescription>
        Use an optional icon within the number input.
      </StoryDescription>

      <NumberInput
        value={value}
        disabled={boolean("disabled", false)}
        onChange={setValue}
        invalid={boolean("invalid", false)}
        placeholder={text("Placeholder", "Counter...")}
        prefixIcon={<Search />}
      />
    </StoryContainer>
  );
};
