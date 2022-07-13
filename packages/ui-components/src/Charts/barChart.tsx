import React from "react";
import classnames from "classnames/bind";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Margin } from "recharts/types/util/types";

import { ColorCoreNeutral0 } from "@cockroachlabs/design-tokens";
import { METRIC_COLORS } from "./helpers";

import styles from "./barChart.module.scss";
const cx = classnames.bind(styles);

export type Alignment = "vertical" | "horizontal";

/**
 * getColor is used to grab a color from a defined list of metric colors,
 * so we can have a "semi-randomized" view of all our color schemes.
 * @param index - Index of a metric color we want to use.
 * @param customColors - Optional list of colors to use if available.
 * @returns - Hex value representing a metric color.
 */
const getColor = (index: number, customColors?: string[]) => {
  const colors = customColors || METRIC_COLORS;

  // Default to the first color if we have an invalid index;
  if (index < 0 || index >= colors.length) {
    return colors[index % colors.length];
  }
  return colors[index];
};

interface BarChartProps<T> {
  data: T[];
  mainKey: keyof T;
  dataKeys: (keyof T)[];
  alignment: Alignment;
  width?: number;
  height?: number;
  margin: Margin;
  legend?: boolean;
  barColors?: string[];
  dataColors?: string[];
}

/**
 * BarChart is a generalized wrapper with custom styling used for charting categorical
 * data in a similar design system to the Timeseries components.
 * @param data - Templated data object for representing the columns in the bar chart.
 * @param mainKey - Key of the data object used as the X/Y column names.
 * @param dataKeys - Keys of the data object that can be rendered as columns for an object.
 * @param alignment - Direction the chart will render the bar cells.
 * @param width - Width style of the surrounding container.
 * @param height - Height style of the surrounding container.
 * @param margin - Margin object for padding the containers. Often used to handle longer key names.
 * @param legend - Boolean representing wether or not to show the legend.
 * @param barColors - Custom colors for individual bars. Note: Only one set of custom colors can be used.
 * @param dataColors - Custom colors for specific types of data.
 * @returns A visual bar chart representing the data delivered in.
 */
export const BarChart = <T,>({
  data,
  mainKey,
  dataKeys,
  alignment = "horizontal",
  width,
  margin,
  height,
  legend = false,
  barColors,
  dataColors,
}: BarChartProps<T>) => {
  return (
    <div className={cx("bar-chart")}>
      <ResponsiveContainer width={width} height={height}>
        <ReBarChart
          width={width}
          height={height}
          data={data}
          layout={alignment}
          barCategoryGap={10}
          margin={margin}
        >
          {alignment === "vertical" ? (
            <>
              <XAxis type="number" domain={[0, "dataMax"]} />
              <YAxis type="category" dataKey={mainKey as string} />
            </>
          ) : (
            <>
              <XAxis type="category" dataKey={mainKey as string} />
              <YAxis domain={[0, "dataMax"]} />
            </>
          )}
          <Tooltip
            cursor={{ fill: ColorCoreNeutral0 }} // Prevents background highlighting of a chart.
            wrapperStyle={{ border: 0 }}
            itemStyle={{ display: "none" }} // Prevents a list of keys from showing.
          />
          {legend && <Legend />}
          {dataKeys.map((dataKey, i) => (
            <Bar
              dataKey={dataKey as string}
              fill={getColor(i, dataColors)}
              key={i}
            >
              {/* 
                If dataColors is defined, we can't have individual bar colors overriding
                a separate color for each data type.
              */}
              {!dataColors &&
                data.map((_, j) => (
                  <Cell key={`cell-${j}`} fill={getColor(j, barColors)} />
                ))}
            </Bar>
          ))}
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
