module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
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
    "no-console": ["warn", { allow: ["warn", "error"] }],
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
        "@typescript-eslint/no-empty-function": [
          "error",
          { allow: ["arrowFunctions"] },
        ],
        "@typescript-eslint/no-unused-vars": "error",
        "eqeqeq": ["error", "always", {"null": "ignore"}],
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/naming-convention": [
          "error",
          // matches the default config from @typescript-eslint/eslint-plugin@2
          // as best as possible
          {
            "selector": "default",
            "format": ["camelCase"],
            "leadingUnderscore": "allow",
            "trailingUnderscore": "allow"
          },
          {
            "selector": "variable",
            "format": ["camelCase", "UPPER_CASE", "PascalCase"],
            "leadingUnderscore": "allow",
            "trailingUnderscore": "allow"
          },
          {
            "selector": "function",
            "format": ["camelCase", "UPPER_CASE", "PascalCase"],
            "leadingUnderscore": "allow",
            "trailingUnderscore": "allow"
          },
          {"selector": "property",
            "format": null
          },
          {
            "selector": "enumMember",
            "format": ["UPPER_CASE", "PascalCase"]
          },
          {
            "selector": "typeLike",
            "format": ["PascalCase"]
          }
        ]
      },
    },
  ],
};
