import React, { FunctionComponent, ReactNode } from "react";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { Button, ButtonIntent, ButtonSize } from "@cockroachlabs/ui-components";
import { StoryContainer } from "../layout";

export default {
  title: "Button",
  components: Button,
  decorators: [withKnobs],
};

const ButtonDisplaySection: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => (
  <section style={{ display: "flex", justifyContent: "flex-start" }}>
    {children}
  </section>
);
const ButtonDisplay: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => (
  <div style={{ margin: "0rem 1rem", textAlign: "center" }}>{children}</div>
);
const Label: FunctionComponent<{ children: string }> = ({ children }) => (
  <div style={{ marginBottom: "1rem" }}>
    <code>{children}</code>
  </div>
);

export const Example = () => (
  <StoryContainer>
    <h1>Buttons</h1>
    <section>
      <h3>Type</h3>
      <ButtonDisplaySection>
        <ButtonDisplay>
          <Label>primary-success</Label>
          <Button intent="primary">Success</Button>
        </ButtonDisplay>
        <ButtonDisplay>
          <Label>primary-danger</Label>
          <Button intent="primary-danger">Danger</Button>
        </ButtonDisplay>
        <ButtonDisplay>
          <Label>secondary (default)</Label>
          <Button>Secondary</Button>
        </ButtonDisplay>
        <ButtonDisplay>
          <Label>tertiary</Label>
          <Button intent="tertiary">Tertiary</Button>
        </ButtonDisplay>
      </ButtonDisplaySection>
    </section>
    <section>
      <h3>Size</h3>
      <ButtonDisplaySection>
        <ButtonDisplay>
          <Label>standard (default)</Label>
          <Button>Standard</Button>
        </ButtonDisplay>
        <ButtonDisplay>
          <Label>small</Label>
          <Button size="small">Small</Button>
        </ButtonDisplay>
      </ButtonDisplaySection>
    </section>
  </StoryContainer>
);

export const Demo = () => {
  const intents: Array<ButtonIntent> = [
    "primary",
    "primary-danger",
    "secondary",
    "tertiary",
  ];
  const sizes: Array<ButtonSize> = ["standard", "small"];
  return (
    <StoryContainer>
      <Button
        intent={select("Intent", intents, "primary")}
        size={select("Size", sizes, "standard")}
      >
        {text("Text", "button")}
      </Button>
    </StoryContainer>
  );
};
