import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { BarChart, Alignment } from "@cockroachlabs/ui-components";
import { StoryContainer } from "./layout";

export default {
  title: "Charts",
  components: BarChart,
  decorators: [withKnobs],
};

interface BarChartExampleProps {
  alignment: Alignment;
}

const BarChartExample = ({ alignment }: BarChartExampleProps) => {
  const sampleData = [
    {
      name: "First",
      count: 1,
    },
    {
      name: "Second",
      count: 2,
    },
    {
      name: "Third",
      count: 3,
    },
  ];

  return (
    <BarChart
      width={600}
      height={400}
      margin={{ top: 32, left: 32, right: 32, bottom: 16 }}
      alignment={alignment}
      data={sampleData}
      mainKey="name"
      dataKeys={["count"]}
    />
  );
};

const MultiDimensionExample = ({ alignment }: BarChartExampleProps) => {
  const sampleData = [
    {
      name: "First",
      count: 1,
      countTwo: 3,
    },
    {
      name: "Second",
      count: 2,
      countTwo: 2,
    },
    {
      name: "Third",
      count: 3,
      countTwo: 1,
    },
  ];

  return (
    <BarChart
      width={600}
      height={400}
      margin={{ top: 32, left: 32, right: 32, bottom: 16 }}
      alignment={alignment}
      data={sampleData}
      mainKey="name"
      dataKeys={["count", "countTwo"]}
      dataColors={["#2e2e2e",  "#8810eb"]}
    />
  );
};

export const Example = () => (
  <StoryContainer>
    <h1>Charts</h1>
    <section>
      <h3>Bar Chart</h3>
      <p>
        Bar charts can be used to represent different amounts of categorical
        data. These can take multiple data keys, and have custom colors applied.{" "}
      </p>
      <h4>Vertical Layout</h4>
      <p>Basic layout of the bar chart.</p>
      <BarChartExample alignment={"vertical"} />
      <h4>Horizontal Layout</h4>
      <p>Data can also be shown horizontally across the chart.</p>
      <BarChartExample alignment={"horizontal"} />
      <h4>Multi Dimension Data</h4>
      <p>Multi dimensional data can also be charted! Additionally, these can define specific colors for each type of data, like this neat purple.</p>
      <MultiDimensionExample alignment={"vertical"} />
    </section>
  </StoryContainer>
);
