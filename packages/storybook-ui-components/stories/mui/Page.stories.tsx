import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ThemeProvider } from "@cockroachlabs/ui-components-mui";
import { Basic as NavBar } from "./NavBar.stories";
import { Sample2 as StandardMain } from "./StandardMain.stories";

export default {
  title: "MUI/Exploration Slices",
  decorators: [
    (Story) => (
      <ThemeProvider>
        {Story()}
      </ThemeProvider>
    ),
  ],
} as ComponentMeta<any>;

export const Sample: ComponentStory<any> = (args) => {
  return <>
    <NavBar {...NavBar.args as any}/>
    <StandardMain title="Clusters">
      <h2>Pretend there's something here</h2>
      <p>It's big, and there's multiple paragraphs</p>
      <p>like this one</p>
      <p>and this one</p>
      <p>and this one</p>
      <p>and this one</p>
      <p>and this one</p>
      <p>and this one</p>
      <p>and this one</p>
      <p>and this one</p>
    </StandardMain>
  </>
}
Sample.storyName = "crdb-exploration-1.png";
