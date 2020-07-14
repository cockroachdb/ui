module.exports = {
  displayName: "test",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "identity-obj-proxy",
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["jest-enzyme"],
  testEnvironment: "enzyme",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
