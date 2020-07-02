import React, { FunctionComponent, ReactElement } from "react";
import { withKnobs } from "@storybook/addon-knobs";

import * as Icons from "@cockroachlabs/icons";
import { StoryContainer, StoryDescription } from "../layout";

export default {
  title: "Icons",
  decorators: [withKnobs],
};

const names: Array<string> = [
  "ArrowLeft",
  "Aws",
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
  "CreditCard",
  "Download",
  "EllipsisVertical",
  "Ellipsis",
  "ErrorCirleFilled",
  "ErrorCircle",
  "EyeOff",
  "Eye",
  "Gcp",
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
  "Visa",
  "World",
];

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
  children: Array<ReactElement>;
  backgroundColor?: string;
}> = ({ children, backgroundColor = "transparent" }) => (
  <div
    style={{
      textAlign: "center",
      backgroundColor: backgroundColor,
      margin: "1rem",
    }}
  >
    {children}
  </div>
);

const IconLabel: FunctionComponent<{ text: string }> = ({ text }) => (
  <code style={{ fontFamily: "monospace", fontSize: "12px" }}>{text}</code>
);

const IconFrame: FunctionComponent<{
  children: ReactElement | Array<ReactElement>;
}> = ({ children }) => (
  <div
    style={{
      alignItems: "center",
      display: "flex",
      height: "75px",
      width: "75px",
      margin: "auto",
      justifyContent: "center",
    }}
  >
    {children}
  </div>
);

const IconBounding: FunctionComponent<{
  children: ReactElement | Array<ReactElement>;
}> = ({ children }) => (
  <div
    style={{
      height: "44px",
      width: "55px",
    }}
  >
    {children}
  </div>
);

const svgStyle: { [styleProp: string]: string } = {
  fill: "black",
  maxHeight: "100%",
  maxWidth: "100%",
};

export const Sample: FunctionComponent<{}> = () => (
  <StoryContainer>

    <h1>Icons</h1>

    <StoryDescription>Icons are visual representations of commands, objects, or common actions and are used to provide visual context and enhance usability. They should be simple, yet bold enough to grab attention.
    <p>
    These icons come from <strong>@cockroachlabs/icons</strong>, a separate
    package from ui-components in the UI repo:&nbsp;
      <a href="https://www.npmjs.com/package/@cockroachlabs/icons" style={{color: "#0788FF"}}>
        <strong>NPM Package</strong>
      </a>&nbsp; &nbsp;
       <a href="https://github.com/cockroachdb/ui" style={{color: "#0788FF"}}><strong>UI repo</strong></a>
      </p>
    </StoryDescription>
    <section>
      <IconDisplaySection>
        {names.map(name => {
          const Element = Icons[name] || null;
          if (Element === null) return null;
          return (
            <IconDisplay key={name}>
              <IconLabel text={name} />
              <IconFrame>
                <IconBounding>
                  <Element style={svgStyle} />
                </IconBounding>
              </IconFrame>
            </IconDisplay>
          );
        })}
      </IconDisplaySection>
    </section>
  </StoryContainer>
);
