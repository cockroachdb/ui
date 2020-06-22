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
    <section style={{ marginLeft: "25px", fontFamily: "Opensans"}}>
      {/**
       * Note from Nathan to design friends:
       *
       * Everything in these curly brackets are comments. Any text entered in here
       * won't show up on the page. Inside of this <section> tag you can write any
       * valid HTML. I would leave the <NumberInput /> alone, but everything else
       * should be fine.
       *
       * In this context (which is still parsed in React) css can sometimes be tricky,
       * so for small styling changes you may use local style attributes. Example:
       *
       * <span style={{ color: red; font-weight: bold; }}>This is some bold red content</span
       *
       * Notice that the value of the style attribute is wrapped in {{ ... }} and not quotes. The content
       * of the "style object" is the same as it would appear in a CSS file. Ping me for questions.
      */}

      <h1>Example Number Input header</h1>

      <div style={{ margin: "2rem 0" }}>Use this input for whole numbers. Use arrow selector for small numbers and type within input for larger numbers.</div>

      <NumberInput
        initialValue={number("Initial value", 0)}
        value={value}
        disabled={boolean("disabled", false)}
        onChange={setValue}
        invalid={boolean("invalid", false)}
      />

    </section>
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
