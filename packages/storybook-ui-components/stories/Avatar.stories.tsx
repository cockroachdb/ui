import React, { FunctionComponent, ReactElement } from "react";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Avatar, AvatarProps } from "@cockroachlabs/ui-components";
import { StoryContainer, StoryDescription } from "../layout";

interface AvatarDisplay {
  description: string;
}

export default {
  title: "Avatar",
  components: Avatar,
  decorators: [withKnobs],
};

const baseConfig:AvatarProps = {
  intent: "default",
  children: "jb",
  size: "default",
  disabled: false,
  selectable: false,
  onClick: () => console.log("click"),
};

const intentConfigs:Partial<AvatarDisplay & AvatarProps>[] = [
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

const withIntentSelectableSmallSize:Partial<AvatarDisplay & AvatarProps>[] = withIntentSelectable.map(c => ({
  ...c,
  size: "small",
}));

const Container: FunctionComponent = ({ children }) => (
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

const ItemWrapper: FunctionComponent<{
  children: ReactElement;
  title?: string;
}> = ({ children, title }) => (
  <div
    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
  >
    <label style={{ marginBottom: "8px" }}>{title}</label>
    {children}
  </div>
);

export const example = () => (
  <StoryContainer>

    <h1>Avatar</h1>

    <StoryDescription>Use round avatars to quickly identify users. User initials are used in place of an image. Avatar can be used on its own or in conjunction with the full username.
      </StoryDescription>
    <h4>Default size</h4>
    <Container>
      {withIntentNotSelectable.map(({ description, ...props }, idx) => (
        <ItemWrapper title={description} key={idx}>
          <Avatar {...props} />
        </ItemWrapper>
      ))}
    </Container>
    <h4>Hover on avatar to see changes (for selectable items only)</h4>
    <Container>
      {withIntentSelectable.map(({ description, ...props }, idx) => (
        <ItemWrapper title={description} key={idx}>
          <Avatar {...props} />
        </ItemWrapper>
      ))}
    </Container>

    <h4>Small size</h4>
    <Container>
      {withIntentSelectableSmallSize.map(({ description, ...props }, idx) => (
        <ItemWrapper title={description} key={idx}>
          <Avatar {...props} />
        </ItemWrapper>
      ))}
    </Container>
    </StoryContainer>

);

export const demo = () => (
  <Avatar
    size={select("Size", ["default", "small"], "default")}
    disabled={boolean("Disabled", false)}
    intent={select(
      "Intent",
      ["default", "active", "pending", "invalid"],
      "active",
    )}
    onClick={action("button-click")}
    selectable={boolean("Selectable", true)}
    transformCase={select("transformCase", ["none", "uppercase"], "uppercase")}
  >
    {text("Text", "RL")}
  </Avatar>
);
