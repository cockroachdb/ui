import React from "react";
import { withKnobs, select } from "@storybook/addon-knobs";

import * as Icons from "@cockroachlabs/icons";

export default {
  title: "Icons",
  decorators: [withKnobs],
};

const names = [
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
  "ErrorCircle" ,
  "EyeOff" ,
  "Eye" ,
  "Gcp",
  "InfoFilled" ,
  "Info" ,
  "Invalid" ,
  "List" ,
  "LockFilled" ,
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
  <div style={{
    textAlign: "center",
    backgroundColor: backgroundColor,
    margin: "1rem",
  }}>
    {children}
  </div>
);

const IconLabel = ({ text }) => (
  <code style={{ fontFamily: "monospace", fontSize: "12px" }}>{text}</code>
);

const IconFrame = ({ children }) => (
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

const IconBounding = ({ children }) => (
  <div
    style={{
      height: "44px",
      width: "55px",
    }}
  >
    {children}
  </div>
);

const svgStyle = {
  fill: "black",
  maxHeight: "100%",
  maxWidth: "100%",
};

export const Sample = () => (
  <section>
    <h1>Icons</h1>
    <div>
      These icons come from <strong>@cockroachlabs/icons</strong>, a 
      separate package from ui-components in the UI repo.
    </div>
    <div>
      [<a href="https://www.npmjs.com/package/@cockroachlabs/icons">NPM Package</a>]
      [<a href="https://github.com/cockroachdb/ui">UI repo</a>]
    </div>
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
  </section>
);
