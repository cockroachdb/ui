import React, { FunctionComponent, ReactElement } from "react";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { Badge } from "@cockroachlabs/ui-components";

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
  <div style={{ margin: "0rem 1rem", textAlign: "center", fontFamily: "Opensans" }}>{children}</div>
);
const Label: FunctionComponent<{
  children: string;
}> = ({ children }) => (
  <div style={{ marginBottom: "1rem" }}>
    <code>{children}</code>
  </div>
);

export const Example = () => (
  <section style={{ marginLeft: "25px", fontFamily: "Opensans", color: "#394455"}}>

    <h1>Badges</h1>

    <div style={{ margin: "2rem 0", fontSize: "14px" }}>Use badges to visually label UI objects for quick recognition, status indication or navigation. Badges can be all-caps or lowercase. There are 5 badge intents:


      <p> Neutral - Use to indicate a default state </p>
      <p> Informative - Use to indicate an informative state </p>
      <p> Success - Use to indicate a successful state </p>
      <p> Warning -  Use to indicate that there is something that requires attention </p>
      <p> Danger - Use to indicate a failed state. </p></div>

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
  </section>
);

export const Demo = () => (
  <Badge
    intent={select(
      "Intent",
      ["neutral", "success", "warning", "danger"],
      "neutral",
    )}
    transformCase={select("Transform Case", ["uppercase", "none"], "uppercase")}
  >
    {text("Text", "badge")}
  </Badge>
);
