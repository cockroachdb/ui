module.exports = {
  stories: ["../stories/**/*.stories.@(tsx|mdx)"],
  addons: [ "@storybook/addon-controls", "@storybook/addon-docs" ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  async webpackFinal(config, { configType }) {
    if (configType === 'DEVELOPMENT') {
      // Silence some of the typical webpack spew when running in watch mode,
      // so that a top-level 'pnpm start' is still usable.
      config.infrastructureLogging = {
        ...config.infrastructureLogging,
        level: "error",
      };
    }

    return config;
  },

  docs: {
    autodocs: "tag",
  },
};