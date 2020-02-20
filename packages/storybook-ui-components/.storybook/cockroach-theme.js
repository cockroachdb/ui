import { create } from "@storybook/theming/create";

//
// See https://storybook.js.org/docs/configurations/theming/ for details
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
