import React, { FunctionComponent, ReactElement } from "react";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { Badge } from "@cockroachlabs/ui-components";
import { StoryContainer, StoryDescription } from "../layout";

export default {
  title: "Badge",
  components: Badge,
  decorators: [withKnobs],
};

const BadgeDisplaySection: FunctionComponent<{
  children: Array<ReactElement | null>;
}> = ({ children }) => (
  <section style={{ display: "flex", justifyContent: "flex-start" }}>
    {children}
  </section>
);
const BadgeDisplay: FunctionComponent<{
  children: Array<ReactElement | null>;
}> = ({ children }) => (
  <div style={{ margin: "0rem 1rem", textAlign: "center" }}>{children}</div>
);
const Label: FunctionComponent<{
  children: string;
}> = ({ children }) => (
  <div style={{ marginBottom: "1rem" }}>
    <code>{children}</code>
  </div>
);

export const Example = () => (
  <StoryContainer>
    <h1>Badges</h1>

    <StoryDescription>
      Use badges to visually label UI objects for quick recognition, status
      indication or navigation. Badges can be all-caps or lowercase. There are 5
      badge intents:
      <ul>
        <li>
          {" "}
          <strong>Neutral:</strong> Use to indicate a default state{" "}
        </li>
        <li>
          {" "}
          <strong>Success:</strong> Use to indicate a successful state{" "}
        </li>
        <li>
          {" "}
          <strong>Warning:</strong> Use to indicate that there is something that
          requires attention{" "}
        </li>
        <li>
          {" "}
          <strong>Danger:</strong> Use to indicate a failed state.{" "}
        </li>
        <li>
          {" "}
          <strong>Info:</strong> Use to indicate useful information.{" "}
        </li>
      </ul>
    </StoryDescription>

    <section>
      <h4>Intents</h4>
      <BadgeDisplaySection>
        <BadgeDisplay>
          <Label>neutral</Label>
          <Badge intent="neutral">this is fine</Badge>
        </BadgeDisplay>
        <BadgeDisplay>
          <Label>success</Label>
          <Badge intent="success">Complete</Badge>
        </BadgeDisplay>
        <BadgeDisplay>
          <Label>warning</Label>
          <Badge intent="warning">Caution</Badge>
        </BadgeDisplay>
        <BadgeDisplay>
          <Label>danger</Label>
          <Badge intent="danger">Error</Badge>
        </BadgeDisplay>
        <BadgeDisplay>
          <Label>info</Label>
          <Badge intent="info">Info</Badge>
        </BadgeDisplay>
      </BadgeDisplaySection>
    </section>

    <section>
      <h4>Transform Case</h4>
      <BadgeDisplaySection>
        <BadgeDisplay>
          <Label>uppercase</Label>
          <Badge transformCase="uppercase">Caps</Badge>
        </BadgeDisplay>
        <BadgeDisplay>
          <Label>none</Label>
          <Badge transformCase="none">v10.3.7-Alpha.0876b</Badge>
        </BadgeDisplay>
      </BadgeDisplaySection>
    </section>
  </StoryContainer>
);

export const Demo = () => (
  <StoryContainer>
    <Badge
      intent={select(
        "Intent",
        ["neutral", "success", "warning", "danger", "info"],
        "neutral",
      )}
      transformCase={select(
        "Transform Case",
        ["uppercase", "none"],
        "uppercase",
      )}
    >
      {text("Text", "badge")}
    </Badge>
  </StoryContainer>
);
