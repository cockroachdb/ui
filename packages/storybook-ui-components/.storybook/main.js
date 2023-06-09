module.exports = {
  stories: ["../stories/**/*.stories.@(tsx|mdx)"],
  addons: [ "@storybook/addon-controls", "@storybook/addon-docs" ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};