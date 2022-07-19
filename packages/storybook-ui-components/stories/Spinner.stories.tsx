import React from "react";
import { withKnobs, select } from "@storybook/addon-knobs";
import { Spinner } from "@cockroachlabs/ui-components";
import { StoryContainer, StoryDescription  } from "./layout";

export default {
  title: "Spinner",
  component: Spinner,
  decorators: [withKnobs],
};

export const Example = () => (
  <StoryContainer>
    <h1>Spinner</h1>
    <StoryDescription>
      Loading indicator for components that might not receive all necessary data to
      render its content.
    </StoryDescription>
    <section>
      <h2>Spinner sizes</h2>
      <h4>Default size</h4>
      <Spinner />
      <h4>Small size</h4>
      <Spinner size="small" />
      <h4>Large size</h4>
      <Spinner size="large" />
    </section>

  </StoryContainer>
);

export const Demo = () => (
  <StoryContainer>
    <Spinner size={select("size", ["default", "small", "large"], "default")} />
  </StoryContainer>
)
