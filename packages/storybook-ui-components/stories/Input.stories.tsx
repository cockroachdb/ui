import React, { useState } from "react";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { NumberInput, TextInput, EmailInput, NewPasswordInput, ExistingPasswordInput, CheckboxInput } from "@cockroachlabs/ui-components";
import { Search } from "@cockroachlabs/icons";

import { StoryContainer, StoryDescription } from "./layout";

export default {
  title: "Input",
  components: [NumberInput, TextInput, EmailInput, NewPasswordInput, ExistingPasswordInput, CheckboxInput],
  decorators: [withKnobs],
};

export const Number = () => {
  const [value] = useState<number | undefined>();
  return (
    <StoryContainer>
      <h1>Number Input</h1>

      <NumberInput
        defaultValue={number("Initial value", 0)}
        value={value}
        disabled={boolean("disabled", false)}
        invalid={boolean("invalid", false)}
      />
    </StoryContainer>
  );
};

export const Text = () => {
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
        defaultValue={text("Initial value", "some text")}
        disabled={boolean("disabled", false)}
        invalid={boolean("invalid", false)}
      />
    </StoryContainer>
  );
};

export const SearchInput = () => {
  return (
    <StoryContainer>
      <h1>Text Input With Icon</h1>

      <StoryDescription>
        Use an optional icon within the text input.
      </StoryDescription>

      <TextInput
        disabled={boolean("disabled", false)}
        invalid={boolean("invalid", false)}
        placeholder={text("Placeholder", "Search...")}
        prefixElement={<Search />}
      />
    </StoryContainer>
  );
};

export const Email = () => {
  return (
    <StoryContainer>
      <h1>Email Input</h1>

      <StoryDescription>
        Uses in-built validation from React to check if the email is valid.
      </StoryDescription>

      <EmailInput
        validatorLabel={text("validatorLabel", "validate email")}
        disabled={boolean("disabled", false)}
        invalid={boolean("invalid", false)}
      />
    </StoryContainer>
  );
};

export const NewPassword = () => {
  return (
    <StoryContainer>
      <h1>New Password Input</h1>

      <StoryDescription>
        Validation can be optionally provided to this password input, where a new password can be created. Type can be toggled with the eye icon at the end of the input.
      </StoryDescription>

      <NewPasswordInput
        validatorLabel={text("validatorLabel", "validate password")}
        disabled={boolean("disabled", false)}
        invalid={boolean("invalid", false)}
        required={boolean("required", true)}
      />
    </StoryContainer>
  );
};

export const ExistingPassword = () => {
  return (
    <StoryContainer>
      <h1>Existing Password Input</h1>

      <StoryDescription>
        Input field used when password already exists (doesn't require any validation).
      </StoryDescription>

      <ExistingPasswordInput
        disabled={boolean("disabled", false)}
        invalid={boolean("invalid", false)}
        required={boolean("required", true)}
      />
    </StoryContainer>
  );
};

export const Checkbox = () => {
  return (
    <StoryContainer>
      <h1>Checkbox Input</h1>

      <CheckboxInput
        disabled={boolean("disabled", false)}
        invalid={boolean("invalid", false)}
        required={boolean("required", true)}
      />
    </StoryContainer>
  );
};
