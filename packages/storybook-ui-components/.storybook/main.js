module.exports = {
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      resolve: { fullySpecified: false },
    });
    return config;
  },
  stories: ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
  ]
};
