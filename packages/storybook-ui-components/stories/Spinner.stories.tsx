import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Spinner, SpinnerSize, SpinnerFill } from "@cockroachlabs/ui-components";
import { StoryContainer, StoryDescription  } from "./layout";

import { IconDisplaySection, IconDisplay, IconLabel, IconFrame } from "./Icon.stories";

const sizes: { key: SpinnerSize; size: number }[] = [
  { key: "x-small", size: 12 },
  { key: "small", size: 16 },
  { key: "medium", size: 24 },
  { key: "default", size: 40 },
  { key: "large", size: 64 },
];
const fills: SpinnerFill[] = [
  "danger",
  "default",
  "info",
  "primary",
  "success",
  "warning",
  "inverted",
];

const meta: Meta<typeof Spinner> = {
  title: "Spinner",
  component: Spinner,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
  argTypes: {
    size: {
      options: sizes.map(s => s.key),
      control: "select",
    },
    fill: {
      options: fills,
      control: "select",
    }
  }
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Demo: Story = {
  args: {
    size: "default",
    fill: "default",
  },
  render: (props) => {
    return (
      <StoryContainer>
        <Spinner size={props.size} fill={props.fill} aria-label="Demo loading ..." />
      </StoryContainer>
    );
  },
};

export const Example: Story = {
  argTypes: {
    size: { control: false },
    fill: { control: false },
  },
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
  render: () => (
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
  ),
};
