const emoji = require("node-emoji");
const chalk = require("chalk");

console.log(`
${emoji.emojify(`:ghost: :ghost: :ghost: ${chalk.bold.red("Nope!")} :ghost: :ghost: :ghost:`)}

There are no tests here because this package contains no code.
It is fully dependent on ${emoji.get("package")} ${chalk.bold("@svgr/webpack")} ${emoji.get("package")}, so you can look at their
tests at ${chalk.cyanBright("https://github.com/gregberge/svgr/tree/master/packages/webpack")}.
`);
