import React from "react";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { InlineAlert, InlineAlertIntent } from "@cockroachlabs/ui-components";
import { StoryContainer, StoryDescription } from "./layout";

export default {
  title: "InlineAlert",
  component: InlineAlert,
  decorators: [withKnobs],
};

const alertIntents: InlineAlertIntent[] = ["warning", "success", "danger", "info"];

export const Example = () => (
  <StoryContainer>
    <h1>Inline Alerts</h1>
    <StoryDescription>
      Inline alerts provide users with immediate feedback in response to a user action
      or conveying important information. They are placed somewhere inline near the page element they are referring to
      and they can include a description with links if needed. Inline alerts are not dismissible.
    </StoryDescription>

    <section>
      <h2>Alert with title only</h2>
      <InlineAlert title="Hello world!" />
    </section>

    <section>
      <h2>Alert with description only</h2>
      <InlineAlert description={<div>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar, ante ut iaculis vulputate, augue risus egestas ex.</div>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar, ante ut iaculis vulputate, augue risus egestas ex.</div>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar, ante ut iaculis vulputate, augue risus egestas ex.</div>
      </div>} />
    </section>

    <section>
      <h2>Alert with multiline description</h2>
      <InlineAlert
        title="Hello world!"
        description={<div>
          <div>Message 1</div>
          <div>Message 2</div>
          <div>Message 3</div>
        </div>}
      />
    </section>

    <section>
      <h2>Alert intents</h2>
      {
        alertIntents.map((intent, idx) => (
          <div key={idx}>
            <InlineAlert title="Inline alert" description={`with "${intent}" intent`} intent={intent} />
            <p />
          </div>
        ))
      }
    </section>
  </StoryContainer>
)

export const Demo = () => (
  <StoryContainer>
    <InlineAlert
      title={text("Title", "alert title")}
      description={text("description", "alert description")}
      intent={select("intent", alertIntents, "info")}
    />
  </StoryContainer>
)
