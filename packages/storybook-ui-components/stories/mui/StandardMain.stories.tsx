import React from "react";

import { ThemeProvider, MainStandard } from "@cockroachlabs/ui-components-mui";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "MUI/Main: Standard",
  component: MainStandard,
  decorators: [
    (Story) => (
      <ThemeProvider>
        {Story()}
      </ThemeProvider>
    )
  ]
} as ComponentMeta<typeof MainStandard>;

export const Sample: ComponentStory<typeof MainStandard> = ({title}) => {
  return <MainStandard title={title}>
    <p>Lorem ipsum dolor sit amet</p>
    <p>Some page content goes here, likely some info about clusters.</p>
    <p>This paragraph gets repeated, to show the stacking of all this.</p>
    <p>This paragraph gets repeated, to show the stacking of all this.</p>
    <p>This paragraph gets repeated, to show the stacking of all this.</p>
    <p>This paragraph gets repeated, to show the stacking of all this.</p>
    <p>This paragraph gets repeated, to show the stacking of all this.</p>
    <p>This paragraph gets repeated, to show the stacking of all this.</p>
    <p>This paragraph gets repeated, to show the stacking of all this.</p>
  </MainStandard>;
}
Sample.args = {
  title: "Clusters",
};

const Template: ComponentStory<typeof MainStandard> = ({title, children}) => {
  return <MainStandard title={title}>
    {children ?? null}
  </MainStandard>;
}
export const Sample2: typeof Template = Template.bind({});
Sample2.args = {
  title: "Clusters",
  children: [],
};
