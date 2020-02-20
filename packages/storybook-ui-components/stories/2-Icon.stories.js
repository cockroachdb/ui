import React from "react";
import { withKnobs, select } from "@storybook/addon-knobs";

import { Icon } from "@cockroachlabs/ui-components";

export default {
  title: "Icon",
  component: Icon,
  decorators: [withKnobs],
};

const IconDisplaySection = ({ children }) => (
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

const IconDisplay = ({ children, backgroundColor = "transparent" }) => (
  <div
    style={{
      textAlign: "center",
      backgroundColor: backgroundColor,
      marginTop: "2rem",
    }}
  >
    {children}
  </div>
);
const IconFrame = ({ children }) => (
  <div
    style={{ display: "flex", height: "75px", width: "75px", margin: "auto" }}
  >
    {children}
  </div>
);

const IconLabel = ({ text }) => (
  <code style={{ fontFamily: "monospace", fontSize: "12px" }}>{text}</code>
);

const IconNames = [
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
  "CheckCircleFilled",
  "CheckCircle",
  "Check",
  "CircleInfoFilled",
  "Copy",
  "Download",
  "EllipsisVertical",
  "Ellipsis",
  "ErrorCirleFilled",
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
const sizes = ["large", "default", "small", "tiny"];
const tints = ["blue", "green", "purple", "red", "white", "default"];

export const Example = () => (
  <section>
    <h1>Icons</h1>
    <span>Icons portray visual information.</span>

    <section>
      <h2>Icon Names</h2>
      <IconDisplaySection>
        {IconNames.map(name => (
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
        {sizes.map(size => (
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
        {tints.map(tint => (
          <IconDisplay key={tint} backgroundColor="#c0c6d9">
            <IconLabel text={tint} />
            <IconFrame>
              <Icon iconName="Plus" tint={tint} />
            </IconFrame>
          </IconDisplay>
        ))}
      </IconDisplaySection>
    </section>
  </section>
);

export const Demo = () => (
  <Icon
    iconName={select("Icon Name", IconNames, "Plus")}
    size={select("Size", sizes, "default")}
    tint={select("Tint", tints, "default")}
  />
);
