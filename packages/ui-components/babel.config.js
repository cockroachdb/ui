const { join, dirname, basename, extname, resolve } = require("path");

/* getFileName(hostFilePath, options) */
const getFileName = (hfp, opts) => {
  const base = basename(hfp, extname(hfp));
  const ext = opts.extension;
  const filename = `${base}__extracted${ext}`;

  const dirs = dirname(hfp).split("/");
  const componentDir = dirs.pop();
  const sourceDir = dirs.join("/");
  const libDir = resolve(sourceDir, "../lib");

  console.log(sourceDir, libDir, componentDir);

  return join(libDir, componentDir, filename);
};

const presets = ["@babel/env", "@babel/react", "@babel/typescript"];
const plugins = [
  "@babel/proposal-class-properties",
  "@babel/proposal-object-rest-spread",
  [
    "astroturf/plugin",
    {
      tagName: "css",
      extension: ".css",
      writeFiles: true, // Writes css files to disk using the result of `getFileName`
      getFileName: getFileName,
    },
  ],
];

module.exports = { presets, plugins };
