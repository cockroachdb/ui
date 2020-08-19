import React, { FunctionComponent, ReactElement } from "react";
import { withKnobs, select } from "@storybook/addon-knobs";
import { StoryContainer, StoryDescription } from "../layout";

import * as Icons from "@cockroachlabs/icons";
import { Icon, IconSize, IconTint } from "@cockroachlabs/ui-components";

export default {
  title: "Icon",
  component: Icon,
  decorators: [withKnobs],
};

const IconDisplaySection: FunctionComponent<{
  children: Array<ReactElement | null>;
}> = ({ children }) => (
  <section
    style={{
      display: "flex",
      justifyContent: "flex-start",
      flexFlow: "row wrap",
    }}
  >
    {children}
  </section>
);

const IconDisplay: FunctionComponent<{
  children: Array<ReactElement | null>;
  backgroundColor?: string;
}> = ({ children, backgroundColor = "transparent" }) => (
  <div
    style={{
      textAlign: "center",
      backgroundColor: backgroundColor,
      margin: "2rem 1rem",
    }}
  >
    {children}
  </div>
);
const IconFrame: FunctionComponent<{
  children: ReactElement;
}> = ({ children }) => (
  <div
    style={{ display: "flex", height: "75px", width: "75px", margin: "auto" }}
  >
    {children}
  </div>
);

const IconLabel: FunctionComponent<{
  text: string;
}> = ({ text }) => (
  <code style={{ fontFamily: "monospace", fontSize: "12px" }}>{text}</code>
);

const IconNames: Array<keyof typeof Icons> = [
  "ArrowLeft",
  "Backup",
  "Bell",
  "CancelCircleFilled",
  "CancelCircle",
  "Cancel",
  "CaretDown",
  "CaretFilledDown",
  "CaretFilledRight",
  "CaretLeft",
  "CaretRight",
  "CaretUp",
  "Caution",
  "CheckCircleFilled",
  "CheckCircle",
  "Check",
  "HelpCircleFilled",
  "Copy",
  "Download",
  "EllipsisVertical",
  "Ellipsis",
  "ErrorCircleFilled",
  "ErrorCircle",
  "EyeOff",
  "Eye",
  "InfoCircleFilled",
  "InfoCircle",
  "Invalid",
  "List",
  "LockFilled",
  "Lock",
  "MinusCircle",
  "Minus",
  "Org",
  "Pencil",
  "PlusCircle",
  "Plus",
  "Search",
  "Spinner",
  "Stack",
  "Terminal",
  "Time",
  "User",
  "World",
];
const sizes: Array<{ key: IconSize; size: number }> = [
  { key: "small", size: 16 },
  { key: "default", size: 24 },
  { key: "medium", size: 32 },
  { key: "large", size: 48 },
  { key: "x-large", size: 56 },
  { key: "xx-large", size: 80 },
];
const tints: Array<IconTint> = [
  "blue",
  "green",
  "red",
  "white",
  "neutral",
  "inherit",
];

export const Example = () => (
  <StoryContainer>
    <h1>Icons</h1>
    <StoryDescription>
      Icons are visual representations of commands, objects, or common actions
      and are used to provide visual context and enhance usability. They should
      be simple, yet bold enough to grab attention.{" "}
    </StoryDescription>

    <section>
      <h2>Icon Names</h2>
      <IconDisplaySection>
        {IconNames.map((name) => (
          <IconDisplay key={name}>
            <IconLabel text={name} />
            <IconFrame>
              <Icon iconName={name} />
            </IconFrame>
          </IconDisplay>
        ))}
      </IconDisplaySection>
    </section>

    <section>
      <h2>Icon Sizes</h2>
      <IconDisplaySection>
        {sizes.map((s) => (
          <IconDisplay key={s.key}>
            <IconLabel text={`${s.key} (${s.size}px)`} />
            <IconFrame>
              <Icon iconName="PlusCircle" size={s.key} />
            </IconFrame>
          </IconDisplay>
        ))}
      </IconDisplaySection>
    </section>

    <section>
      <h2>Icon Tints</h2>
      <IconDisplaySection>
        {tints.map((tint) => (
          <IconDisplay key={tint} backgroundColor="#c0c6d9">
            <IconLabel text={tint} />
            <IconFrame>
              <Icon iconName="Plus" tint={tint} />
            </IconFrame>
          </IconDisplay>
        ))}
      </IconDisplaySection>
    </section>
  </StoryContainer>
);

export const Demo = () => (
  <StoryContainer>
    <Icon
      iconName={select("Icon Name", IconNames, "Plus")}
      size={select(
        "Size",
        sizes.map((s) => s.key),
        "default",
      )}
      tint={select("Tint", tints, "neutral")}
    />
  </StoryContainer>
);
