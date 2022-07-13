[back to components](../README.md)

# Charts

For charting timeseries data, Cockroach Labs uses the `uPlot` for efficient representation of large arrays of timeseries data. For categorical data, such optimizations are not necessary, and a more flexible charting library can be used.

`Recharts` provides easily composable charts that can be used in a variety of different cases. Below lists several different configurations that can be used with the standardized Cockroach Labs design system.

## Bar Chart

```javascript
import React from "react";
import { BarChart } from "@cockroachlabs/ui-components";

export const BarChartExample = () => {
  const sampleData = [
    {
      name: "First",
      count: 1,
    },
    {
      name: "Second",
      count: 2,
    },
  ];

  return (
    <BarChart
      width={400}
      height={400}
      margin={{ top: 32, left: 32, right: 32, bottom: 16 }}
      alignment="vertical"
      data={sampleData}
      mainKey="name"
      dataKeys={["count"]}
      barColors={["#ff0000", "#0000ff"]}
    />
  );
};
```

## Props

| Name         | Type                         | Default      | Description                                                                                                                      |
| ------------ | ---------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `data`       | Array of type `T`            | `none`       | Templated data object, which uses keys from the objects. to render groups and amounts.                                           |
| `width`      | `string \| number`           | `none`       | Controls the width of the chart.                                                                                                 |
| `height`     | `string \| number`           | `none`       | Controls the height of the chart.                                                                                                |
| `margin`     | `Margin`                     | `none`       | Defined margins for the chart, used often to pad the names of different elements.                                                |
| `alignment`  | `"vertical" \| "horizontal"` | `horizontal` | Determines the direction of the bar chart cells.                                                                                 |
| `mainKey`    | `string keyof T`             | `none`       | Determines the name of each categorical group of data in the bar chart.                                                          |
| `dataKeys`   | `string keyof T[]`           | `none`       | Determines the groups of cells for each slice of data on the chart                                                               |
| `legend`     | `boolean`                    | `false`      | Show/hide the legend on the chart.                                                                                               |
| `barColors`  | `string[]`                   | `none`       | Custom colors for each element of data in the chart. Note: If this is defined, dataColors cannot be used for conflicting states. |
| `dataColors` | `string[]`                   | `none`       | Custom colors for each type of data in the chart. Note: If this is defined, barColors cannot be used for conflicting states.     |
