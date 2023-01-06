import { create } from "@storybook/theming";

//
// See https://storybook.js.org/docs/react/configure/theming for details
//

export default create({
  base: "light",
  fontBase: '"Source Sans Pro", sans-serif',
  fontCode: '"Roboto Mono", monospace',
  textColor: "black",
  textInverseColor: "rgba(255,255,255,0.9)",
  brandTitle: "Cockroach Labs",
  brandUrl: "https://cockroachlabs.com",
});
