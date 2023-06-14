import React from "react";
import { withKnobs, select } from "@storybook/addon-knobs";
import { Spinner, SpinnerSize, SpinnerFill } from "@cockroachlabs/ui-components";
import { StoryContainer, StoryDescription  } from "./layout";

import { IconDisplaySection, IconDisplay, IconLabel, IconFrame } from "./Icon.stories";
export default {
  title: "Spinner",
  component: Spinner,
  decorators: [withKnobs],
};
const sizes: Array<{ key: SpinnerSize; size: number }> = [
  { key: "x-small", size: 16 },
  { key: "small", size: 24 },
  { key: "default", size: 40 },
  { key: "large", size: 64 },
];
const fills: Array<SpinnerFill> = [
  "danger",
  "default",
  "info",
  "primary",
  "success",
  "warning",
  "inverted",
];


export const Example = () => (
  <StoryContainer>
    <h1>Spinner</h1>
    <StoryDescription>
      Loading indicator for components that might not receive all necessary data to
      render its content.
    </StoryDescription>
    <section>
      <h2>Spinner Sizes</h2>
      <IconDisplaySection>
        {sizes.map(s => (
          <IconDisplay key={s.key}>
            <IconLabel text={`${s.key} (${s.size}px)`} />
            <IconFrame style={{ margin: "1rem auto" }}>
              <Spinner size={`${s.key}`} />
            </IconFrame>
          </IconDisplay>
        ))}
      </IconDisplaySection>
    </section>

    <section>
      <h2>Spinner Fills</h2>
      <IconDisplaySection>
        {fills.map(fill => {
          return (
            <IconDisplay
              key={fill}
              backgroundColor={fill === "inverted" ? "#c0c6d9" : ""}
            >
              <IconLabel text={fill} />
              <IconFrame style={{ alignItems: "center", justifyContent: "center" }}>
                <Spinner fill={fill} />
              </IconFrame>
            </IconDisplay>
          );
        })}
      </IconDisplaySection>
    </section>
  </StoryContainer>
);

export const Demo = () => (
  <StoryContainer>
    <Spinner size={select("size", ["default","x-small", "small", "large"], "default")} />
  </StoryContainer>
)
