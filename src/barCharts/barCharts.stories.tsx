import React from "react";
import { storiesOf, DecoratorFn } from "@storybook/react";

import {
  countBarChart,
  latencyBarChart,
  retryBarChart,
  rowsBarChart,
} from "./barCharts";
import statementsPagePropsFixture from "src/statementsPage/components/statementsPage.fixture";

const { statements } = statementsPagePropsFixture;

const withinColumn = (width = "150px"): DecoratorFn => storyFn => {
  const rowStyle = {
    borderTop: "1px solid #e7ecf3",
    borderBottom: "1px solid #e7ecf3",
  };

  const cellStyle = {
    width: "190px",
    padding: "10px 20px",
  };

  return (
    <table>
      <tbody>
        <tr style={rowStyle}>
          <td style={cellStyle}>
            <div style={{ width }}>{storyFn()}</div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

storiesOf("BarCharts", module)
  .add("countBarChart", () => {
    const chartFactory = countBarChart(statements);
    return chartFactory(statements[0]);
  })
  .add("latencyBarChart", () => {
    const chartFactory = latencyBarChart(statements);
    return chartFactory(statements[0]);
  })
  .add("retryBarChart", () => {
    const chartFactory = retryBarChart(statements);
    return chartFactory(statements[0]);
  })
  .add("rowsBarChart", () => {
    const chartFactory = rowsBarChart(statements);
    return chartFactory(statements[0]);
  });

storiesOf("BarCharts/within column (150px)", module)
  .addDecorator(withinColumn())
  .add("countBarChart", () => {
    const chartFactory = countBarChart(statements);
    return chartFactory(statements[0]);
  })
  .add("latencyBarChart", () => {
    const chartFactory = latencyBarChart(statements);
    return chartFactory(statements[0]);
  })
  .add("retryBarChart", () => {
    const chartFactory = retryBarChart(statements);
    return chartFactory(statements[0]);
  })
  .add("rowsBarChart", () => {
    const chartFactory = rowsBarChart(statements);
    return chartFactory(statements[0]);
  });
