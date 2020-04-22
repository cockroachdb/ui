const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const config = {
  mode: "none",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: "uiComponents",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: [new CopyPlugin([{ from: "src/index.ts", to: "index.d.ts" }])],
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React",
    },
  },
};

module.exports = config;
