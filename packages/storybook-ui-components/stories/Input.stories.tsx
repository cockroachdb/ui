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
    <section style={{ marginLeft: "25px", fontFamily: "Opensans", color: "#394455"}}>
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

      <h1>Number Input</h1>

      <div style={{ margin: "2rem 0", fontSize: "14px", color: "#475872", maxWidth:"600px", lineHeight:"24px" }}>Number fields can be used for inputs that require a numerical value. Optional number controls let users increase or decrease the value of the input (use based on what you think will help the user).</div>

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
    <section style={{ marginLeft: "25px", fontFamily: "Opensans", color: "#394455"}}>

      <h1>Text Input</h1>

      <div style={{ margin: "2rem 0", fontSize: "14px", color: "#475872", maxWidth:"600px", lineHeight:"24px" }}>Use text fields in forms to help people enter, select, and search for text. Text fields are normally found within a form but can also be part of a modal, search, or card. Common text input types include: usernames, descriptions, emails, addresses, and plain text searches.</div>


      <TextInput
        initialValue={text("Initial value", "some text")}
        value={value}
        disabled={boolean("disabled", false)}
        onChange={setValue}
        invalid={boolean("invalid", false)}
      />

    </section>
  );
};

export const SearchInput = () => {
  const [value, setValue] = useState<string | undefined>();
  return (
      <section style={{ marginLeft: "25px", fontFamily: "Opensans", color: "#394455"}}>

        <h1>Text Input With Icon</h1>

        <div style={{ margin: "2rem 0", fontSize: "14px", color: "#475872", maxWidth:"600px", lineHeight:"24px" }}>Use an optional icon within the text input.</div>

      <TextInput
        value={value}
        disabled={boolean("disabled", false)}
        onChange={setValue}
        invalid={boolean("invalid", false)}
        placeholder={text("Placeholder", "Search...")}
        prefixIcon={<Search />}
      />

    </section>
  );
};

export const NumberInputWithIcon = () => {
  const [value, setValue] = useState<number | undefined>();
  return (
      <section style={{ marginLeft: "25px", fontFamily: "Opensans", color: "#394455"}}>

        <h1>Number Input With Icon</h1>

        <div style={{ margin: "2rem 0", fontSize: "14px", color: "#475872", maxWidth:"600px", lineHeight:"24px" }}>Use an optional icon within the number input.</div>

      <NumberInput
        value={value}
        disabled={boolean("disabled", false)}
        onChange={setValue}
        invalid={boolean("invalid", false)}
        placeholder={text("Placeholder", "Counter...")}
        prefixIcon={<Search />}
      />

    </section>

  );
};
