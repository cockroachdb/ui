module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "@typescript-eslint", "prettier", "react-hooks"],
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    es6: true,
  },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all",
      },
    ],
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      files: ["**/*.{tsx,ts}"],
      rules: {
        "react/prop-types": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "react/display-name": "off",
      },
    },
  ],
};
