import React from "react";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Avatar } from "@cockroachlabs/ui-components";

export default {
  title: "Avatar",
  components: Avatar,
  decorators: [withKnobs],
};

const baseConfig = {
  intent: "default",
  children: "jb",
  size: "l",
  disabled: false,
  selectable: false,
  onClick: () => console.log("click"),
};

const intentConfigs = [
  {
    description: "Default",
    intent: "default",
  },
  {
    description: "Active",
    intent: "active",
  },
  {
    description: "Pending",
    intent: "pending",
  },
  {
    description: "Invalid",
    intent: "invalid",
  },
  {
    description: "Disabled",
    disabled: true,
  },
];

const withIntentNotSelectable = intentConfigs.map(c => ({
  ...baseConfig,
  ...c,
}));

const withIntentSelectable = withIntentNotSelectable.map(c => ({
  ...baseConfig,
  ...c,
  description: `${c.description} Selectable`,
  selectable: true,
}));

const withIntentSelectableSizeM = withIntentSelectable.map(c => ({
  ...c,
  size: "m",
}));

const withIntentSelectableSizeS = withIntentSelectable.map(c => ({
  ...c,
  size: "s",
}));

const Container = ({ children }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: "24px",
    }}
  >
    {children}
  </div>
);

const ItemWrapper = ({ children, title }) => (
  <div
    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
  >
    <label style={{ marginBottom: "8px" }}>{title}</label>
    {children}
  </div>
);

export const example = () => (
  <section>
    <h3>Size L</h3>
    <h4>Hover on avatar to see changes (for selectable items only)</h4>

    <Container>
      {withIntentNotSelectable.map(({ description, ...props }, idx) => (
        <ItemWrapper title={description} key={idx}>
          <Avatar {...props} />
        </ItemWrapper>
      ))}
    </Container>

    <Container>
      {withIntentSelectable.map(({ description, ...props }, idx) => (
        <ItemWrapper title={description} key={idx}>
          <Avatar {...props} />
        </ItemWrapper>
      ))}
    </Container>

    <h3>Size M</h3>
    <Container>
      {withIntentSelectableSizeM.map(({ description, ...props }, idx) => (
        <ItemWrapper title={description} key={idx}>
          <Avatar {...props} />
        </ItemWrapper>
      ))}
    </Container>
    <h3>Size S</h3>
    <Container>
      {withIntentSelectableSizeS.map(({ description, ...props }, idx) => (
        <ItemWrapper title={description} key={idx}>
          <Avatar {...props} />
        </ItemWrapper>
      ))}
    </Container>
  </section>
);

export const demo = () => (
  <Avatar
    size={select("Size", ["xs", "s", "m", "l"], "l")}
    disabled={boolean("Disabled", false)}
    intent={select(
      "Intent",
      ["default", "active", "pending", "invalid"],
      "active",
    )}
    onClick={action("button-click")}
    selectable={boolean("Selectable", true)}
  >
    {text("Text", "RL")}
  </Avatar>
);
