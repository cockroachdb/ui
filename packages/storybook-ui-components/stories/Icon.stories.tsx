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
  "CircleInfoFilled",
  "Copy",
  "Download",
  "EllipsisVertical",
  "Ellipsis",
  "ErrorCircleFilled",
  "ErrorCircle",
  "EyeOff",
  "Eye",
  "InfoFilled",
  "Info",
  "Invalid",
  "List",
  "LockFilled",
  "Lock",
  "MinusCircle",
  "Minus",
  "Organization",
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
const sizes: Array<IconSize> = ["large", "medium", "default", "small", "tiny"];
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
    <StoryDescription>Icons portray visual information.</StoryDescription>

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
        {sizes.map((size) => (
          <IconDisplay key={size}>
            <IconLabel text={size} />
            <IconFrame>
              <Icon iconName="PlusCircle" size={size} />
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
      size={select("Size", sizes, "default")}
      tint={select("Tint", tints, "neutral")}
    />
  </StoryContainer>
);
