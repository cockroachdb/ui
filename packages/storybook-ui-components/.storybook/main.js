module.exports = {
  stories: ["../stories/**/*.stories.(tsx|mdx)"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-knobs/register",
    "@storybook/addon-docs",
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("ts-loader"),
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};
