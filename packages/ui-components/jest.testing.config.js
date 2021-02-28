module.exports = {
  displayName: "test",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "jest-enzyme",
  ],
  testEnvironment: "enzyme",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
